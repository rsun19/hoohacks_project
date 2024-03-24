// Home.js
import React from 'react'
import Link from 'next/link'
import './home.css'

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-animation flex justify-center items-center">
      {/* SVG Image */}
      <div className="w-full max-w-6xl px-4">
        <img src="/homepage.svg" className="h-300 w-auto mr-2" alt="Logo and Frogs" />
      </div>

      {/* Overlayed Button */}
      <div className="button-container">
      <Link href="/quizzes">
      <button className="cute-button">
            Let&apos;s Go!
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
