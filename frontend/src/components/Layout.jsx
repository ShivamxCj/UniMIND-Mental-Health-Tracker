import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { 
  Home, 
  ClipboardList, 
  Calendar, 
  BookOpen,
  MessageCircle,
  Brain,
  Users,
  Bot // 👈 AI Assistant icon
} from 'lucide-react'
import Chatbot from './Chatbot'

const Layout = ({ children }) => {
  const [showChatbot, setShowChatbot] = useState(false)
  const location = useLocation()

  const navigation = [
    { name: 'Dashboard', href: '/dashboard', icon: Home },
    { name: 'PHQ-9 Test', href: '/test/phq9', icon: ClipboardList },
    { name: 'GAD-7 Test', href: '/test/gad7', icon: Brain },

    // 👇 NEW TAB for AI Assistant (not a real route, just triggers chatbot)
    { name: 'Your AI Assistant', href: '#ai-assistant', icon: Bot, isChatbot: true },

    { name: 'Appointments', href: '/appointments', icon: Calendar },
    { name: 'Resources', href: '/resources', icon: BookOpen },
    { name: 'Community Forum', href: '/forum', icon: Users },
  ]

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100">
      {/* Sidebar */}
      <div className="fixed left-0 top-0 h-full w-64 bg-white shadow-lg">
        <div className="p-6">
          <h1 className="text-2xl font-bold text-indigo-800">UniMIND</h1>
          <p className="text-sm text-gray-600">Student Mental Health Portal</p>
        </div>
        
        <nav className="mt-8">
          {navigation.map((item) => {
            const Icon = item.icon
            const isActive = location.pathname === item.href

            return item.isChatbot ? (
              // If it's AI Assistant → open chatbot
              <button
                key={item.name}
                onClick={() => setShowChatbot(true)}
                className="flex items-center w-full text-left px-6 py-3 text-sm font-medium text-gray-600 hover:bg-gray-50 hover:text-gray-900 transition-colors"
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </button>
            ) : (
              // Normal navigation items
              <Link
                key={item.name}
                to={item.href}
                className={`flex items-center px-6 py-3 text-sm font-medium transition-colors ${
                  isActive
                    ? 'bg-indigo-50 text-indigo-700 border-r-4 border-indigo-600'
                    : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                }`}
              >
                <Icon className="mr-3 h-5 w-5" />
                {item.name}
              </Link>
            )
          })}
        </nav>
      </div>

      {/* Main content */}
      <div className="ml-64 p-0">
        {children}
      </div>

      {/* Chatbot icon (still available as floating button) */}
      <button
        onClick={() => setShowChatbot(!showChatbot)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-indigo-600 rounded-full shadow-lg flex items-center justify-center text-white hover:bg-indigo-700 transition-colors"
      >
        <MessageCircle className="w-6 h-6" />
      </button>

      {/* Chatbot modal */}
      {showChatbot && <Chatbot onClose={() => setShowChatbot(false)} />}
    </div>
  )
}

export default Layout
