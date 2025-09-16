import { useState, useEffect } from 'react'
import { getWellnessResources } from '../services/api'
import { FileText, Video, Activity } from 'lucide-react'

const WellnessResources = () => {
  const [resources, setResources] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    loadResources()
  }, [])

  const loadResources = async () => {
    try {
      const response = await getWellnessResources()
      setResources(response.data)
    } catch (error) {
      console.error('Error loading resources:', error)
    } finally {
      setLoading(false)
    }
  }

  const getIcon = (type) => {
    switch (type) {
      case 'article':
        return <FileText className="w-5 h-5" />
      case 'video':
        return <Video className="w-5 h-5" />
      default:
        return <Activity className="w-5 h-5" />
    }
  }

  const getColor = (type) => {
    switch (type) {
      case 'article':
        return 'bg-blue-100 text-blue-600'
      case 'video':
        return 'bg-red-100 text-red-600'
      default:
        return 'bg-green-100 text-green-600'
    }
  }

  if (loading) {
    return (
      <div className="flex justify-center items-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-indigo-600"></div>
      </div>
    )
  }

  return (
    <div className="p-8">
      <div className="mb-8 ">
        <h1 className="text-3xl font-bold text-gray-900">Wellness Resources</h1>
        <p className="text-gray-600 mt-2">Helpful materials and strategies for mental wellbeing</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {resources.map((resource) => (
          <div key={resource.id} className="bg-white rounded-lg shadow-md p-6 hover:shadow-lg transition-shadow">
            <div className="flex items-start mb-4">
              <div className={`p-2 rounded-lg ${getColor(resource.resource_type)} mr-3`}>
                {getIcon(resource.resource_type)}
              </div>
              <div>
                <h3 className="text-xl font-semibold text-gray-900">{resource.title}</h3>
                <span className="text-sm text-gray-500 capitalize">{resource.resource_type}</span>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{resource.description}</p>
            
            <button className="text-indigo-600 hover:text-indigo-800 font-medium">
              Explore Resource →
            </button>
          </div>
        ))}
      </div>

      {resources.length === 0 && (
        <div className="text-center py-12">
          <div className="w-24 h-24 bg-gray-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <Activity className="w-12 h-12 text-gray-400" />
          </div>
          <h3 className="text-lg font-medium text-gray-900 mb-2">No resources available</h3>
          <p className="text-gray-600">Check back later for new wellness resources.</p>
        </div>
      )}
    </div>
  )
}

export default WellnessResources