import { useNavigate } from 'react-router-dom'
import { BarChart3, Users, ClipboardList, Settings } from 'lucide-react'

const AdminDashboard = () => {
  const navigate = useNavigate()

  const handleBackToLogin = () => {
    navigate('/')
  }

  const adminFeatures = [
    {
      title: 'Analytics & Reports',
      description: 'View student mental health trends and insights',
      icon: BarChart3,
      color: 'bg-blue-500',
      link: '/admin/reports'   // 👈 Added link
    },
    {
      title: 'Student Management',
      description: 'Manage student accounts and view test results',
      icon: Users,
      color: 'bg-green-500'
    },
    {
      title: 'Appointment Scheduling',
      description: 'Manage counselor appointments and availability',
      icon: ClipboardList,
      color: 'bg-purple-500'
    },
    {
      title: 'System Settings',
      description: 'Configure application settings and preferences',
      icon: Settings,
      color: 'bg-gray-500'
    }
  ]

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-white shadow-sm">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4 flex justify-between items-center">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-indigo-600 rounded-lg flex items-center justify-center mr-3">
              <BarChart3 className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Dashboard</h1>
          </div>
          <button
            onClick={handleBackToLogin}
            className="text-gray-600 hover:text-gray-900"
          >
            Back to Login
          </button>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8">
          <h2 className="text-xl font-semibold text-gray-900">Welcome, Administrator</h2>
          <p className="text-gray-600 mt-2">Manage the UniMIND mental health platform</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {adminFeatures.map((feature, index) => {
            const Icon = feature.icon
            return (
              <div
                key={index}
                onClick={() => feature.link && navigate(feature.link)} // 👈 Navigate if link exists
                className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow cursor-pointer"
              >
                <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                  <Icon className="w-6 h-6 text-white" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600">
                  {feature.description}
                </p>
              </div>
            )
          })}
        </div>

        <div className="mt-8 bg-blue-50 rounded-lg p-6">
          <h3 className="font-semibold text-blue-800 mb-2">Admin Panel Notice</h3>
          <p className="text-blue-700">
            This is a placeholder admin dashboard. The actual admin functionality will be implemented in the next phase of development.
          </p>
        </div>
      </div>
    </div>
  )
}

export default AdminDashboard
