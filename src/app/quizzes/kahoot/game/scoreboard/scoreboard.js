'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation'
import './scoreboard.css'

// eslint-disable-next-line react/prop-types
const Scoreboard = ({ playerScores }) => {
  const searchParams = useSearchParams('next')
  const currentQuestionIndex = parseInt(searchParams.get('next') || '0', 10)
  const userString = searchParams.get('user')
  const scoreString = searchParams.get('score')
  const userList = userString.split(',')
  const scoreList = scoreString.split(',')
  const handleNextQuestion = () => {
    window.location.href = `/quizzes/kahoot/game?next=${currentQuestionIndex}`
  }

  return (
    <div className="scoreboard-container"> {/* Ensure this matches your CSS class */}
      <h2 className="title">Scoreboard</h2> {/* Title class for styling */}
      <ul className="list">
        {playerScores && Object.entries(playerScores).map(([playerName, score], index) => (
          <li key={index} className="item"> {/* Item class for each score entry */}
            <span className="playerName">{playerName}</span> {/* Player name styling */}
            <span className="score">{score}</span> {/* Score styling */}
          </li>
        ))}
      </ul>
      <div>
        {userList[0]}: {scoreList[0]}
      </div>
      <div>
        {userList[1]}: {scoreList[1]}
      </div>
      <div className="next-question-button">
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
    </div>
  )
}

export default Scoreboard
