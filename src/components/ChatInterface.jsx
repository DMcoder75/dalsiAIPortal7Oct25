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
  X
} from 'lucide-react'
import { supabase } from '../lib/supabase'
import logo from '../assets/DalSiAILogo2.png'

export default function ChatInterface() {
  const [messages, setMessages] = useState([])
  const [inputMessage, setInputMessage] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [chats, setChats] = useState([])
  const [currentChatId, setCurrentChatId] = useState(null)
  const [sidebarOpen, setSidebarOpen] = useState(true)
  const [user, setUser] = useState(null)
  const messagesEndRef = useRef(null)

  // Sample welcome message
  const welcomeMessage = {
    id: 'welcome',
    sender: 'ai',
    content: `Hello! I'm DalSi AI, your intelligent assistant powered by advanced artificial intelligence. I'm here to help you with:

🏥 **Healthcare Queries** - Medical information, symptoms analysis, treatment guidance
📚 **Educational Support** - Learning materials, explanations, academic assistance  
🤖 **AI Consultation** - Technology insights, automation solutions, AI implementation
💡 **General Assistance** - Research, analysis, problem-solving, and more

How can I assist you today?`,
    timestamp: new Date().toISOString()
  }

  useEffect(() => {
    // Initialize with welcome message if no current chat
    if (!currentChatId && messages.length === 0) {
      setMessages([welcomeMessage])
    }
  }, [currentChatId])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  useEffect(() => {
    // Check if user is authenticated
    const checkUser = async () => {
      const { data: { user } } = await supabase.auth.getUser()
      setUser(user)
      if (user) {
        loadChats()
      }
    }
    checkUser()
  }, [])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
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
      // For demo purposes, create local chat
      const newChatId = `demo-${Date.now()}`
      setCurrentChatId(newChatId)
      setMessages([welcomeMessage])
      return
    }

    try {
      const { data, error } = await supabase
        .from('chats')
        .insert([{ user_id: user.id, title: 'New Chat' }])
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

  const deleteChat = async (chatId) => {
    if (!user) return

    try {
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

  const saveMessage = async (chatId, sender, content) => {
    if (!user || !chatId) return

    try {
      const { error } = await supabase
        .from('messages')
        .insert([{
          chat_id: chatId,
          sender,
          content,
          context_data: { timestamp: new Date().toISOString() }
        }])

      if (error) throw error

      // Update chat timestamp
      await supabase
        .from('chats')
        .update({ updated_at: new Date().toISOString() })
        .eq('id', chatId)

    } catch (error) {
      console.error('Error saving message:', error)
    }
  }

  const simulateAIResponse = (userMessage) => {
    // Simulate AI processing delay
    const responses = [
      "I understand your question. Based on the information provided, here's what I can help you with...",
      "That's an interesting query! Let me analyze this for you and provide a comprehensive response...",
      "Thank you for your question. I'll break this down into key points to give you the most helpful answer...",
      "I can definitely assist with that. Here's my analysis and recommendations based on current best practices...",
      "Great question! This touches on several important aspects. Let me walk you through each one..."
    ]

    const randomResponse = responses[Math.floor(Math.random() * responses.length)]
    
    // Add some context-aware responses
    if (userMessage.toLowerCase().includes('health') || userMessage.toLowerCase().includes('medical')) {
      return "As a healthcare AI assistant, I can help you with medical information and guidance. However, please remember that I'm not a substitute for professional medical advice. For serious health concerns, always consult with a qualified healthcare provider. That said, I'm here to help with general health information, symptom understanding, and wellness guidance. What specific health topic would you like to explore?"
    }
    
    if (userMessage.toLowerCase().includes('education') || userMessage.toLowerCase().includes('learn')) {
      return "I'm excited to help with your educational needs! As an AI tutor, I can assist with explanations, create learning materials, help with research, and provide study guidance across various subjects. Whether you're looking for concept explanations, homework help, or learning strategies, I'm here to support your educational journey. What would you like to learn about today?"
    }

    return randomResponse + "\n\nThis is a demo response. In the full implementation, this would connect to our advanced DalSi AI models for real-time, context-aware responses tailored to your specific needs."
  }

  const handleSendMessage = async () => {
    if (!inputMessage.trim()) return

    const userMessage = {
      id: Date.now(),
      sender: 'user',
      content: inputMessage.trim(),
      timestamp: new Date().toISOString()
    }

    setMessages(prev => [...prev, userMessage])
    setInputMessage('')
    setIsLoading(true)

    // Save user message if authenticated
    if (user && currentChatId) {
      await saveMessage(currentChatId, 'user', userMessage.content)
    }

    // Simulate AI response
    setTimeout(async () => {
      const aiResponse = {
        id: Date.now() + 1,
        sender: 'ai',
        content: simulateAIResponse(userMessage.content),
        timestamp: new Date().toISOString()
      }

      setMessages(prev => [...prev, aiResponse])
      setIsLoading(false)

      // Save AI response if authenticated
      if (user && currentChatId) {
        await saveMessage(currentChatId, 'ai', aiResponse.content)
      }
    }, 1000 + Math.random() * 2000) // Random delay between 1-3 seconds
  }

  const handleKeyPress = (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  const copyMessage = (content) => {
    navigator.clipboard.writeText(content)
  }

  const rateMessage = async (messageId, rating) => {
    if (!user) return
    
    try {
      const { error } = await supabase
        .from('messages')
        .update({ feedback_score: rating })
        .eq('id', messageId)

      if (error) throw error
    } catch (error) {
      console.error('Error rating message:', error)
    }
  }

  return (
    <div className="flex h-screen bg-background">
      {/* Sidebar */}
      <div className={`${sidebarOpen ? 'w-64' : 'w-0'} transition-all duration-300 border-r border-border flex flex-col overflow-hidden relative`}
        style={{ backgroundImage: `url('/Design9.png')`, backgroundSize: 'cover', backgroundPosition: 'center' }}>
        <div className="absolute inset-0 bg-card opacity-85 z-0"></div>
        <div className="relative z-10 flex flex-col h-full">
        {/* Sidebar Header */}
        <div className="p-4 border-b border-border">
          <div className="flex items-center space-x-3 mb-4">
            <img src={logo} alt="Dalsi AI" className="h-8 w-8" />
            <div>
              <div className="font-bold text-foreground text-sm">Dalsi AI</div>
              <div className="text-xs text-primary">Experience AI</div>
            </div>
          </div>
          <Button 
            onClick={createNewChat}
            className="w-full bg-primary hover:bg-primary/90 text-primary-foreground"
            size="sm"
          >
            <Plus className="h-4 w-4 mr-2" />
            New Chat
          </Button>
        </div>

        {/* Chat History */}
        <div className="flex-1 overflow-y-auto p-2">
          <div className="space-y-1">
            {chats.map((chat) => (
              <div
                key={chat.id}
                className={`group flex items-center space-x-2 p-2 rounded-lg cursor-pointer transition-colors ${
                  currentChatId === chat.id ? 'bg-primary/10 text-primary' : 'hover:bg-muted'
                }`}
                onClick={() => selectChat(chat.id)}
              >
                <MessageSquare className="h-4 w-4 flex-shrink-0" />
                <span className="flex-1 text-sm truncate">{chat.title}</span>
                <Button
                  variant="ghost"
                  size="sm"
                  className="opacity-0 group-hover:opacity-100 h-6 w-6 p-0"
                  onClick={(e) => {
                    e.stopPropagation()
                    deleteChat(chat.id)
                  }}
                >
                  <Trash2 className="h-3 w-3" />
                </Button>
              </div>
            ))}
          </div>
        </div>

        {/* User Info */}
        <div className="p-4 border-t border-border">
          <div className="flex items-center space-x-2">
            <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
              <User className="h-4 w-4 text-primary" />
            </div>
            <div className="flex-1">
              <div className="text-sm font-medium text-foreground">
                {user ? user.email : 'Demo User'}
              </div>
              <div className="text-xs text-muted-foreground">
                {user ? 'Authenticated' : 'Demo Mode'}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Main Chat Area */}
      <div className="flex-1 flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-border bg-card/50">
          <div className="flex items-center space-x-3">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="lg:hidden"
            >
              {sidebarOpen ? <X className="h-4 w-4" /> : <Menu className="h-4 w-4" />}
            </Button>
            <div className="flex items-center space-x-2">
              <Bot className="h-6 w-6 text-primary animate-pulse" />
              <div>
                <div className="font-semibold text-foreground">DalSi AI Assistant</div>
                <div className="text-xs text-muted-foreground">
                  {isLoading ? 'Thinking...' : 'Ready to help'}
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto p-4 space-y-4">
          {messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}
            >
              <div className={`max-w-3xl ${message.sender === 'user' ? 'order-2' : 'order-1'}`}>
                <div className="flex items-start space-x-3">
                  {message.sender === 'ai' && (
                    <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <Bot className="h-4 w-4 text-primary" />
                    </div>
                  )}
                  
                  <Card className={`${
                    message.sender === 'user' 
                      ? 'bg-primary text-primary-foreground' 
                      : 'bg-card border-border'
                  }`}>
                    <CardContent className="p-4">
                      <div className="whitespace-pre-wrap text-sm leading-relaxed">
                        {message.content}
                      </div>
                      
                      {/* Message Actions */}
                      {message.sender === 'ai' && (
                        <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-border/50">
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => copyMessage(message.content)}
                            className="h-6 px-2 text-xs"
                          >
                            <Copy className="h-3 w-3 mr-1" />
                            Copy
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => rateMessage(message.id, 1)}
                            className="h-6 px-2 text-xs"
                          >
                            <ThumbsUp className="h-3 w-3 mr-1" />
                            Good
                          </Button>
                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => rateMessage(message.id, -1)}
                            className="h-6 px-2 text-xs"
                          >
                            <ThumbsDown className="h-3 w-3 mr-1" />
                            Poor
                          </Button>
                        </div>
                      )}
                    </CardContent>
                  </Card>

                  {message.sender === 'user' && (
                    <div className="w-8 h-8 bg-accent/20 rounded-full flex items-center justify-center flex-shrink-0">
                      <User className="h-4 w-4 text-accent" />
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
          
          {isLoading && (
            <div className="flex justify-start">
              <div className="flex items-start space-x-3">
                <div className="w-8 h-8 bg-primary/20 rounded-full flex items-center justify-center">
                  <Bot className="h-4 w-4 text-primary animate-pulse" />
                </div>
                <Card className="bg-card border-border">
                  <CardContent className="p-4">
                    <div className="flex space-x-1">
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-100"></div>
                      <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-200"></div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            </div>
          )}
          
          <div ref={messagesEndRef} />
        </div>

        {/* Input Area */}
        <div className="p-4 border-t border-border bg-card/50">
          <div className="flex space-x-3">
            <div className="flex-1 relative">
              <Input
                value={inputMessage}
                onChange={(e) => setInputMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Type your message here... (Press Enter to send)"
                className="pr-12 bg-background border-border focus:border-primary"
                disabled={isLoading}
              />
              <Button
                onClick={handleSendMessage}
                disabled={!inputMessage.trim() || isLoading}
                className="absolute right-1 top-1 h-8 w-8 p-0 bg-primary hover:bg-primary/90"
                size="sm"
              >
                <Send className="h-4 w-4" />
              </Button>
            </div>
          </div>
          <div className="text-xs text-muted-foreground mt-2 text-center">
            DalSi AI can make mistakes. Consider checking important information.
          </div>
        </div>
      </div>
    </div>
  )
}
