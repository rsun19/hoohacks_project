import React from 'react'
import './navbar.css'

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="nav-logo-container">
      <a href="/" className="home-link">
          <img src="/logo.svg" className="nav-logo" alt="Logo" />
        </a>
      <a href="/" className="logo-text">NEXA</a>
      </div>
      <div className="nav-links-container">
        <a href="/create" className="nav-link">Create</a>
        <a href="/quizzes" className="nav-link">Quizzes</a>
        <a href="/login" className="login-button">Login</a>
      </div>
    </nav>
  )
}

export default Navbar
