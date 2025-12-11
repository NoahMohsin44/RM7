import { HashRouter as Router, Routes, Route } from 'react-router-dom'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Projects from './pages/Projects'
import AdminUsers from './pages/AdminUsers'
import { AuthProvider } from './contexts/AuthContext'
import { ToastProvider } from './contexts/ToastContext'
import Login from './pages/Login'


import NoiseBackground from './components/NoiseBackground'

import SmoothScroll from './components/SmoothScroll'

function App() {
  return (
    <>
      <SmoothScroll />
      <AuthProvider>
        <ToastProvider>
          <Router>
            <div className="min-h-screen bg-[#121212] text-white selection:bg-zinc-600/40 relative font-sans">
              <NoiseBackground />
              <Navbar />
              <main className="pl-16 relative z-10 transition-all duration-300 ease-in-out">
                <Routes>
                  <Route path="/" element={<Home />} />
                  <Route path="/projects" element={<Projects />} />
                  <Route path="/users" element={<AdminUsers />} />
                  <Route path="/login" element={<Login />} />
                </Routes>
              </main>
            </div>
          </Router>
        </ToastProvider>
      </AuthProvider>
    </>
  )
}

export default App
