import { Link } from 'react-router-dom'
import { ClipboardList, Brain } from 'lucide-react'

const TestSelection = () => {
  const tests = [
    {
      title: 'PHQ-9 Depression Test',
      description: 'Assess symptoms of depression with the 9-item Patient Health Questionnaire',
      icon: ClipboardList,
      link: '/test/phq9',
      color: 'bg-blue-500',
      details: 'Measures: Interest, mood, sleep, energy, appetite, self-image, concentration, activity levels, and suicidal thoughts'
    },
    {
      title: 'GAD-7 Anxiety Test',
      description: 'Evaluate anxiety symptoms with the 7-item Generalized Anxiety Disorder assessment',
      icon: Brain,
      link: '/test/gad7',
      color: 'bg-purple-500',
      details: 'Measures: Nervousness, worry, tension, relaxation difficulty, restlessness, irritability, and fear'
    }
  ]

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-8 text-center">
        <h1 className="text-3xl font-bold text-gray-900">Mental Health Assessments</h1>
        <p className="text-gray-600 mt-2">Choose a test to better understand your mental health</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {tests.map((test, index) => {
          const Icon = test.icon
          return (
            <div key={index} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
              <div className={`w-16 h-16 ${test.color} rounded-lg flex items-center justify-center mb-4 mx-auto`}>
                <Icon className="w-8 h-8 text-white" />
              </div>
              
              <h3 className="text-xl font-semibold text-gray-900 mb-2 text-center">
                {test.title}
              </h3>
              
              <p className="text-gray-600 mb-4 text-center">
                {test.description}
              </p>
              
              <p className="text-sm text-gray-500 mb-6 text-center">
                {test.details}
              </p>
              
              <Link
                to={test.link}
                className="block w-full bg-indigo-600 text-white text-center py-3 rounded-md hover:bg-indigo-700 transition-colors"
              >
                Start Assessment
              </Link>
            </div>
          )
        })}
      </div>

      <div className="mt-8 bg-blue-50 rounded-lg p-6">
        <h3 className="font-semibold text-blue-800 mb-2">Important Note</h3>
        <p className="text-blue-700 text-sm">
          These assessments are screening tools, not diagnostic instruments. They help identify 
          potential symptoms but should not replace professional medical advice. If you're experiencing 
          significant distress, please consult with a healthcare provider.
        </p>
      </div>
    </div>
  )
}

export default TestSelection