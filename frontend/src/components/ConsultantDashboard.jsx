import { useNavigate } from 'react-router-dom'

const ConsultantDashboard = () => {
  const navigate = useNavigate()

  const handleBackToLogin = () => {
    navigate('/')
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-4xl mx-auto">
        <div className="bg-white rounded-lg shadow-md p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-gray-900">Consultant Dashboard</h1>
            <button
              onClick={handleBackToLogin}
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300"
            >
              Back to Login
            </button>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-blue-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-blue-800 mb-2">Appointments</h2>
              <p className="text-blue-700">View and manage your counseling schedule</p>
            </div>
            
            <div className="bg-green-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-green-800 mb-2">Students</h2>
              <p className="text-green-700">Access student profiles and test results</p>
            </div>
            
            <div className="bg-purple-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-purple-800 mb-2">Messages</h2>
              <p className="text-purple-700">Communicate with students securely</p>
            </div>
            
            <div className="bg-orange-50 p-4 rounded-lg">
              <h2 className="text-lg font-semibold text-orange-800 mb-2">Resources</h2>
              <p className="text-orange-700">Access counseling materials and guides</p>
            </div>
          </div>
          
          <div className="mt-6 p-4 bg-gray-100 rounded-lg">
            <p className="text-gray-600">
              This is the consultant dashboard. More features will be added soon.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ConsultantDashboard