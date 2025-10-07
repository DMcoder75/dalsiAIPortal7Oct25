// DalSi AI API Service - Enhanced with multimodal support and usage limits
class DalSiAPIService {
  constructor() {
    this.textModelEndpoint = 'https://dalsiai-106681824395.asia-south2.run.app'
    this.visionModelEndpoint = 'https://dalsiaivi-service-594985777520.asia-south2.run.app'
    this.defaultMaxLength = 800
    this.freeUsageLimit = 2 // Free interactions before subscription required
    
    this.models = {
      'dalsi-ai': {
        name: 'DalSiAI',
        type: 'text',
        endpoint: this.textModelEndpoint,
        requiresSubscription: false,
        freeUsageLimit: this.freeUsageLimit,
        capabilities: ['text_generation', 'code_generation'],
        description: 'Advanced text-based AI for conversations, coding, and analysis'
      },
      'dalsi-aivi': {
        name: 'DalSiAIVi',
        type: 'multimodal',
        endpoint: this.visionModelEndpoint,
        requiresSubscription: true,
        freeUsageLimit: 0,
        capabilities: ['text_generation', 'image_understanding', 'image_generation'],
        description: 'Multimodal AI that understands text and images for advanced analysis'
      }
    }
  }

  // Health check for both models
  async healthCheck(modelId = 'dalsi-ai') {
    try {
      const model = this.models[modelId]
      if (!model) throw new Error(`Unknown model: ${modelId}`)

      const response = await fetch(`${model.endpoint}/health`, {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
        }
      })

      if (!response.ok) {
        throw new Error(`Health check failed: ${response.status}`)
      }

      const data = await response.json()
      return {
        model_loaded: data.model_loaded || data.status === 'healthy',
        status: data.status || (data.model_loaded ? 'healthy' : 'unhealthy'),
        model: modelId
      }
    } catch (error) {
      console.error(`Health check failed for ${modelId}:`, error)
      return {
        model_loaded: false,
        status: 'error',
        model: modelId,
        error: error.message
      }
    }
  }

  // Check if user has access to a specific model based on usage and subscription
  async checkModelAccess(modelId, userUsageCount = 0, userSubscription = null) {
    const model = this.models[modelId]
    if (!model) return { hasAccess: false, reason: 'Model not found' }

    // For DalSiAI: Allow free usage up to limit, then require subscription
    if (modelId === 'dalsi-ai') {
      if (userUsageCount < model.freeUsageLimit) {
        return { 
          hasAccess: true, 
          remainingFreeUses: model.freeUsageLimit - userUsageCount,
          isFreeUsage: true
        }
      }
      
      // After free limit, check subscription
      if (!userSubscription || userSubscription.status !== 'active') {
        return { 
          hasAccess: false, 
          reason: 'Free usage limit exceeded. Subscription required.',
          upgradeRequired: true,
          usedFreeUses: userUsageCount
        }
      }
      
      return { hasAccess: true, isFreeUsage: false }
    }

    // For DalSiAIVi: Always requires subscription
    if (modelId === 'dalsi-aivi') {
      if (!userSubscription || userSubscription.status !== 'active') {
        return { 
          hasAccess: false, 
          reason: 'Premium subscription required for multimodal AI',
          upgradeRequired: true
        }
      }
      
      return { hasAccess: true, isFreeUsage: false }
    }

    return { hasAccess: true }
  }

  // Preprocess message with context for better responses
  preprocessMessage(message, messageHistory = [], modelId = 'dalsi-ai') {
    const model = this.models[modelId]
    let enhancedMessage = message
    
    // Add context based on model type
    if (model.type === 'text') {
      // For text model, add conversation context
      if (messageHistory.length > 0) {
        const recentContext = messageHistory
          .slice(-3)
          .map(msg => `${msg.sender}: ${msg.content}`)
          .join('\n')
        
        enhancedMessage = `Context:\n${recentContext}\n\nUser: ${message}`
      }

      // Add domain-specific prompting
      if (this.isHealthcareQuery(message)) {
        enhancedMessage = `As a healthcare AI assistant, please provide accurate medical information for: ${message}\n\nNote: This is for informational purposes only and not a substitute for professional medical advice.`
      } else if (this.isEducationalQuery(message)) {
        enhancedMessage = `As an educational AI tutor, please provide a comprehensive learning-focused response for: ${message}\n\nPlease structure your response to be educational and easy to understand.`
      } else if (this.isCodeQuery(message)) {
        enhancedMessage = `As a programming assistant, please provide detailed code examples and explanations for: ${message}\n\nInclude working code examples where applicable.`
      }
    }

    return enhancedMessage
  }

  // Query type detection helpers
  isHealthcareQuery(message) {
    const healthKeywords = ['health', 'medical', 'symptom', 'disease', 'treatment', 'diagnosis', 'patient', 'clinical', 'medicine', 'doctor', 'hospital']
    return healthKeywords.some(keyword => message.toLowerCase().includes(keyword))
  }

  isEducationalQuery(message) {
    const eduKeywords = ['learn', 'teach', 'explain', 'education', 'study', 'course', 'lesson', 'tutorial', 'understand', 'concept']
    return eduKeywords.some(keyword => message.toLowerCase().includes(keyword))
  }

  isCodeQuery(message) {
    const codeKeywords = ['code', 'programming', 'function', 'api', 'javascript', 'python', 'react', 'html', 'css', 'algorithm', 'debug']
    return codeKeywords.some(keyword => message.toLowerCase().includes(keyword))
  }

  // Get optimal max length based on message complexity
  getOptimalMaxLength(message, modelId = 'dalsi-ai') {
    const baseLength = this.defaultMaxLength
    const model = this.models[modelId]
    
    // Adjust based on message length and complexity
    if (this.isCodeQuery(message)) return Math.min(baseLength * 1.5, 1200)
    if (this.isEducationalQuery(message)) return Math.min(baseLength * 1.25, 1000)
    if (message.length > 200) return Math.min(baseLength * 1.2, 1000)
    if (model.type === 'multimodal') return Math.min(baseLength * 1.3, 1100)
    
    return baseLength
  }

  // Format response for better presentation
  formatResponse(response, modelId = 'dalsi-ai') {
    if (!response) return 'I apologize, but I couldn\'t generate a response. Please try again.'

    // Clean up common formatting issues
    let formatted = response.trim()
    
    // Ensure proper spacing around code blocks
    formatted = formatted.replace(/```(\w+)?\n/g, '\n```$1\n')
    formatted = formatted.replace(/\n```\n/g, '\n```\n\n')
    
    // Ensure proper paragraph spacing
    formatted = formatted.replace(/\n\n\n+/g, '\n\n')
    
    // Add helpful continuation prompt for long responses
    if (formatted.length > 800 && !formatted.includes('continue') && !formatted.includes('more')) {
      formatted += '\n\n*Ask me to continue or elaborate on any specific part!*'
    }

    return formatted
  }

  // Check if response appears to be truncated
  isResponseTruncated(response, maxLength) {
    if (!response) return false
    
    const trimmedResponse = response.trim()
    const endsWithPunctuation = /[.!?]$/.test(trimmedResponse)
    const isNearMaxLength = trimmedResponse.length > (maxLength * 0.9)
    
    return isNearMaxLength && !endsWithPunctuation
  }

  // Generate text using the specified model
  async generateText(message, maxLength = null, modelId = 'dalsi-ai', imageDataUrl = null) {
    try {
      const model = this.models[modelId]
      if (!model) throw new Error(`Unknown model: ${modelId}`)

      const requestBody = {
        message: message,
        max_length: maxLength || this.getOptimalMaxLength(message, modelId)
      }

      // Add image data for multimodal model
      if (model.type === 'multimodal' && imageDataUrl) {
        requestBody.image_data_url = imageDataUrl
      }

      const response = await fetch(`${model.endpoint}/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`API request failed: ${response.status} ${response.statusText}`)
      }

      const data = await response.json()
      
      if (data.error) {
        throw new Error(data.error)
      }

      // Check if response seems truncated and suggest continuation
      const formattedResponse = this.formatResponse(data.response, modelId)
      if (this.isResponseTruncated(formattedResponse, requestBody.max_length)) {
        data.response = formattedResponse + "\n\n*[Response may be truncated due to length limits. Ask me to continue for more details.]*"
        data.truncated = true
      } else {
        data.response = formattedResponse
      }

      return data
    } catch (error) {
      console.error(`Text generation failed for ${modelId}:`, error)
      throw error
    }
  }

  // Stream text generation with real-time updates
  async streamGenerateText(message, maxLength = null, onToken, onComplete, onError, modelId = 'dalsi-ai', imageDataUrl = null) {
    try {
      const model = this.models[modelId]
      if (!model) throw new Error(`Unknown model: ${modelId}`)

      const requestBody = {
        message: message,
        max_length: maxLength || this.getOptimalMaxLength(message, modelId)
      }

      // Add image data for multimodal model
      if (model.type === 'multimodal' && imageDataUrl) {
        requestBody.image_data_url = imageDataUrl
      }

      const response = await fetch(`${model.endpoint}/stream`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      })

      if (!response.ok) {
        throw new Error(`Stream request failed: ${response.status} ${response.statusText}`)
      }

      const reader = response.body.getReader()
      const decoder = new TextDecoder()
      let buffer = ''
      let fullResponse = ''

      while (true) {
        const { done, value } = await reader.read()
        
        if (done) break

        buffer += decoder.decode(value, { stream: true })
        const lines = buffer.split('\n')
        buffer = lines.pop() // Keep incomplete line in buffer

        for (const line of lines) {
          if (line.startsWith('data: ')) {
            try {
              const data = JSON.parse(line.slice(6))
              
              if (data.error) {
                onError(new Error(data.error))
                return
              }
              
              if (data.done) {
                // Check if response was truncated
                if (this.isResponseTruncated(fullResponse, requestBody.max_length)) {
                  onToken("\n\n*[Response may be truncated due to length limits. Ask me to continue for more details.]*")
                }
                const formattedResponse = this.formatResponse(fullResponse, modelId)
                onComplete(formattedResponse)
                return
              }
              
              if (data.token) {
                fullResponse += data.token
                onToken(data.token)
              }
            } catch (parseError) {
              console.warn('Failed to parse SSE data:', line)
            }
          }
        }
      }
    } catch (error) {
      console.error(`Stream generation failed for ${modelId}:`, error)
      onError(error)
    }
  }

  // Get available models for user
  getAvailableModels(userSubscription = null) {
    return Object.entries(this.models).map(([id, model]) => ({
      id,
      name: model.name,
      type: model.type,
      capabilities: model.capabilities,
      description: model.description,
      requiresSubscription: model.requiresSubscription,
      freeUsageLimit: model.freeUsageLimit,
      available: !model.requiresSubscription || (userSubscription && userSubscription.status === 'active')
    }))
  }

  // Convert image file to base64 data URL
  async imageToDataUrl(file) {
    return new Promise((resolve, reject) => {
      const reader = new FileReader()
      reader.onload = () => resolve(reader.result)
      reader.onerror = reject
      reader.readAsDataURL(file)
    })
  }

  // Validate image file
  validateImageFile(file) {
    const maxSize = 10 * 1024 * 1024 // 10MB
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/webp']

    if (!allowedTypes.includes(file.type)) {
      throw new Error('Unsupported image format. Please use JPEG, PNG, GIF, or WebP.')
    }

    if (file.size > maxSize) {
      throw new Error('Image file too large. Please use an image smaller than 10MB.')
    }

    return true
  }
}

// Export singleton instance
export const dalsiAPI = new DalSiAPIService()
export default dalsiAPI
