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
          <button className="text-sm md:text-lg lg:text-xl bg-teal-500 text-white font-semibold py-2 md:py-3 lg:py-4 px-6 md:px-10 lg:px-14 rounded-full hover:bg-teal-600 transition duration-300">
            Let&apos;s Go!
          </button>
        </Link>
      </div>
    </div>
  )
}

export default Home
