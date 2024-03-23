import React from 'react'

const Home = () => {
  return (
    <div className="relative min-h-screen bg-gradient-to-r from-green-200 via-blue-100 to-pink-200 flex justify-center items-center">
      {/* SVG Image */}
      <div className="w-full max-w-6xl px-4">
        <img src="/homepage.svg" className="h-300 w-auto mr-2" alt="Logo and Frogs" />
      </div>

      {/* Overlayed Button */}
      <div className="absolute bottom-20 md:bottom-20 lg:bottom-32 left-3/7 transform -translate-x-2/9">
        <button className="text-sm md:text-lg lg:text-xl bg-teal-500 text-white font-semibold py-2 md:py-3 lg:py-4 px-6 md:px-10 lg:px-14 rounded-full hover:bg-teal-600 transition duration-300">
          Learn now for Free
        </button>
      </div>
    </div>
  )
}

export default Home
