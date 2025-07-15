'use client'

import { useState } from 'react'

interface Message {
  id: number
  text: string
  isUser: boolean
  timestamp: Date
}

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([
    {
      id: 1,
      text: "Hi! I'm your Team Portal assistant. I can help you with information about our services, team, projects, and more. What would you like to know?",
      isUser: false,
      timestamp: new Date()
    }
  ])
  const [inputText, setInputText] = useState('')
  const [isTyping, setIsTyping] = useState(false)

  // Sample responses based on site content
  const getResponse = (userMessage: string): string => {
    const message = userMessage.toLowerCase()
    
    if (message.includes('team') || message.includes('about')) {
      return "Our team consists of experienced developers, designers, and product experts. We have specialists in React, Node.js, UI/UX design, DevOps, and quality assurance. You can learn more about our team members on the About page."
    }
    
    if (message.includes('service') || message.includes('what do you do')) {
      return "We offer comprehensive software development services including web application development, API development & integration, cloud infrastructure, database design, UI/UX design, and quality assurance. We use modern technologies like React, Next.js, AWS, and more."
    }
    
    if (message.includes('project') || message.includes('update')) {
      return "You can follow our current projects on the Updates page. We have active projects like Portal Development, Customer Onboarding System, and API Integration Platform. You can follow projects to receive notifications about their progress."
    }
    
    if (message.includes('calendar') || message.includes('meeting') || message.includes('event')) {
      return "Our team calendar shows upcoming meetings, demos, code reviews, and milestones. You can view the calendar to see team activities and important dates. We typically have sprint planning, stakeholder demos, and retrospectives scheduled regularly."
    }
    
    if (message.includes('resource') || message.includes('document')) {
      return "We maintain a comprehensive resource library with project presentations, technical documentation, and knowledge base articles. Resources are organized by project and include presentations, documentation, and knowledge sharing materials."
    }
    
    if (message.includes('feedback') || message.includes('support')) {
      return "You can submit feedback through our Feedback page. We accept general feedback, bug reports, feature requests, resource review requests, and support questions. You can also reach us at support@teamportal.com or call +1 (555) 123-4567."
    }
    
    if (message.includes('process') || message.includes('how do you work')) {
      return "Our development process follows 4 key steps: 1) Discovery & Planning - understanding your needs, 2) Design & Architecture - creating detailed designs, 3) Development & Testing - building with agile methodologies, and 4) Deployment & Support - launching with ongoing support."
    }
    
    if (message.includes('technology') || message.includes('tech stack')) {
      return "We work with modern technologies including React, Next.js, Node.js, TypeScript, Python, PostgreSQL, MongoDB, AWS, Docker, Kubernetes, and more. Our tech stack is chosen based on project requirements and scalability needs."
    }
    
    if (message.includes('contact') || message.includes('reach')) {
      return "You can reach us through multiple channels: Email at support@teamportal.com, phone at +1 (555) 123-4567 (Mon-Fri, 9AM-5PM EST), or submit feedback through our portal. For urgent issues, use the 'Report Critical Issue' option in the Feedback section."
    }
    
    if (message.includes('hello') || message.includes('hi') || message.includes('hey')) {
      return "Hello! I'm here to help you navigate our Team Portal and answer questions about our services, projects, and team. What would you like to know?"
    }
    
    // Default response
    return "I'd be happy to help! I can provide information about our team, services, current projects, calendar events, resources, and how to get support. Could you please be more specific about what you'd like to know?"
  }

  const handleSendMessage = async () => {
    if (!inputText.trim()) return

    const userMessage: Message = {
      id: messages.length + 1,
      text: inputText,
      isUser: true,
      timestamp: new Date()
    }

    setMessages(prev => [...prev, userMessage])
    setInputText('')
    setIsTyping(true)

    // Simulate AI response delay
    setTimeout(() => {
      const botResponse: Message = {
        id: messages.length + 2,
        text: getResponse(inputText),
        isUser: false,
        timestamp: new Date()
      }
      setMessages(prev => [...prev, botResponse])
      setIsTyping(false)
    }, 1000)
  }

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault()
      handleSendMessage()
    }
  }

  return (
    <>
      {/* Chat Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full shadow-lg transition-all duration-300 z-50 ${
          isOpen ? 'bg-red-500 hover:bg-red-600' : 'bg-blue-600 hover:bg-blue-700'
        } text-white flex items-center justify-center`}
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Chat Window */}
      {isOpen && (
        <div className="fixed bottom-24 right-6 w-80 h-96 bg-white rounded-lg shadow-xl border border-gray-200 flex flex-col z-40">
          {/* Header */}
          <div className="bg-blue-600 text-white p-4 rounded-t-lg">
            <div className="flex items-center">
              <div className="w-8 h-8 bg-blue-500 rounded-full flex items-center justify-center mr-3">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <div>
                <h3 className="font-semibold">Team Portal Assistant</h3>
                <p className="text-xs text-blue-100">Ask me about our services & projects</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3">
            {messages.map((message) => (
              <div
                key={message.id}
                className={`flex ${message.isUser ? 'justify-end' : 'justify-start'}`}
              >
                <div
                  className={`max-w-xs px-3 py-2 rounded-lg text-sm ${
                    message.isUser
                      ? 'bg-blue-600 text-white'
                      : 'bg-gray-100 text-gray-800'
                  }`}
                >
                  {message.text}
                </div>
              </div>
            ))}
            
            {isTyping && (
              <div className="flex justify-start">
                <div className="bg-gray-100 text-gray-800 px-3 py-2 rounded-lg text-sm">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce"></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.1s' }}></div>
                    <div className="w-2 h-2 bg-gray-400 rounded-full animate-bounce" style={{ animationDelay: '0.2s' }}></div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* Input */}
          <div className="p-4 border-t border-gray-200">
            <div className="flex space-x-2">
              <input
                type="text"
                value={inputText}
                onChange={(e) => setInputText(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder="Ask me anything..."
                className="flex-1 px-3 py-2 border border-gray-300 rounded-md text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <button
                onClick={handleSendMessage}
                disabled={!inputText.trim() || isTyping}
                className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-300 text-white px-3 py-2 rounded-md transition-colors"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                </svg>
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  )
}
