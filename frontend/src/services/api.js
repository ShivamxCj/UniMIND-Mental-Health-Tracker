import axios from 'axios'

const API_BASE_URL = 'http://localhost:8000'

const api = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Test related APIs
export const getPHQ9Questions = () => api.get('/tests/phq9-questions')
export const getGAD7Questions = () => api.get('/tests/gad7-questions')
export const submitTest = (testData) => api.post('/tests/submit', testData)
export const getTestResults = () => api.get('/tests/results')

// Appointment related APIs
export const bookAppointment = (appointmentData) => 
  api.post('/appointments/book', appointmentData)
export const getAppointments = () => api.get('/appointments/')

// Resources related APIs
export const getWellnessResources = () => api.get('/resources/')

export default api