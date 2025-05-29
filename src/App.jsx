import { Routes, Route, Navigate } from 'react-router-dom'
import LoginForm from './components/LoginForm'
import Home from './components/Home'
import NotFound from './components/NotFound'
import ProtectedRoute from './components/ProtectedRoute'
import JobItemDetails from './components/JobItemDetails'
import Jobs from './components/Jobs'


const App = () => (
  <Routes>
    <Route path="/login" element={<LoginForm />} />
    <Route path="/" element={<ProtectedRoute><Home /></ProtectedRoute>} />
    <Route path="/jobs" element={<ProtectedRoute><Jobs /></ProtectedRoute>} />
    <Route path="/jobs/:id" element={<ProtectedRoute><JobItemDetails /></ProtectedRoute>} />
    <Route path="/not-found" element={<NotFound />} />
    <Route path="*" element={<Navigate to="/not-found" replace />} />
  </Routes>
)

export default App
