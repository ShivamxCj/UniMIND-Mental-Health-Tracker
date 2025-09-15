import { Link } from 'react-router-dom'
import { ClipboardList, Calendar, BookOpen, Brain } from 'lucide-react'

const Dashboard = () => {
  const features = [
    // In Dashboard.jsx, change the test links:
{
  title: 'Mental Health Tests',
  description: 'Take PHQ-9 and GAD-7 assessments to understand your mental health status',
  icon: ClipboardList,
  link: '/tests', // Changed from '/test/phq9'
  color: 'bg-blue-500'
},
    {
      title: 'Book Appointment',
      description: 'Schedule a session with a certified counselor',
      icon: Calendar,
      link: '/appointments',
      color: 'bg-green-500'
    },
    {
      title: 'Wellness Resources',
      description: 'Access helpful materials and coping strategies',
      icon: BookOpen,
      link: '/resources',
      color: 'bg-orange-500'
    }
  ]

  return (
    <div>
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900">Welcome to UniMIND</h1>
        <p className="text-gray-600 mt-2">Your mental health and wellness companion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {features.map((feature, index) => {
          const Icon = feature.icon
          return (
            <Link
              key={index}
              to={feature.link}
              className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow"
            >
              <div className={`w-12 h-12 ${feature.color} rounded-lg flex items-center justify-center mb-4`}>
                <Icon className="w-6 h-6 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">
                {feature.description}
              </p>
            </Link>
          )
        })}
      </div>

      <div className="mt-8 bg-white rounded-lg shadow-md p-6">
        <h2 className="text-xl font-semibold text-gray-900 mb-4">About Mental Health Assessments</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <div>
            <h3 className="font-medium text-blue-600 mb-2">PHQ-9 (Patient Health Questionnaire)</h3>
            <p className="text-gray-600 text-sm">
              The PHQ-9 is a 9-item questionnaire used to screen for depression severity. 
              It assesses how often over the last 2 weeks you've been bothered by various problems.
            </p>
          </div>
          <div>
            <h3 className="font-medium text-purple-600 mb-2">GAD-7 (Generalized Anxiety Disorder)</h3>
            <p className="text-gray-600 text-sm">
              The GAD-7 is a 7-item questionnaire that measures anxiety severity. 
              It evaluates how often you've experienced anxiety-related symptoms over the last 2 weeks.
            </p>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Dashboard