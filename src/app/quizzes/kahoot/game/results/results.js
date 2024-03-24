'use client'
import React from 'react'
import './results.css'

const Results = ({ playerScores = {} }) => {
  // Ensure playerScores is an object before calling Object.entries
  const sortedScores = Object.entries(playerScores || {})
    .sort((a, b) => b[1] - a[1])
    .slice(0, 3)

  const goToViewQuizzes = () => {
    window.location.href = '/quizzes'
  }

  return (
    <div className="results-container">
      <h2>Quiz Results</h2>
      <ol>
        {sortedScores.map(([playerName, score], index) => (
          <li key={index}>
            {playerName}: {score}
          </li>
        ))}
      </ol>
      <button onClick={goToViewQuizzes} className="view-quizzes-button">
        View Quizzes
      </button>
    </div>
  )
}

export default Results
