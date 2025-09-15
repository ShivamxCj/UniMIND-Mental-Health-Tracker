import { useNavigate } from 'react-router-dom'
import { User, Users, Brain, Heart } from 'lucide-react'

const Login = () => {
  const navigate = useNavigate()

  const handleStudentLogin = () => {
    navigate('/dashboard')
  }

  const handleAdminLogin = () => {
    navigate('/admin')
  }

  const handleConsultantLogin = () => {
    navigate('/consultant')
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        <div className="text-center mb-8">
          <div className="flex justify-center mb-4">
            <div className="w-16 h-16 bg-indigo-600 rounded-full flex items-center justify-center">
              <Brain className="w-8 h-8 text-white" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-gray-900">UniMIND</h1>
          <p className="text-gray-600 mt-2">Mental Health Support System</p>
        </div>

        <div className="space-y-4">
          <button
            onClick={handleStudentLogin}
            className="w-full flex items-center justify-center gap-3 bg-indigo-600 text-white py-3 px-4 rounded-lg hover:bg-indigo-700 transition-colors"
          >
            <User className="w-5 h-5" />
            Login as Student
          </button>

          <button
            onClick={handleConsultantLogin}
            className="w-full flex items-center justify-center gap-3 bg-teal-600 text-white py-3 px-4 rounded-lg hover:bg-teal-700 transition-colors"
          >
            <Heart className="w-5 h-5" />
            Login as Consultant
          </button>

          <button
            onClick={handleAdminLogin}
            className="w-full flex items-center justify-center gap-3 bg-gray-700 text-white py-3 px-4 rounded-lg hover:bg-gray-800 transition-colors"
          >
            <Users className="w-5 h-5" />
            Login as Admin
          </button>
        </div>

        <div className="mt-8 p-4 bg-blue-50 rounded-lg">
          <p className="text-sm text-blue-700 text-center">
            For demonstration purposes. No actual authentication is implemented yet.
          </p>
        </div>
      </div>
    </div>
  )
}

export default Login