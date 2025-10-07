import { useState, useEffect, useRef } from 'react'
import { Button } from './ui/button'
import { Input } from './ui/input'
import { Card, CardContent } from './ui/card'
import { 
  Send, 
  Plus, 
  MessageSquare, 
  User, 
  Bot, 
  Trash2, 
  Edit3, 
  MoreVertical,
  ThumbsUp,
  ThumbsDown,
  Copy,
  Share,
  Menu,
  X,
  Code,
  Download,
  Check,
  Image as ImageIcon,
  Sparkles,
  Crown,
  Zap,
  Upload,
  AlertCircle,
  Settings,
  Archive,
  ChevronDown
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import * as dalsiAPI from '../lib/dalsiAPI'
import { useAuth } from '../contexts/AuthContext'
import { ChatOptionsMenu } from './ChatOptionsMenu'
import { 
  getUsageStatus, 
  incrementGuestMessageCount,
  canGuestSendMessage,
  canUserSendMessage 
} from '../lib/usageTracking'
import logo from '../assets/DalSiAILogo2.png'

// Code syntax highlighting component
const CodeBlock = ({ code, language = 'javascript' }) => {
  const [copied, setCopied] = useState(false)

  const copyCode = () => {
    navigator.clipboard.writeText(code)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  return (
    <div className="relative bg-card rounded-lg border border-border my-4 overflow-hidden">
      <div className="flex items-center justify-between px-4 py-2 border-b border-border bg-card">
        <div className="flex items-center space-x-2">
          <Code className="h-4 w-4 text-muted-foreground" />
          <span className="text-sm font-medium text-muted-foreground">{language}</span>
        </div>
        <Button
          variant="ghost"
          size="sm"
          onClick={copyCode}
          className="h-6 px-2 text-muted-foreground hover:text-white"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-400" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      <div className="p-4 overflow-x-auto">
        <pre className="text-sm text-foreground whitespace-pre-wrap">
          <code>{code}</code>
        </pre>
      </div>
    </div>
  )
}

// Enhanced message content renderer with professional typography
const MessageContent = ({ content }) => {
  const [copied, setCopied] = useState(false)

  const copyFullMessage = () => {
    navigator.clipboard.writeText(content)
    setCopied(true)
    setTimeout(() => setCopied(false), 2000)
  }

  // Enhanced content parser for better formatting
  const parseContent = (text) => {
    const codeBlockRegex = /```(\w+)?\n([\s\S]*?)```/g
    const parts = []
    let lastIndex = 0
    let match

    while ((match = codeBlockRegex.exec(text)) !== null) {
      // Add text before code block
      if (match.index > lastIndex) {
        parts.push({
          type: 'text',
          content: text.slice(lastIndex, match.index)
        })
      }

      // Add code block
      parts.push({
        type: 'code',
        language: match[1] || 'text',
        content: match[2].trim()
      })

      lastIndex = match.index + match[0].length
    }

    // Add remaining text
    if (lastIndex < text.length) {
      parts.push({
        type: 'text',
        content: text.slice(lastIndex)
      })
    }

    return parts.length > 0 ? parts : [{ type: 'text', content: text }]
  }

  // Render text with enhanced typography
  const renderFormattedText = (text) => {
    // Split by double line breaks for paragraphs
    const paragraphs = text.split('\n\n')
    
    return paragraphs.map((paragraph, pIndex) => {
      if (!paragraph.trim()) return null
      
      // Check if it's a heading (starts with **)
      if (paragraph.startsWith('**') && paragraph.includes('**')) {
        const lines = paragraph.split('\n')
        return (
          <div key={pIndex} className="mb-6">
            {lines.map((line, lIndex) => {
              if (line.startsWith('**') && line.endsWith('**')) {
                // Main heading
                const headingText = line.replace(/\*\*/g, '')
                return (
                  <h3 key={lIndex} className="text-lg font-semibold text-foreground mb-3 flex items-center">
                    <div className="w-1 h-6 bg-primary rounded-full mr-3"></div>
                    {headingText}
                  </h3>
                )
              } else if (line.startsWith('**') && line.includes('**')) {
                // Subheading with description
                const parts = line.split('**')
                const title = parts[1]
                const description = parts[2]
                return (
                  <div key={lIndex} className="mb-4 pl-4 border-l-2 border-muted">
                    <h4 className="font-medium text-foreground mb-1">{title}</h4>
                    <p className="text-sm text-muted-foreground leading-relaxed">{description}</p>
                  </div>
                )
              } else if (line.startsWith('•')) {
                // Bullet points
                return (
                  <div key={lIndex} className="flex items-start mb-2 pl-4">
                    <div className="w-2 h-2 bg-primary rounded-full mt-2 mr-3 flex-shrink-0"></div>
                    <span className="text-sm text-foreground">{line.substring(2)}</span>
                  </div>
                )
              } else if (line.trim()) {
                // Regular text
                return (
                  <p key={lIndex} className="text-sm text-muted-foreground leading-relaxed mb-2">
                    {line}
                  </p>
                )
              }
              return null
            })}
          </div>
        )
      } else {
        // Regular paragraph
        return (
          <p key={pIndex} className="text-sm text-foreground leading-relaxed mb-4">
            {paragraph}
          </p>
        )
      }
    })
  }

  const contentParts = parseContent(content)

  return (
    <div className="relative group">
      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <Button
          variant="ghost"
          size="sm"
          onClick={copyFullMessage}
          className="h-6 w-6 p-0"
        >
          {copied ? (
            <Check className="h-3 w-3 text-green-500" />
          ) : (
            <Copy className="h-3 w-3" />
          )}
        </Button>
      </div>
      
      <div className="font-sans">
        {contentParts.map((part, index) => (
          <div key={index}>
            {part.type === 'text' ? (
              <div className="pr-8">
                {renderFormattedText(part.content)}
              </div>
            ) : (
              <CodeBlock code={part.content} language={part.language} />
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

// Model selector component
const ModelSelector = ({ selectedModel, onModelChange, availableModels, userUsageCount, userSubscription }) => {
  const [isOpen, setIsOpen] = useState(false)

  return (
    <div className="relative">
      <Button
        variant="outline"
        onClick={() => setIsOpen(!isOpen)}
        className="flex items-center space-x-2 min-w-[160px] justify-between"
      >
        <div className="flex items-center space-x-2">
          {selectedModel === 'dalsi-aivi' ? (
            <Sparkles className="h-4 w-4 text-purple-500" />
          ) : (
            <Zap className="h-4 w-4 text-blue-500" />
          )}
          <span className="text-sm font-medium">
            {availableModels.find(m => m.id === selectedModel)?.name || 'DalSiAI'}
          </span>
        </div>
        <Settings className="h-3 w-3" />
      </Button>

      {isOpen && (
        <div className="absolute top-full left-0 mt-2 w-80 bg-popover text-popover-foreground border border-border rounded-lg shadow-lg z-50">
          <div className="p-3 border-b border-border">
            <h3 className="font-semibold text-sm">Select AI Model</h3>
          </div>
          <div className="p-2 space-y-1">
            {availableModels.map((model) => {
              const isSelected = selectedModel === model.id
              const hasAccess = model.available || (model.id === 'dalsi-ai' && userUsageCount < 2)
              
              return (
                <div
                  key={model.id}
                  className={`p-3 rounded-lg cursor-pointer transition-colors ${
                    isSelected 
                      ? 'bg-blue-50 dark:bg-blue-900/20 border border-blue-200 dark:border-blue-700' 
                      : hasAccess 
                        ? 'hover:bg-gray-50 dark:hover:bg-gray-700' 
                        : 'opacity-50 cursor-not-allowed'
                  }`}
                  onClick={() => {
                    if (hasAccess) {
                      onModelChange(model.id)
                      setIsOpen(false)
                    }
                  }}
                >
                  <div className="flex items-start justify-between">
                    <div className="flex items-center space-x-3">
                      {model.id === 'dalsi-aivi' ? (
                        <Sparkles className="h-5 w-5 text-purple-500 flex-shrink-0" />
                      ) : (
                        <Zap className="h-5 w-5 text-blue-500 flex-shrink-0" />
                      )}
                      <div>
                        <div className="flex items-center space-x-2">
                          <span className="font-medium text-sm">{model.name}</span>
                          {model.requiresSubscription && (
                            <Crown className="h-3 w-3 text-yellow-500" />
                          )}
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">
                          {model.description}
                        </p>
                        {model.id === 'dalsi-ai' && userUsageCount < 2 && (
                          <p className="text-xs text-green-600 dark:text-green-400 mt-1">
                            {2 - userUsageCount} free uses remaining
                          </p>
                        )}
                      </div>
                    </div>
                    {!hasAccess && (
                      <Button size="sm" variant="outline" className="text-xs">
                        Upgrade
                      </Button>
                    )}
                  </div>
                </div>
              )
            })}
          </div>
        </div>
      )}
    </div>
  )
}

// Cinematic usage limit warning component
const UsageLimitWarning = ({ usageStatus, onUpgrade, onLogin }) => {
  // Guest user needs to login
  if (usageStatus.needsLogin) {
    return (
      <div className="mx-4 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-blue-900/20 backdrop-blur-sm rounded-xl"></div>
        <div className="relative p-4 border border-blue-500/30 rounded-xl shadow-lg shadow-blue-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-blue-500/20 rounded-xl backdrop-blur-sm">
                <AlertCircle className="h-6 w-6 text-blue-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-blue-100 mb-1">
                  Sign In to Continue
                </h3>
                <p className="text-sm text-blue-300">
                  You've used your free guest message. Sign in to get 3 more free messages!
                </p>
              </div>
            </div>
            <Button 
              onClick={onLogin} 
              className="bg-blue-600 hover:bg-blue-700 text-white border border-blue-500/30 shadow-lg shadow-blue-500/25 hover:shadow-blue-500/40 transition-all duration-300 hover:scale-105 px-6 py-2"
            >
              Sign In
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // User needs subscription
  if (usageStatus.needsSubscription) {
    return (
      <div className="mx-4 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-purple-900/30 backdrop-blur-sm rounded-xl"></div>
        <div className="relative p-4 border border-purple-500/40 rounded-xl shadow-xl shadow-purple-500/25">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-4">
              <div className="p-3 bg-purple-500/20 rounded-xl backdrop-blur-sm">
                <Crown className="h-6 w-6 text-purple-400" />
              </div>
              <div>
                <h3 className="font-bold text-lg text-purple-100 mb-1">
                  Unlock Unlimited Access
                </h3>
                <p className="text-sm text-purple-300">
                  You've used all {usageStatus.limit} free messages. Upgrade for unlimited AI conversations!
                </p>
              </div>
            </div>
            <Button 
              onClick={onUpgrade} 
              className="bg-purple-600 hover:bg-purple-700 text-white border border-purple-500/30 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 px-6 py-2"
            >
              <Crown className="mr-2 h-4 w-4" />
              Upgrade Now
            </Button>
          </div>
        </div>
      </div>
    )
  }

  // Show remaining messages
  if (usageStatus.remaining > 0 && usageStatus.remaining < Infinity) {
    const percentage = (usageStatus.remaining / usageStatus.limit) * 100
    return (
      <div className="mx-4 mb-4 relative overflow-hidden">
        <div className="absolute inset-0 bg-yellow-900/20 backdrop-blur-sm rounded-xl"></div>
        <div className="relative p-4 border border-yellow-500/30 rounded-xl shadow-lg shadow-yellow-500/20">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="p-2 bg-yellow-500/20 rounded-lg backdrop-blur-sm">
                <AlertCircle className="h-5 w-5 text-yellow-400" />
              </div>
              <div>
                <h3 className="font-semibold text-sm text-yellow-100 mb-1">
                  {usageStatus.isGuest ? 'Guest Mode' : 'Free Tier Active'}
                </h3>
                <p className="text-xs text-yellow-300">
                  {usageStatus.remaining} message{usageStatus.remaining !== 1 ? 's' : ''} remaining
                </p>
              </div>
            </div>
            <div className="flex items-center space-x-2">
              <div className="w-16 h-2 bg-yellow-900/50 rounded-full overflow-hidden">
                <div 
                  className="h-full bg-yellow-500 transition-all duration-500"
                  style={{ width: `${percentage}%` }}
                ></div>
              </div>
              <span className="text-xs text-yellow-300 font-mono">{usageStatus.remaining}/{usageStatus.limit}</span>
            </div>
          </div>
        </div>
      </div>
    )
  }

  return null
}

export default function EnhancedChatInterface() {
  const { user, loading: authLoading, logout } = useAuth()
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [userSubscription, setUserSubscription] = useState(null)
  const [userUsageCount, setUserUsageCount] = useState(0)
  const [selectedModel, setSelectedModel] = useState('dalsi-ai')
  const [availableModels, setAvailableModels] = useState([])
  const [apiHealthy, setApiHealthy] = useState({})
  const [streamingMessage, setStreamingMessage] = useState('')
  const [isStreaming, setIsStreaming] = useState(false)
  const [selectedImage, setSelectedImage] = useState(null)
  const [imagePreview, setImagePreview] = useState(null)
  const [showArchives, setShowArchives] = useState(false)
  const messagesEndRef = useRef(null)
  const fileInputRef = useRef(null)

  // Professional welcome message with proper formatting
  const welcomeMessage = {
    id: 'welcome',
    sender: 'ai',
    content: `Hello! I'm **DalSi AI**, your intelligent assistant powered by advanced artificial intelligence.

**Core Capabilities:**

**Healthcare Queries**
Medical information, symptoms analysis, treatment guidance, and clinical decision support

**Educational Support** 
Learning materials, explanations, academic assistance, and curriculum development

**AI Consultation**
Technology insights, automation solutions, AI implementation, and strategic planning

**General Assistance**
Research, analysis, problem-solving, and comprehensive support across domains

**Available Models:**
• **DalSiAI** - Advanced text-based conversations and analysis
• **DalSiAIVi** - Multimodal AI that understands both text and images

How can I assist you today?`,
    timestamp: new Date().toISOString()
  }

  useEffect(() => {
    if (!currentChatId && messages.length === 0) {
      setMessages([welcomeMessage])
    }
  }, [currentChatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages, streamingMessage])

  useEffect(() => {
    const initializeChat = async () => {
      await checkUser()
      await loadAvailableModels()
      await checkAPIHealth()
      
      // Migrate guest messages to database when user logs in
      if (user) {
        await migrateGuestMessages()
      }
    }
    
    initializeChat()
  }, [user])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const migrateGuestMessages = async () => {
    try {
      const guestMessages = JSON.parse(localStorage.getItem('guest_messages') || '[]')
      
      if (guestMessages.length === 0) return

      // Create a new chat for guest messages
      const firstUserMessage = guestMessages.find(m => m.sender === 'user')
      const chatTitle = firstUserMessage 
        ? firstUserMessage.content.split(' ').slice(0, 5).join(' ').substring(0, 40)
        : 'Guest Conversation'

      const { data: newChat, error: chatError } = await supabase
        .from('chats')
        .insert([{
          user_id: user.id,
          title: chatTitle,
          selected_model_id: selectedModel,
          archived: false
        }])
        .select()
        .single()

      if (chatError) throw chatError

      // Save all guest messages to the database
      for (const msg of guestMessages) {
        await saveMessage(newChat.id, msg.sender, msg.content, {
          migrated_from_guest: true,
          original_timestamp: msg.timestamp
        })
      }

      // Set the new chat as current and load messages
      setCurrentChatId(newChat.id)
      setMessages(guestMessages)
      
      // Clear guest messages from localStorage
      localStorage.removeItem('guest_messages')
      
      // Reload chats to show the new chat in sidebar
      await loadChats()

      console.log('Guest messages migrated successfully')
    } catch (error) {
      console.error('Error migrating guest messages:', error)
    }
  }

  const checkUser = async () => {
    try {
      if (user) {
        await loadChats()
        await loadUserSubscription(user.id)
        await loadUserUsage(user.id)
      }
    } catch (error) {
      console.error('Error checking user:', error)
    }
  }

  const loadUserSubscription = async (userId) => {
    try {
      const { data, error } = await supabase
        .from('user_subscriptions')
        .select('*')
        .eq('user_id', userId)
        .eq('status', 'active')
        .single()

      if (error && error.code !== 'PGRST116') throw error
      setUserSubscription(data)
    } catch (error) {
      console.error('Error loading subscription:', error)
    }
  }

  const loadUserUsage = async (userId) => {
    try {
      // Count user's messages for DalSiAI model
      const { count, error } = await supabase
        .from('messages')
        .select('*', { count: 'exact', head: true })
        .eq('sender', 'user')
        .in('chat_id', 
          await supabase
            .from('chats')
            .select('id')
            .eq('user_id', userId)
            .then(res => res.data?.map(chat => chat.id) || [])
        )

      if (error) throw error
      setUserUsageCount(count || 0)
    } catch (error) {
      console.error('Error loading usage:', error)
    }
  }

  const loadAvailableModels = async () => {
    const models = dalsiAPI.getAvailableModels(userSubscription)
    setAvailableModels(models)
  }

  const checkAPIHealth = async () => {
    const healthStatus = {}
    
    for (const model of availableModels) {
      try {
        const health = await dalsiAPI.healthCheck(model.id)
        healthStatus[model.id] = health.model_loaded && health.status === 'healthy'
      } catch (error) {
        healthStatus[model.id] = false
      }
    }
    
    setApiHealthy(healthStatus)
  }

  const loadChats = async () => {
    try {
      const { data, error } = await supabase
        .from('chats')
        .select('*')
        .order('updated_at', { ascending: false })

      if (error) throw error
      setChats(data || [])
    } catch (error) {
      console.error('Error loading chats:', error)
    }
  }

  const loadMessages = async (chatId) => {
    try {
      const { data, error } = await supabase
        .from('messages')
        .select('*')
        .eq('chat_id', chatId)
        .order('timestamp', { ascending: true })

      if (error) throw error
      setMessages(data || [])
    } catch (error) {
      console.error('Error loading messages:', error)
    }
  }

  const createNewChat = async () => {
    if (!user) {
      const newChatId = `demo-${Date.now()}`
      setCurrentChatId(newChatId)
      setMessages([welcomeMessage])
      return
    }

    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([{ 
          user_id: user.id, 
          title: 'New Chat',
          selected_model_id: selectedModel
        }])
        .select()
        .single()

      if (error) throw error
      
      setCurrentChatId(data.id)
      setMessages([welcomeMessage])
      loadChats()
    } catch (error) {
      console.error('Error creating chat:', error)
    }
  }

  const selectChat = async (chatId) => {
    setCurrentChatId(chatId)
    if (user) {
      await loadMessages(chatId)
    }
  }

  const handleDeleteChat = async (chatId) => {
    if (!user) return

    try {
      // Delete all messages in the chat first
      await supabase
        .from('messages')
        .delete()
        .eq('chat_id', chatId)

      // Delete the chat
      const { error } = await supabase
        .from('chats')
        .delete()
        .eq('id', chatId)

      if (error) throw error
      
      if (currentChatId === chatId) {
        setCurrentChatId(null)
        setMessages([welcomeMessage])
      }
      loadChats()
    } catch (error) {
      console.error('Error deleting chat:', error)
    }
  }

  const handleRenameChat = async (chatId, newTitle) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('chats')
        .update({ title: newTitle })
        .eq('id', chatId)

      if (error) throw error
      
      loadChats()
    } catch (error) {
      console.error('Error renaming chat:', error)
    }
  }

  const handleArchiveChat = async (chatId) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('chats')
        .update({ archived: true })
        .eq('id', chatId)

      if (error) throw error
      
      if (currentChatId === chatId) {
        setCurrentChatId(null)
        setMessages([welcomeMessage])
      }
      loadChats()
    } catch (error) {
      console.error('Error archiving chat:', error)
    }
  }

  const handleUnarchiveChat = async (chatId) => {
    if (!user) return

    try {
      const { error } = await supabase
        .from('chats')
        .update({ archived: false })
        .eq('id', chatId)

      if (error) throw error
      
      loadChats()
    } catch (error) {
      console.error('Error unarchiving chat:', error)
    }
  }

  // Legacy function for compatibility
  const deleteChat = handleDeleteChat

  const saveMessage = async (chatId, sender, content, metadata = {}) => {
    if (!user || !chatId) return

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          chat_id: chatId,
          sender,
          content,
          model_id: selectedModel,
          content_type: metadata.content_type || 'text',
          metadata,
          context_data: { timestamp: new Date().toISOString() }
        }])

      if (error) throw error

      await supabase
        .from('chats')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', chatId)

    } catch (error) {
      console.error('Error saving message:', error)
    }
  }

  const handleImageUpload = (event) => {
    const file = event.target.files[0]
    if (!file) return

    try {
      dalsiAPI.validateImageFile(file)
      setSelectedImage(file)
      
      const reader = new FileReader()
      reader.onload = (e) => setImagePreview(e.target.result)
      reader.readAsDataURL(file)
    } catch (error) {
      alert(error.message)
    }
  }

  const removeImage = () => {
    setSelectedImage(null)
    setImagePreview(null)
    if (fileInputRef.current) {
      fileInputRef.current.value = ''
    }
  }

  const handleSendMessage = async () => {
    if ((!inputMessage.trim() && !selectedImage) || isLoading || isStreaming) return

    // Check message limit per chat (11 messages max)
    if (user && currentChatId && messages.length >= 11) {
      alert('This chat has reached the maximum of 11 messages. Please start a new chat to continue.')
      return
    }

    // Auto-create chat if none exists (for logged-in users)
    if (user && !currentChatId) {
      try {
        // Create chat with first few words of message as title
        const messageWords = inputMessage.trim().split(' ').slice(0, 5).join(' ')
        const chatTitle = messageWords.length > 40 ? messageWords.substring(0, 40) + '...' : messageWords
        
        const { data, error} = await supabase
          .from('chats')
          .insert([{ 
            user_id: user.id, 
            title: chatTitle || 'New Chat',
            selected_model_id: selectedModel,
            archived: false
          }])
          .select()
          .single()

        if (error) throw error
        
        setCurrentChatId(data.id)
        await loadChats()
      } catch (error) {
        console.error('Error auto-creating chat:', error)
      }
    }

    // Check usage limits
    if (!user) {
      // Guest user
      if (!canGuestSendMessage()) {
        handleLogin()
        return
      }
    } else {
      // Logged-in user
      const canSend = canUserSendMessage(userUsageCount, userSubscription)
      if (!canSend.canSend) {
        if (canSend.reason === 'limit_reached') {
          handleUpgrade()
        }
        return
      }
    }

    // Check model access
    const accessCheck = await dalsiAPI.checkModelAccess(selectedModel, userUsageCount, userSubscription)
    if (!accessCheck.hasAccess) {
      alert(accessCheck.reason)
      if (accessCheck.upgradeRequired) {
        window.showAuth?.()
      }
      return
    }

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: inputMessage.trim() || '[Image uploaded]',
      timestamp: new Date().toISOString(),
      hasImage: !!selectedImage
    }

    setMessages(prev => [...prev, userMessage])
    const currentInput = inputMessage.trim()
    const currentImage = selectedImage
    setInputMessage('')
    removeImage()
    setIsLoading(true)
    setIsStreaming(true)

    // Save user message if authenticated
    if (user && currentChatId) {
      await saveMessage(currentChatId, 'user', userMessage.content, {
        has_image: !!currentImage,
        image_name: currentImage?.name
      })
    } else if (!user) {
      // Save guest message to localStorage
      const guestMessages = JSON.parse(localStorage.getItem('guest_messages') || '[]')
      guestMessages.push(userMessage)
      localStorage.setItem('guest_messages', JSON.stringify(guestMessages))
    }

    try {
      // Convert image to data URL if present
      let imageDataUrl = null
      if (currentImage && selectedModel === 'dalsi-aivi') {
        imageDataUrl = await dalsiAPI.imageToDataUrl(currentImage)
      }

      // Get message history for context (last 10 messages for better continuity)
      const messageHistory = messages.slice(-10)
      
      // Preprocess message
      const enhancedMessage = dalsiAPI.preprocessMessage(currentInput, messageHistory, selectedModel)
      
      // Generate AI response using streaming
      await new Promise((resolve, reject) => {
        let fullResponse = ''
        
        dalsiAPI.streamGenerateText(
          enhancedMessage,
          imageDataUrl,
          // onToken callback
          (token) => {
            fullResponse += token
            setStreamingMessage(fullResponse)
          },
          // onComplete callback
          (finalResponse) => {
            const aiResponse = {
              id: Date.now() + 1,
              sender: 'ai',
              content: finalResponse,
              timestamp: new Date().toISOString(),
              model: selectedModel
            }

            setMessages(prev => [...prev, aiResponse])
            setStreamingMessage('')
            setIsStreaming(false)
            setIsLoading(false)

            // Save AI response if authenticated
            if (user && currentChatId) {
              saveMessage(currentChatId, 'ai', aiResponse.content, {
                model_used: selectedModel,
                content_type: 'text',
                has_code: aiResponse.content.includes('```'),
                processing_time: Date.now() - userMessage.id
              })
            } else if (!user) {
              // Save guest AI response to localStorage
              const guestMessages = JSON.parse(localStorage.getItem('guest_messages') || '[]')
              guestMessages.push(aiResponse)
              localStorage.setItem('guest_messages', JSON.stringify(guestMessages))
            }

            // Update usage count
            if (selectedModel === 'dalsi-ai') {
              if (!user) {
                // Increment guest count in localStorage
                incrementGuestMessageCount()
              } else if (!userSubscription || userSubscription.status !== 'active') {
                // Increment logged-in user count
                setUserUsageCount(prev => prev + 1)
              }
            }

            resolve()
          },
          // onError callback
          (error) => {
            console.error('Error generating AI response:', error)
            
            const errorResponse = {
              id: Date.now() + 1,
              sender: 'ai',
              content: `I apologize, but I'm experiencing technical difficulties right now. ${error.message}\n\nPlease try again in a moment. If the problem persists, you can:\n\n1. Check your internet connection\n2. Refresh the page\n3. Contact our support team\n\nI'm here to help once the connection is restored!`,
              timestamp: new Date().toISOString()
            }

            setMessages(prev => [...prev, errorResponse])
            setStreamingMessage('')
            setIsStreaming(false)
            setIsLoading(false)
            reject(error)
          },
          selectedModel,  // modelId
          3000  // maxLength - sufficient for context + complete responses
        )
      })

    } catch (error) {
      console.error('Error in message handling:', error)
    }
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const exportChat = () => {
    const chatContent = messages.map(msg => 
      `**${msg.sender === 'user' ? 'You' : 'DalSi AI'}**: ${msg.content}`
    ).join('\n\n')
    
    const blob = new Blob([chatContent], { type: 'text/markdown' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url
    a.download = `dalsi-chat-${new Date().toISOString().split('T')[0]}.md`
    a.click()
    URL.revokeObjectURL(url)
  }

  const handleUpgrade = () => {
    window.navigate?.('/') // Navigate to pricing section
  }

  const handleLogin = () => {
    window.showAuth?.()
  }

  // Calculate usage status
  const usageStatus = getUsageStatus(!user, userUsageCount, userSubscription)
  const showUsageWarning = selectedModel === 'dalsi-ai'

  return (
    <div className="flex h-screen bg-background text-foreground">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 bg-sidebar text-sidebar-foreground border-r border-sidebar-border flex flex-col overflow-hidden`}>
        {/* Sidebar Header */}
        <div className="p-4 border-b border-sidebar-border">
          <div className="flex items-center space-x-3 mb-4 cursor-pointer hover:bg-sidebar-accent/50 rounded-lg p-2 -m-2 transition-colors" onClick={() => window.location.href = '/'}>
            <img src={logo} alt="Dalsi AI" className="h-8 w-8" />
            <div>
              <div className="font-bold text-foreground text-sm">Dalsi AI</div>
              <div className="text-xs text-primary">Experience AI</div>
            </div>
          </div>
          <Button 
            onClick={createNewChat}
            className="w-full bg-purple-600 hover:bg-purple-700 text-white border border-purple-500/30 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-[1.02] backdrop-blur-sm"
          >
            <Plus className="mr-2 h-4 w-4" />
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2 space-y-1">
          {chats.filter(c => !c.archived).map(chat => (
            <div 
              key={chat.id}
              className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                currentChatId === chat.id 
                  ? 'bg-primary/10 text-primary border border-primary/20' 
                  : 'hover:bg-muted text-muted-foreground'
              }`}
              onClick={() => selectChat(chat.id)}
            >
              <div className="flex items-center space-x-2 overflow-hidden">
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                <span className="truncate text-sm font-medium">{chat.title}</span>
              </div>
              <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                <ChatOptionsMenu 
                  chatId={chat.id}
                  chatTitle={chat.title}
                  onDelete={() => handleDeleteChat(chat.id)}
                  onRename={(newTitle) => handleRenameChat(chat.id, newTitle)}
                  onArchive={() => handleArchiveChat(chat.id)}
                />
              </div>
            </div>
          ))}
          
          {/* Archives Section */}
          {chats.filter(c => c.archived).length > 0 && (
            <div className="mt-4 pt-4 border-t border-sidebar-border">
              <div 
                className="flex items-center justify-between p-2 cursor-pointer hover:bg-muted rounded-lg"
                onClick={() => setShowArchives(!showArchives)}
              >
                <div className="flex items-center space-x-2">
                  <Archive className="h-4 w-4" />
                  <span className="text-sm font-medium">Archives ({chats.filter(c => c.archived).length})</span>
                </div>
                <ChevronDown className={`h-4 w-4 transition-transform ${showArchives ? 'rotate-180' : ''}`} />
              </div>
              
              {showArchives && (
                <div className="mt-2 space-y-1">
                  {chats.filter(c => c.archived).map(chat => (
                    <div 
                      key={chat.id}
                      className={`group flex items-center justify-between p-3 rounded-lg cursor-pointer transition-all ${
                        currentChatId === chat.id 
                          ? 'bg-primary/10 text-primary border border-primary/20' 
                          : 'hover:bg-muted text-muted-foreground'
                      }`}
                      onClick={() => selectChat(chat.id)}
                    >
                      <div className="flex items-center space-x-2 overflow-hidden">
                        <MessageSquare className="h-4 w-4 flex-shrink-0" />
                        <span className="truncate text-sm font-medium">{chat.title}</span>
                      </div>
                      <div className="opacity-0 group-hover:opacity-100 transition-opacity">
                        <ChatOptionsMenu 
                          chatId={chat.id}
                          chatTitle={chat.title}
                          onDelete={() => handleDeleteChat(chat.id)}
                          onRename={(newTitle) => handleRenameChat(chat.id, newTitle)}
                          onUnarchive={() => handleUnarchiveChat(chat.id)}
                          isArchived={true}
                        />
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          )}
        </div>

        {/* Sidebar Footer */}
        <div className="p-4 border-t border-sidebar-border">
          {authLoading ? (
            <div className="h-10"></div>
          ) : user ? (
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2 overflow-hidden">
                <User className="h-5 w-5 text-muted-foreground" />
                <span className="truncate text-sm text-foreground">{user.first_name || user.email}</span>
              </div>
              <Button 
                variant="ghost" 
                size="sm" 
                className="text-xs"
                onClick={logout}
              >
                Logout
              </Button>
            </div>
          ) : (
            <Button className="w-full" onClick={() => window.showAuth?.()}>Sign In</Button>
          )}
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b border-border bg-background">
          <div className="flex items-center space-x-4">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="md:hidden"
            >
              {sidebarOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
            </Button>
            
            {/* Navigation Menu */}
            <nav className="flex items-center space-x-1 ml-4">
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/'} className="text-xs px-2">
                Home
              </Button>
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#solutions'} className="text-xs px-2">
                Solutions
              </Button>
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#healthcare'} className="text-xs px-2">
                Healthcare
              </Button>
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#education'} className="text-xs px-2">
                Education
              </Button>
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#about'} className="text-xs px-2">
                About
              </Button>
              <Button variant="ghost" size="sm" onClick={() => window.location.href = '/#contact'} className="text-xs px-2">
                Contact
              </Button>
            </nav>
            
            <ModelSelector
              selectedModel={selectedModel}
              onModelChange={setSelectedModel}
              availableModels={availableModels}
              userUsageCount={userUsageCount}
              userSubscription={userSubscription}
            />
          </div>
          
          <div className="flex items-center space-x-4">
            <div className={`flex items-center space-x-2 text-sm ${apiHealthy[selectedModel] ? 'text-green-600' : 'text-red-600'}`}>
              <div className={`w-2 h-2 rounded-full ${apiHealthy[selectedModel] ? 'bg-green-500' : 'bg-red-500'} ${apiHealthy[selectedModel] === undefined ? 'animate-pulse' : ''}`}></div>
              <span>{apiHealthy[selectedModel] ? 'Online' : apiHealthy[selectedModel] === false ? 'Offline' : ''}</span>
            </div>
            <Button variant="outline" size="sm" onClick={exportChat}>
              <Download className="mr-2 h-4 w-4" />
              Export
            </Button>
          </div>
        </div>

        {/* Usage Warning */}
        {showUsageWarning && (
          <UsageLimitWarning 
            usageStatus={usageStatus}
            onUpgrade={handleUpgrade}
            onLogin={handleLogin}
          />
        )}

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="max-w-4xl mx-auto p-6 space-y-6">
            {messages.map(msg => (
              <div key={msg.id} className={`flex ${msg.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                <div className={`max-w-3xl ${msg.sender === 'user' ? 'order-2' : 'order-1'}`}>
                  <div className="flex items-start space-x-3">
                    {msg.sender === 'ai' && (
                      <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25 border border-purple-500/30">
                        <Bot className="h-5 w-5 text-white" />
                      </div>
                    )}
                    <Card className={`group relative overflow-hidden backdrop-blur-sm ${
                      msg.sender === 'user' 
                        ? 'bg-red-600/90 text-white border border-red-500/30 shadow-lg shadow-red-500/20' 
                        : 'bg-black/40 text-white border border-purple-500/20 shadow-lg shadow-purple-500/10'
                    }`}>
                      <div className={`absolute inset-0 ${
                        msg.sender === 'user' 
                          ? 'bg-red-900/20' 
                          : 'bg-purple-900/10'
                      } backdrop-blur-sm`}></div>
                      <CardContent className="p-4 relative z-10">
                        <MessageContent content={msg.content} />
                        {msg.sender === 'ai' && msg.id !== 'welcome' && (
                          <div className="flex items-center justify-end space-x-2 mt-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 transition-all duration-200">
                              <ThumbsUp className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 transition-all duration-200">
                              <ThumbsDown className="h-3 w-3" />
                            </Button>
                            <Button variant="ghost" size="icon" className="h-7 w-7 hover:bg-purple-500/20 text-purple-300 hover:text-purple-200 transition-all duration-200">
                              <Share className="h-3 w-3" />
                            </Button>
                          </div>
                        )}
                      </CardContent>
                    </Card>
                    {msg.sender === 'user' && (
                      <div className="w-10 h-10 bg-red-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-red-500/25 border border-red-500/30">
                        <User className="h-5 w-5 text-white" />
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {/* Streaming Message Display */}
            {isStreaming && streamingMessage && (
              <div className="flex justify-start">
                <div className="max-w-3xl order-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-10 h-10 bg-purple-600 rounded-xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-purple-500/25 border border-purple-500/30">
                      <Bot className="h-5 w-5 text-white animate-pulse" />
                    </div>
                    <Card className="group relative overflow-hidden backdrop-blur-sm bg-black/40 text-white border border-purple-500/20 shadow-lg shadow-purple-500/10">
                      <div className="absolute inset-0 bg-purple-900/10 backdrop-blur-sm"></div>
                      <CardContent className="p-4 relative z-10">
                        <MessageContent content={streamingMessage} />
                        <div className="flex items-center space-x-2 mt-3 text-purple-300">
                          <div className="flex space-x-1">
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce"></div>
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-100"></div>
                            <div className="w-1.5 h-1.5 bg-purple-400 rounded-full animate-bounce delay-200"></div>
                          </div>
                          <span className="text-xs font-medium">Generating response...</span>
                        </div>
                      </CardContent>
                    </Card>
                  </div>
                </div>
              </div>
            )}

            {/* Loading Indicator */}
            {isLoading && !isStreaming && (
              <div className="flex justify-start">
                <div className="max-w-3xl order-1">
                  <div className="flex items-start space-x-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-primary to-accent rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-white animate-pulse" />
                    </div>
                    <div className="bg-card p-4 rounded-lg">
                      <div className="animate-pulse bg-muted h-4 w-32 rounded"></div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-background">
          {/* Image Preview */}
          {imagePreview && (
            <div className="mb-4 p-3 bg-muted rounded-lg">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <img src={imagePreview} alt="Upload preview" className="w-12 h-12 object-cover rounded" />
                  <span className="text-sm text-muted-foreground">{selectedImage?.name}</span>
                </div>
                <Button variant="ghost" size="sm" onClick={removeImage}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}

          <div className="flex items-end space-x-3">
            <div className="flex-1 relative">
              <Input
                placeholder={selectedModel === 'dalsi-aivi' ? "Ask anything or upload an image..." : "Ask anything about Healthcare, Education, or AI..."}
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                disabled={isLoading || isStreaming || (usageStatus.needsLogin || usageStatus.needsSubscription)}
                className="pr-12 min-h-[44px] resize-none"
              />
              {selectedModel === 'dalsi-aivi' && (
                <Button
                  variant="ghost"
                  size="icon"
                  className="absolute right-2 top-1/2 transform -translate-y-1/2 h-8 w-8"
                  onClick={() => fileInputRef.current?.click()}
                  disabled={isLoading || isStreaming}
                >
                  <Upload className="h-4 w-4" />
                </Button>
              )}
              <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="image/png, image/jpeg, image/gif, image/webp" 
                onChange={handleImageUpload} 
              />
            </div>
            <Button 
              onClick={handleSendMessage} 
              disabled={isLoading || isStreaming || (!inputMessage.trim() && !selectedImage) || usageStatus.needsLogin || usageStatus.needsSubscription}
              className="h-11 w-11 p-0 flex-shrink-0 bg-purple-600 hover:bg-purple-700 text-white border border-purple-500/30 shadow-lg shadow-purple-500/25 hover:shadow-purple-500/40 transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:hover:scale-100"
            >
              <Send className="h-5 w-5" />
            </Button>
          </div>
          <p className="text-xs text-muted-foreground mt-2 text-center">
            DalSi AI can make mistakes. Consider checking important information. • Code snippets are syntax highlighted and copyable.
          </p>
        </div>
      </div>
    </div>
  )
}

