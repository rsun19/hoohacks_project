'use client'
import React, { useEffect, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import './scoreboard.css'
import { socket } from '../../../../socket.js'
import startFutureRound from './startNextRound'

// eslint-disable-next-line react/prop-types
const Scoreboard = ({ playerScores }) => {
  const searchParams = useSearchParams('next')
  const currentQuestionIndex = parseInt(searchParams.get('next') || '0', 10)
  const userString = searchParams.get('user')
  const scoreString = searchParams.get('score')
  const userList = userString.split(',')
  const scoreList = scoreString.split(',')
  const [scoreMap, setScoreMap] = useState(new Map())
  const handleNextQuestion = () => {
    socket.emit('startNextRound', currentQuestionIndex.toString())
    console.log(currentQuestionIndex.toString)
    // window.location.href = `/quizzes/kahoot/game?next=${currentQuestionIndex}`
  }

  useEffect(() => {
    // get questions FIRST!!

    // socket.connect('http://localhost:3030')
    socket.on('connect', function () {
      socket.emit('getPlayerScores', 'hello')
      socket.on('givingPlayerScore', function (data) {
        console.log('data')
        console.log(JSON.parse(data))
        if (scoreMap) {
          setScoreMap(JSON.parse(data))
        }
      })
      socket.on('startNextRoundNow', function (data) {
        console.log(data)
        startFutureRound(Number(data))
      })
    })
    socket.emit('getPlayerScores', 'hello')
    socket.on('givingPlayerScore', function (data) {
      console.log(data)
      if (scoreMap) {
        setScoreMap(JSON.parse(data))
      }
    })
    socket.on('startNextRoundNow', function (data) {
      console.log(data)
      startFutureRound(Number(data))
    })
  }, [])

  return (
    <div className="scoreboard-container"> {/* Ensure this matches your CSS class */}
      <h2 className="title">Scoreboard</h2> {/* Title class for styling */}
      {/* <ul className="list">
      {Object.entries(scoreMap).map(([playerName, score], index) => (
        <li key={index} className="item">
          <span className="playerName">{playerName}</span>
          <span className="score">{score}</span>
        </li>
      ))}
      </ul> */}
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
