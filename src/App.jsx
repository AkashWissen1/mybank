import React, { useState } from 'react'
import './index.css'
import './App.css'

import Header from './components/Header'
import LeftSidebar from './components/LeftSidebar'
import Footer from './components/Footer'
import Home from './components/Home'
import AboutUs from './components/AboutUs'
import Services from './components/Services'
import ContactUs from './components/ContactUs'
import Login from './components/Login'
import Register from './components/Register'
import Dashboard from './components/Dashboard'
import Welcome from './components/Welcome'

function App() {
  const [currentUser, setCurrentUser] = useState(null)
  const [page, setPage] = useState('home')

  // Logout: clear user, go home
  const handleLogout = () => {
    setCurrentUser(null)
    setPage('home')
  }

  // If we try to go to "dashboard" without being logged in, go to login
  if (page === 'dashboard' && !currentUser) {
    setPage('login')
  }

  let content
  switch (page) {
    case 'home':
      content = <Home />
      break
    case 'about':
      content = <AboutUs />
      break
    case 'services':
      content = <Services />
      break
    case 'contact':
      content = <ContactUs />
      break
    case 'login':
      content = (
        <Login
          onLogin={(user) => {
            setCurrentUser(user)
            // Show Welcome + Dashboard
            setPage('dashboard')
          }}
          onRegisterLink={() => setPage('register')}
        />
      )
      break
    case 'register':
      content = (
        <Register
          onRegister={(user) => {
            setCurrentUser(user)
            // Show Welcome + Dashboard
            setPage('dashboard')
          }}
        />
      )
      break
    case 'dashboard':
      // Show both Welcome and Dashboard on the same page
      if (currentUser) {
        content = (
          <>
            <Welcome user={currentUser} />
            <Dashboard user={currentUser} />
          </>
        )
      }
      break
    default:
      content = <Home />
      break
  }

  return (
    <div className="app-container">
      <Header />
      <div className="body-container">
        <LeftSidebar
          currentUser={currentUser}
          page={page}
          onNavigate={setPage}
          onLogout={handleLogout}
        />
        <div className="center-content">
          {content}
        </div>
      </div>
      <Footer />
    </div>
  )
}

export default App
