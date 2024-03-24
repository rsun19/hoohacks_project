'use client'
import React from 'react'
import './results.css'
import { useSearchParams } from 'next/navigation'

const Results = ({ playerScores = {} }) => {
  // Ensure playerScores is an object before calling Object.entries
  const searchParams = useSearchParams('next')
  const userString = searchParams.get('user') || ''
  const scoreString = searchParams.get('score') || ''
  const userList = userString.split(',')
  const scoreList = scoreString.split(',')
  const sortedScores = userList.map((user, index) => [user, scoreList[index]])

  const goToViewQuizzes = () => {
    window.location.href = '/quizzes'
  }

  return (
    <div className="results-container">
      <h2 className="results-title">Quiz Results</h2>
      <ul className="list">
        {sortedScores.map(([playerName, score], index) => (
          <li key={index} className="item">
            <span className="playerName">{playerName}</span>
            <span className="score">{score}</span>
          </li>
        ))}
      </ul>
      <button onClick={goToViewQuizzes} className="view-quizzes-button">
        View Quizzes
      </button>
    </div>
  )
}

export default Results
