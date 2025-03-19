import React from 'react'

function LeftSidebar({ currentUser, page, onNavigate, onLogout }) {
  return (
    <div className="left-sidebar">
      <div className="nav-items">
        <ul>
          <li onClick={() => onNavigate('home')}>Home</li>
          <li onClick={() => onNavigate('about')}>About Us</li>
          <li onClick={() => onNavigate('services')}>Services</li>
          <li onClick={() => onNavigate('contact')}>Contact Us</li>

          {!currentUser && <li onClick={() => onNavigate('login')}>Login</li>}
          {!currentUser && <li onClick={() => onNavigate('register')}>Register</li>}

          {currentUser && <li onClick={() => onNavigate('dashboard')}>Dashboard</li>}
          {currentUser && <li onClick={onLogout}>Logout</li>}
        </ul>
      </div>

      <div className="footer-text">www.ourbank.com</div>
    </div>
  )
}

export default LeftSidebar
