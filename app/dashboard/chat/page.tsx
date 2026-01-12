'use client'

import { useState, useEffect, useRef } from 'react'
import { useSession } from 'next-auth/react'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  MessageSquare, Send, Paperclip, Image as ImageIcon, X,
  Smile, MoreVertical, Phone, Video, Info, Search,
  Check, CheckCheck, Clock, AlertCircle, Minimize2,
  Maximize2, ChevronDown, Zap, FileText, Download
} from 'lucide-react'
import { toast } from 'react-hot-toast'

interface Message {
  id: string
  content: string
  sender: 'user' | 'admin'
  timestamp: string
  status: 'sending' | 'sent' | 'delivered' | 'read'
  type: 'text' | 'image' | 'file'
  fileUrl?: string
  fileName?: string
}

interface QuickReply {
  id: string
  text: string
  icon: any
}

export default function ChatPage() {
  const { data: session, status } = useSession()
  const router = useRouter()
  const messagesEndRef = useRef<HTMLDivElement>(null)
  const fileInputRef = useRef<HTMLInputElement>(null)
  
  const [messages, setMessages] = useState<Message[]>([])
  const [inputMessage, setInputMessage] = useState('')
  const [isTyping, setIsTyping] = useState(false)
  const [adminOnline, setAdminOnline] = useState(true)
  const [showQuickReplies, setShowQuickReplies] = useState(true)
  const [isMinimized, setIsMinimized] = useState(false)
  const [searchQuery, setSearchQuery] = useState('')

  useEffect(() => {
    if (status === 'unauthenticated') {
      router.push('/auth/login')
    } else if (session?.user?.role === 'ADMIN') {
      router.push('/admin')
    }
  }, [session, status, router])

  useEffect(() => {
    // Mock messages
    const mockMessages: Message[] = [
      {
        id: '1',
        content: 'Hello! Welcome to Corporate Breeze support. How can I help you today?',
        sender: 'admin',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        status: 'read',
        type: 'text'
      },
      {
        id: '2',
        content: 'Hi! I have a question about my recent order.',
        sender: 'user',
        timestamp: new Date(Date.now() - 3500000).toISOString(),
        status: 'read',
        type: 'text'
      },
      {
        id: '3',
        content: 'Of course! I\'d be happy to help. Could you please provide your order number?',
        sender: 'admin',
        timestamp: new Date(Date.now() - 3400000).toISOString(),
        status: 'read',
        type: 'text'
      }
    ]
    setMessages(mockMessages)
  }, [])

  useEffect(() => {
    scrollToBottom()
  }, [messages])

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }

  const quickReplies: QuickReply[] = [
    { id: '1', text: 'Track my order', icon: '📦' },
    { id: '2', text: 'Pricing information', icon: '💰' },
    { id: '3', text: 'Design help', icon: '🎨' },
    { id: '4', text: 'Technical support', icon: '🛠️' }
  ]

  const sendMessage = () => {
    if (!inputMessage.trim()) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: inputMessage,
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sending',
      type: 'text'
    }

    setMessages([...messages, newMessage])
    setInputMessage('')
    setShowQuickReplies(false)

    // Simulate message sent
    setTimeout(() => {
      setMessages(prev => prev.map(msg => 
        msg.id === newMessage.id ? { ...msg, status: 'sent' } : msg
      ))
    }, 500)

    // Simulate admin typing
    setTimeout(() => {
      setIsTyping(true)
    }, 1000)

    // Simulate admin response
    setTimeout(() => {
      setIsTyping(false)
      const adminReply: Message = {
        id: (Date.now() + 1).toString(),
        content: 'Thank you for your message! Our team is reviewing your request and will respond shortly.',
        sender: 'admin',
        timestamp: new Date().toISOString(),
        status: 'sent',
        type: 'text'
      }
      setMessages(prev => [...prev, adminReply])
    }, 3000)
  }

  const handleQuickReply = (text: string) => {
    setInputMessage(text)
    setShowQuickReplies(false)
  }

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (!file) return

    const newMessage: Message = {
      id: Date.now().toString(),
      content: 'File uploaded',
      sender: 'user',
      timestamp: new Date().toISOString(),
      status: 'sent',
      type: 'file',
      fileName: file.name,
      fileUrl: URL.createObjectURL(file)
    }

    setMessages([...messages, newMessage])
    toast.success('File uploaded successfully!')
  }

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp)
    return date.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })
  }

  const getMessageStatusIcon = (status: Message['status']) => {
    switch (status) {
      case 'sending':
        return <Clock className="w-3 h-3 text-gray-400" />
      case 'sent':
        return <Check className="w-3 h-3 text-gray-400" />
      case 'delivered':
        return <CheckCheck className="w-3 h-3 text-gray-400" />
      case 'read':
        return <CheckCheck className="w-3 h-3 text-brand-cyan" />
    }
  }

  if (status === 'loading') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 border-4 border-brand-cyan border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-gray-600">Loading chat...</p>
        </div>
      </div>
    )
  }

  if (!session || session.user?.role === 'ADMIN') {
    return null
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-50 to-gray-100">
      {/* Navigation */}
      <nav className="bg-white border-b border-gray-200 sticky top-0 z-50 shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            <Link href="/dashboard" className="flex items-center gap-2 text-gray-600 hover:text-gray-900">
              ← Back to Dashboard
            </Link>
            <div className="flex items-center gap-2">
              <div className={`w-2 h-2 rounded-full ${adminOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
              <span className="text-sm font-semibold text-gray-900">
                {adminOnline ? 'Support Online' : 'Support Offline'}
              </span>
            </div>
          </div>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Sidebar */}
          <div className="lg:col-span-1 space-y-6">
            {/* Support Info */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-full flex items-center justify-center text-white font-bold">
                  CB
                </div>
                <div>
                  <h3 className="font-bold text-gray-900">Support Team</h3>
                  <div className="flex items-center gap-1">
                    <div className={`w-2 h-2 rounded-full ${adminOnline ? 'bg-green-500' : 'bg-gray-400'}`}></div>
                    <span className="text-xs text-gray-600">{adminOnline ? 'Online' : 'Offline'}</span>
                  </div>
                </div>
              </div>
              <p className="text-sm text-gray-600 mb-4">
                We're here to help! Average response time: <span className="font-semibold text-brand-cyan">2 minutes</span>
              </p>
              <div className="space-y-2">
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-sm transition-colors">
                  <Phone className="w-4 h-4" />
                  Call Us
                </button>
                <button className="w-full flex items-center justify-center gap-2 px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded-xl font-semibold text-sm transition-colors">
                  <Video className="w-4 h-4" />
                  Video Call
                </button>
              </div>
            </div>

            {/* Quick Links */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="font-bold text-gray-900 mb-4">Quick Links</h3>
              <div className="space-y-2">
                <Link href="/dashboard/orders" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-cyan transition-colors">
                  <FileText className="w-4 h-4" />
                  My Orders
                </Link>
                <Link href="/dashboard/shop" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-cyan transition-colors">
                  <MessageSquare className="w-4 h-4" />
                  Browse Products
                </Link>
                <Link href="/dashboard/designer" className="flex items-center gap-2 text-sm text-gray-600 hover:text-brand-cyan transition-colors">
                  <Zap className="w-4 h-4" />
                  Design Tool
                </Link>
              </div>
            </div>

            {/* FAQs */}
            <div className="bg-gradient-to-br from-purple-50 to-pink-50 rounded-2xl p-6 border border-purple-200">
              <h3 className="font-bold text-gray-900 mb-3">Common Questions</h3>
              <div className="space-y-3 text-sm">
                <button className="w-full text-left text-gray-700 hover:text-brand-cyan transition-colors">
                  How do I track my order?
                </button>
                <button className="w-full text-left text-gray-700 hover:text-brand-cyan transition-colors">
                  What are your shipping rates?
                </button>
                <button className="w-full text-left text-gray-700 hover:text-brand-cyan transition-colors">
                  Can I modify my design?
                </button>
              </div>
            </div>
          </div>

          {/* Chat Area */}
          <div className="lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden flex flex-col" style={{ height: 'calc(100vh - 200px)' }}>
              {/* Chat Header */}
              <div className="bg-gradient-to-r from-brand-blue to-brand-cyan p-4 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center">
                    <MessageSquare className="w-6 h-6 text-white" />
                  </div>
                  <div className="text-white">
                    <h2 className="font-bold">Live Support</h2>
                    <p className="text-xs text-white/80">Chat with our team</p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white">
                    <Search className="w-5 h-5" />
                  </button>
                  <button 
                    onClick={() => setIsMinimized(!isMinimized)}
                    className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white"
                  >
                    {isMinimized ? <Maximize2 className="w-5 h-5" /> : <Minimize2 className="w-5 h-5" />}
                  </button>
                  <button className="p-2 hover:bg-white/20 rounded-lg transition-colors text-white">
                    <MoreVertical className="w-5 h-5" />
                  </button>
                </div>
              </div>

              {!isMinimized && (
                <>
                  {/* Messages Area */}
                  <div className="flex-1 overflow-y-auto p-6 bg-gray-50">
                    <div className="space-y-4">
                      {/* Welcome Message */}
                      <div className="flex justify-center">
                        <div className="bg-white px-4 py-2 rounded-full shadow-sm border border-gray-200 text-xs text-gray-600">
                          Chat started {new Date().toLocaleDateString()}
                        </div>
                      </div>

                      {/* Messages */}
                      {messages.map((message) => (
                        <div key={message.id} className={`flex ${message.sender === 'user' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`flex items-end gap-2 max-w-md ${message.sender === 'user' ? 'flex-row-reverse' : ''}`}>
                            {/* Avatar */}
                            <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                              message.sender === 'admin' 
                                ? 'bg-gradient-to-br from-brand-blue to-brand-cyan text-white' 
                                : 'bg-gray-200 text-gray-700'
                            }`}>
                              {message.sender === 'admin' ? 'CB' : session.user?.name?.charAt(0).toUpperCase()}
                            </div>

                            {/* Message Bubble */}
                            <div className="flex-1">
                              <div className={`rounded-2xl p-4 ${
                                message.sender === 'user' 
                                  ? 'bg-gradient-to-r from-brand-blue to-brand-cyan text-white' 
                                  : 'bg-white border border-gray-200 text-gray-900'
                              }`}>
                                {message.type === 'text' && (
                                  <p className="text-sm">{message.content}</p>
                                )}
                                {message.type === 'file' && (
                                  <div className="flex items-center gap-3">
                                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                                      <FileText className="w-5 h-5" />
                                    </div>
                                    <div className="flex-1">
                                      <p className="text-sm font-semibold">{message.fileName}</p>
                                      <button className="text-xs underline flex items-center gap-1 mt-1">
                                        <Download className="w-3 h-3" />
                                        Download
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                              
                              {/* Message Info */}
                              <div className={`flex items-center gap-1 mt-1 px-2 ${message.sender === 'user' ? 'justify-end' : ''}`}>
                                <span className="text-xs text-gray-500">{formatTime(message.timestamp)}</span>
                                {message.sender === 'user' && getMessageStatusIcon(message.status)}
                              </div>
                            </div>
                          </div>
                        </div>
                      ))}

                      {/* Typing Indicator */}
                      {isTyping && (
                        <div className="flex justify-start">
                          <div className="flex items-end gap-2">
                            <div className="w-8 h-8 bg-gradient-to-br from-brand-blue to-brand-cyan rounded-full flex items-center justify-center text-white text-sm font-bold">
                              CB
                            </div>
                            <div className="bg-white border border-gray-200 rounded-2xl px-4 py-3">
                              <div className="flex gap-1">
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }}></div>
                                <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }}></div>
                              </div>
                            </div>
                          </div>
                        </div>
                      )}

                      <div ref={messagesEndRef} />
                    </div>
                  </div>

                  {/* Quick Replies */}
                  {showQuickReplies && messages.length <= 3 && (
                    <div className="px-6 py-4 bg-white border-t border-gray-100">
                      <p className="text-xs text-gray-600 mb-3 font-semibold">Quick Replies:</p>
                      <div className="grid grid-cols-2 gap-2">
                        {quickReplies.map((reply) => (
                          <button
                            key={reply.id}
                            onClick={() => handleQuickReply(reply.text)}
                            className="flex items-center gap-2 px-4 py-2 bg-gray-50 hover:bg-gray-100 rounded-xl text-sm font-medium text-gray-700 transition-colors"
                          >
                            <span>{reply.icon}</span>
                            <span>{reply.text}</span>
                          </button>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Input Area */}
                  <div className="p-4 bg-white border-t border-gray-200">
                    <div className="flex items-end gap-3">
                      <div className="flex gap-2">
                        <button
                          onClick={() => fileInputRef.current?.click()}
                          className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors"
                        >
                          <Paperclip className="w-5 h-5 text-gray-600" />
                        </button>
                        <input
                          ref={fileInputRef}
                          type="file"
                          className="hidden"
                          onChange={handleFileUpload}
                        />
                        <button className="p-3 bg-gray-100 hover:bg-gray-200 rounded-xl transition-colors">
                          <ImageIcon className="w-5 h-5 text-gray-600" />
                        </button>
                      </div>

                      <div className="flex-1 relative">
                        <textarea
                          value={inputMessage}
                          onChange={(e) => setInputMessage(e.target.value)}
                          onKeyPress={(e) => {
                            if (e.key === 'Enter' && !e.shiftKey) {
                              e.preventDefault()
                              sendMessage()
                            }
                          }}
                          placeholder="Type your message..."
                          rows={1}
                          className="w-full px-4 py-3 pr-12 rounded-xl border border-gray-300 focus:border-brand-cyan focus:ring-2 focus:ring-brand-cyan/20 outline-none resize-none"
                          style={{ minHeight: '48px', maxHeight: '120px' }}
                        />
                        <button className="absolute right-3 top-1/2 transform -translate-y-1/2 p-1 hover:bg-gray-100 rounded-lg transition-colors">
                          <Smile className="w-5 h-5 text-gray-400" />
                        </button>
                      </div>

                      <button
                        onClick={sendMessage}
                        disabled={!inputMessage.trim()}
                        className="p-3 bg-gradient-to-r from-brand-blue to-brand-cyan text-white rounded-xl hover:shadow-lg transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                      >
                        <Send className="w-5 h-5" />
                      </button>
                    </div>
                    <p className="text-xs text-gray-500 mt-2 text-center">
                      Press Enter to send, Shift + Enter for new line
                    </p>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
