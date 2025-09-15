import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import Login from './components/Login'
import Dashboard from './components/Dashboard'
import TestSelection from './components/TestSelection'
import PHQ9Test from './components/PHQ9Test'
import GAD7Test from './components/GAD7Test'
import AppointmentBooking from './components/AppointmentBooking'
import WellnessResources from './components/WellnessResources'
import Layout from './components/Layout'
import AdminDashboard from './components/AdminDashboard'
import ConsultantDashboard from './components/ConsultantDashboard'

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/dashboard" element={<Layout><Dashboard /></Layout>} />
        <Route path="/tests" element={<Layout><TestSelection /></Layout>} />
        <Route path="/test/phq9" element={<Layout><PHQ9Test /></Layout>} />
        <Route path="/test/gad7" element={<Layout><GAD7Test /></Layout>} />
        <Route path="/appointments" element={<Layout><AppointmentBooking /></Layout>} />
        <Route path="/resources" element={<Layout><WellnessResources /></Layout>} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/consultant" element={<ConsultantDashboard />} />
      </Routes>
    </Router>
  )
}

export default App