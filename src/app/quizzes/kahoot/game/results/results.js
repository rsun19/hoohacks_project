'use client'
import React from 'react'
import './results.css'
import { useSearchParams } from 'next/navigation'


const Results = ({ playerScores = {} }) => {
  // Ensure playerScores is an object before calling Object.entries
  const searchParams = useSearchParams('next')
  const userString = searchParams.get('user')
  const scoreString = searchParams.get('score')
  const userList = userString.split(',')
  const scoreList = scoreString.split(',')
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
      <div>
        {userList[0]}: {scoreList[0]}
      </div>
      <div>
        {userList[1]}: {scoreList[1]}
      </div>
      <button onClick={goToViewQuizzes} className="view-quizzes-button">
        View Quizzes
      </button>
    </div>
  )
}

export default Results
