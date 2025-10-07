// Dalsi AI API Integration Layer

// API endpoints for DalSi AI models
const DALSIAI_URL = 'https://dalsiai-106681824395.asia-south2.run.app'
const DALSIAIVI_URL = 'https://dalsiaivi-service-594985777520.asia-south2.run.app'

/**
 * Get available models based on subscription
 */
export const getAvailableModels = (subscription) => {
  const baseModels = [
    {
      id: 'dalsi-ai',
      name: 'DalSi AI',
      description: 'Text-based Phi-3 model for healthcare, education, and general AI assistance',
      free: true,
      url: DALSIAI_URL
    }
  ]

  if (subscription && subscription.status === 'active') {
    baseModels.push({
      id: 'dalsi-aivi',
      name: 'DalSi AI-Vi',
      description: 'Multimodal Phi-3 Vision model for text and image analysis',
      free: false,
      url: DALSIAIVI_URL
    })
  }

  return baseModels
}

/**
 * Check if user has access to a model
 */
export const checkModelAccess = async (modelId, usageCount, subscription) => {
  if (modelId === 'dalsi-ai') {
    return { hasAccess: true }
  }

  if (modelId === 'dalsi-aivi') {
    if (!subscription || subscription.status !== 'active') {
      return {
        hasAccess: false,
        reason: 'DalSi AI-Vi requires a subscription. Upgrade to access vision capabilities!',
        upgradeRequired: true
      }
    }
  }

  return { hasAccess: true }
}

/**
 * Get API URL for a model
 */
const getModelUrl = (modelId) => {
  return modelId === 'dalsi-aivi' ? DALSIAIVI_URL : DALSIAI_URL
}

/**
 * Health check for API
 */
export const healthCheck = async (modelId) => {
  try {
    const baseUrl = getModelUrl(modelId)
    const response = await fetch(`${baseUrl}/health`, {
      method: 'GET'
    })
    
    if (response.ok) {
      const data = await response.json()
      return {
        status: 'healthy',
        model_loaded: data.model_loaded || true,
        ...data
      }
    }
  } catch (error) {
    console.error(`Health check failed for ${modelId}:`, error)
  }
  
  return {
    status: 'unhealthy',
    model_loaded: false
  }
}

/**
 * Preprocess message before sending to AI
 * Builds conversation context from message history
 */
export const preprocessMessage = (message, messageHistory, modelId) => {
  if (!messageHistory || messageHistory.length === 0) {
    return message
  }

  // Build conversation context from recent messages
  // Format: "User: message\nAI: response\nUser: message\n..."
  const contextLines = []
  
  for (const msg of messageHistory) {
    if (msg.sender === 'user') {
      contextLines.push(`User: ${msg.content}`)
    } else if (msg.sender === 'ai') {
      contextLines.push(`AI: ${msg.content}`)
    }
  }

  // Add the new user message
  contextLines.push(`User: ${message}`)
  
  // Add instruction for AI to continue the conversation
  contextLines.push('AI:')

  return contextLines.join('\n')
}

/**
 * Convert image file to data URL
 */
export const imageToDataUrl = (file) => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = (e) => resolve(e.target.result)
    reader.onerror = reject
    reader.readAsDataURL(file)
  })
}

/**
 * Validate image file
 */
export const validateImageFile = (file) => {
  const maxSize = 5 * 1024 * 1024 // 5MB
  const allowedTypes = ['image/png', 'image/jpeg', 'image/gif', 'image/webp']

  if (!allowedTypes.includes(file.type)) {
    return {
      valid: false,
      error: 'Invalid file type. Please upload PNG, JPEG, GIF, or WebP'
    }
  }

  if (file.size > maxSize) {
    return {
      valid: false,
      error: 'File too large. Maximum size is 5MB'
    }
  }

  return { valid: true }
}

/**
 * Stream text generation from AI using Server-Sent Events
 */
export const streamGenerateText = async (
  message,
  imageDataUrl,
  onToken,
  onComplete,
  onError,
  modelId = 'dalsi-ai',
  maxLength = 500
) => {
  try {
    const baseUrl = getModelUrl(modelId)
    
    // Prepare request payload
    const payload = {
      message: message,
      max_length: maxLength
    }

    // Add image data for vision model
    if (imageDataUrl && modelId === 'dalsi-aivi') {
      payload.image_data_url = imageDataUrl
    }

    // Make streaming request
    const response = await fetch(`${baseUrl}/stream`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      const errorText = await response.text()
      throw new Error(`API error: ${response.status} - ${errorText}`)
    }

    // Process Server-Sent Events stream
    const reader = response.body.getReader()
    const decoder = new TextDecoder('utf-8')
    let fullResponse = ''
    let buffer = ''

    while (true) {
      const { done, value } = await reader.read()
      
      if (done) {
        break
      }

      // Decode the chunk
      buffer += decoder.decode(value, { stream: true })
      
      // Split by double newlines to process complete SSE messages
      const messages = buffer.split('\n\n')
      
      // Keep the last incomplete message in the buffer
      buffer = messages.pop() || ''

      for (const message of messages) {
        if (!message.trim()) continue
        
        // SSE format: "data: {json}"
        if (message.startsWith('data: ')) {
          const jsonData = message.slice(6) // Remove "data: " prefix
          
          try {
            const data = JSON.parse(jsonData)
            
            // Handle token
            if (data.token) {
              fullResponse += data.token
              onToken(data.token)
            }
            
            // Handle completion
            if (data.done) {
              onComplete(fullResponse)
              return
            }
            
            // Handle error
            if (data.error) {
              throw new Error(data.error)
            }
          } catch (parseError) {
            console.error('Error parsing SSE data:', parseError, jsonData)
          }
        }
      }
    }

    // If we exit the loop without getting a "done" signal, complete anyway
    if (fullResponse) {
      onComplete(fullResponse)
    } else {
      throw new Error('Stream ended without response')
    }

  } catch (error) {
    console.error('Stream generation error:', error)
    onError(error)
  }
}

/**
 * Generate text without streaming (single response)
 */
export const generateText = async (
  message,
  imageDataUrl = null,
  modelId = 'dalsi-ai',
  maxLength = 500
) => {
  try {
    const baseUrl = getModelUrl(modelId)
    
    // Prepare request payload
    const payload = {
      message: message,
      max_length: maxLength
    }

    // Add image data for vision model
    if (imageDataUrl && modelId === 'dalsi-aivi') {
      payload.image_data_url = imageDataUrl
    }

    const response = await fetch(`${baseUrl}/generate`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(payload)
    })

    if (!response.ok) {
      throw new Error(`API error: ${response.status} ${response.statusText}`)
    }

    const data = await response.json()
    return data.response || data.text || ''

  } catch (error) {
    console.error('Text generation error:', error)
    throw error
  }
}
