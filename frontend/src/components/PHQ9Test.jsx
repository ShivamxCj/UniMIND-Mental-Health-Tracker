import { useState, useEffect } from 'react'
import { useNavigate } from 'react-router-dom'
import { getPHQ9Questions, submitTest } from '../services/api'
import { BookOpen, ExternalLink, ArrowRight, AlertTriangle, Heart } from 'lucide-react'

const PHQ9Test = () => {
  const [questions, setQuestions] = useState([])
  const [answers, setAnswers] = useState({})
  const [loading, setLoading] = useState(true)
  const [submitting, setSubmitting] = useState(false)
  const [result, setResult] = useState(null)
  const navigate = useNavigate()

  useEffect(() => {
    loadQuestions()
  }, [])

  const loadQuestions = async () => {
    try {
      const response = await getPHQ9Questions()
      setQuestions(response.data)
      // Initialize answers object
      const initialAnswers = {}
      response.data.forEach((q) => {
        initialAnswers[q.id] = 0
      })
      setAnswers(initialAnswers)
    } catch (error) {
      console.error('Error loading questions:', error)
    } finally {
      setLoading(false)
    }
  }

  const handleAnswerChange = (questionId, value) => {
    setAnswers(prev => ({
      ...prev,
      [questionId]: parseInt(value)
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    setSubmitting(true)
    
    try {
      const formattedAnswers = Object.entries(answers).map(([questionId, value]) => ({
        question_id: parseInt(questionId),
        value: value
      }))

      const submission = {
        test_type: 'PHQ-9',
        answers: formattedAnswers
      }

      const response = await submitTest(submission)
      setResult(response.data)
    } catch (error) {
      console.error('Error submitting test:', error)
      alert('Error submitting test. Please try again.')
    } finally {
      setSubmitting(false)
    }
  }

  const handleBookAppointment = () => {
    navigate('/appointments')
  }

  const getTagColor = (tag) => {
    switch (tag) {
      case 'critical': return 'bg-red-100 text-red-800'
      case 'important': return 'bg-orange-100 text-orange-800'
      case 'recommended': return 'bg-blue-100 text-blue-800'
      case 'optional': return 'bg-green-100 text-green-800'
      default: return 'bg-gray-100 text-gray-800'
    }
  }

  const getTypeIcon = (type) => {
    switch (type) {
      case 'article': return <BookOpen className="w-4 h-4" />
      case 'video': return '🎬'
      case 'action': return <ArrowRight className="w-4 h-4" />
      default: return '📄'
    }
  }

  // Sort recommendations to show "Consult Doctor" actions first
  const sortRecommendations = (recommendations) => {
    if (!recommendations) return [];
    
    return [...recommendations].sort((a, b) => {
      // Put "Consult Doctor" or similar actions first
      const isActionA = a.type === 'action' && a.title.toLowerCase().includes('consult');
      const isActionB = b.type === 'action' && b.title.toLowerCase().includes('consult');
      
      if (isActionA && !isActionB) return -1;
      if (!isActionA && isActionB) return 1;
      
      // Then sort by tag priority
      const tagPriority = { critical: 0, important: 1, recommended: 2, optional: 3 };
      return tagPriority[a.tag] - tagPriority[b.tag];
    });
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  if (result) {
    const sortedRecommendations = sortRecommendations(result.recommendations);
    const isCriticalCondition = result.score === 27; // Maximum score for PHQ-9 is 27
    
    return (
      <div className="max-w-4xl mx-auto">
        {/* Critical Condition Alert for maximum score */}
        {isCriticalCondition && (
          <div className="bg-red-50 border-l-4 border-red-500 p-4 mb-6 rounded-r-lg">
            <div className="flex items-start">
              <div className="flex-shrink-0">
                <AlertTriangle className="h-6 w-6 text-red-500" />
              </div>
              <div className="ml-3">
                <h3 className="text-red-800 font-semibold text-lg">Critical Condition Detected</h3>
                <p className="text-red-700 mt-1">
                  Your score indicates severe depression symptoms. It's important to seek professional help immediately.
                </p>
              </div>
            </div>
          </div>
        )}
        
        <div className="bg-white rounded-lg shadow-md p-6 mb-6">
          <h2 className="text-2xl font-bold text-gray-900 mb-4">Test Results</h2>
          <div className={`rounded-lg p-4 mb-4 ${
            result.severity_level === 'minimal' ? 'bg-green-50' :
            result.severity_level === 'mild' ? 'bg-blue-50' :
            result.severity_level === 'moderate' ? 'bg-orange-50' : 'bg-red-50'
          } ${isCriticalCondition ? 'border-2 border-red-500' : ''}`}>
            <p className="text-lg font-semibold">Score: {result.score}/27</p>
            <p className="text-md">Severity: {result.severity}</p>
            {isCriticalCondition && (
              <div className="flex items-center mt-2 text-red-700">
                <AlertTriangle className="w-4 h-4 mr-1" />
                <span className="text-sm font-medium">Maximum severity detected</span>
              </div>
            )}
          </div>
          
          <h3 className="text-xl font-semibold text-gray-900 mb-4">Recommended Next Steps</h3>
          
          {sortedRecommendations && sortedRecommendations.length > 0 ? (
            <div className="space-y-3">
              {sortedRecommendations.map((resource) => (
                <div 
                  key={resource.id} 
                  className={`flex items-center justify-between p-3 border rounded-lg ${
                    resource.type === 'action' && resource.title.toLowerCase().includes('consult') && isCriticalCondition
                      ? 'bg-red-50 border-red-200' 
                      : ''
                  }`}
                >
                  <div className="flex items-center">
                    <span className="mr-3">
                      {resource.type === 'action' && resource.title.toLowerCase().includes('consult') && isCriticalCondition 
                        ? <Heart className="w-5 h-5 text-red-500" />
                        : getTypeIcon(resource.type)
                      }
                    </span>
                    <div>
                      <p className={`font-medium ${
                        resource.type === 'action' && resource.title.toLowerCase().includes('consult') && isCriticalCondition
                          ? 'text-red-700'
                          : 'text-gray-900'
                      }`}>
                        {resource.title}
                      </p>
                      <span className={`text-xs px-2 py-1 rounded-full ${getTagColor(resource.tag)} ${
                        resource.type === 'action' && resource.title.toLowerCase().includes('consult') && isCriticalCondition
                          ? 'bg-red-200 text-red-800'
                          : ''
                      }`}>
                        {isCriticalCondition && resource.type === 'action' && resource.title.toLowerCase().includes('consult') 
                          ? 'URGENT' 
                          : resource.tag
                        }
                      </span>
                    </div>
                  </div>
                  
                  {resource.type === 'action' ? (
                    <button
                      onClick={handleBookAppointment}
                      className={`px-3 py-1 rounded-md text-sm ${
                        isCriticalCondition && resource.title.toLowerCase().includes('consult')
                          ? 'bg-red-600 text-white hover:bg-red-700'
                          : 'bg-indigo-600 text-white hover:bg-indigo-700'
                      }`}
                    >
                      {isCriticalCondition && resource.title.toLowerCase().includes('consult')
                        ? 'Get Help Now'
                        : 'Book Now'
                      }
                    </button>
                  ) : (
                    <a
                      href={resource.link}
                      className="text-indigo-600 hover:text-indigo-800 text-sm flex items-center"
                    >
                      View <ExternalLink className="w-3 h-3 ml-1" />
                    </a>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-gray-600">No specific recommendations at this time.</p>
          )}
        </div>

        <div className="bg-white rounded-lg shadow-md p-6">
          <h3 className="text-lg font-semibold text-gray-900 mb-3">What Your Score Means</h3>
          <div className="prose prose-sm">
            {result.severity_level === 'minimal' && (
              <p>Your score suggests minimal depression symptoms. Continuing with regular self-care practices is recommended.</p>
            )}
            {result.severity_level === 'mild' && (
              <p>Your score suggests mild depression symptoms. Consider incorporating some of the recommended resources into your routine.</p>
            )}
            {result.severity_level === 'moderate' && (
              <p>Your score suggests moderate depression symptoms. We recommend exploring the suggested resources and considering professional support.</p>
            )}
            {result.severity_level === 'severe' && (
              <div>
                <p className="font-medium text-red-700">
                  Your score suggests significant depression symptoms. We strongly recommend seeking professional support as soon as possible.
                </p>
                {isCriticalCondition && (
                  <div className="mt-3 p-3 bg-red-50 rounded-lg">
                    <p className="text-red-800 text-sm">
                      <strong>Maximum score detected:</strong> Your responses indicate you're experiencing the most severe level of depression symptoms. 
                      Please consider this an urgent situation and reach out to a mental health professional immediately.
                    </p>
                  </div>
                )}
              </div>
            )}
            <p className="text-xs text-gray-500 mt-4">
              Note: This assessment is a screening tool, not a diagnostic instrument. Always consult with a healthcare professional for proper diagnosis and treatment.
            </p>
          </div>
        </div>
      </div>
    )
  }

  return (
    <div className="max-w-2xl mx-auto">
      <div className="bg-white rounded-lg shadow-md p-6">
        <h2 className="text-2xl font-bold text-gray-900 mb-4">PHQ-9 Depression Test</h2>
        <p className="text-gray-600 mb-6">
          Over the last 2 weeks, how often have you been bothered by any of the following problems?
        </p>

        <form onSubmit={handleSubmit}>
          {questions.map((question) => (
            <div key={question.id} className="mb-6 p-4 border rounded-lg">
              <p className="font-medium text-gray-900 mb-3">
                {question.id}. {question.text}
              </p>
              <div className="space-y-2">
                {question.options.map((option) => (
                  <label key={option.value} className="flex items-center">
                    <input
                      type="radio"
                      name={`question-${question.id}`}
                      value={option.value}
                      checked={answers[question.id] === option.value}
                      onChange={(e) => handleAnswerChange(question.id, e.target.value)}
                      className="mr-2"
                      required
                    />
                    <span className="text-gray-700">{option.text}</span>
                  </label>
                ))}
              </div>
            </div>
          ))}

          <button
            type="submit"
            disabled={submitting}
            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 disabled:opacity-50"
          >
            {submitting ? 'Submitting...' : 'Submit Test'}
          </button>
        </form>
      </div>
    </div>
  )
}

export default PHQ9Test