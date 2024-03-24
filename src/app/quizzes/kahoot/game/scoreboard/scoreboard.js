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
        {userList.map((user, index) => (
        <li key={index} className="item">
          <span className="playerName">{user}</span>
          <span className="score">{scoreList[index]}</span>
        </li>
        ))}
      </ul>
      <div className="next-question-button">
        <button onClick={handleNextQuestion}>Next Question</button>
      </div>
    </div>
  )
}

export default Scoreboard
