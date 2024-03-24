'use client'
import React, { useState, useEffect } from 'react'
import { useSearchParams, redirect } from 'next/navigation'
import './game.css'
import io from 'socket.io-client'

const questions = [
  {
    questionText: 'What is the capital of France?',
    answerOptions: [
      { answerText: 'New York', isCorrect: false },
      { answerText: 'London', isCorrect: false },
      { answerText: 'Paris', isCorrect: true },
      { answerText: 'Dublin', isCorrect: false }
    ]
  },
  {
    questionText: 'What is a group of crows called?',
    answerOptions: [
      { answerText: 'Crows', isCorrect: false },
      { answerText: 'A Murder', isCorrect: true },
      { answerText: 'Creese', isCorrect: false },
      { answerText: 'Crowes', isCorrect: false }
    ]
  }
]

const maxPoints = 1000
const questionTimer = 10

const socket = io('http://localhost:3030')

const Game = () => {
  const searchParams = useSearchParams()
  const initialQuestionIndex = parseInt(searchParams.get('next') || '0', 10)
  const [currentQuestion, setCurrentQuestion] = useState(initialQuestionIndex)
  const [timer, setTimer] = useState(questionTimer)
  const [playerScores, setPlayerScores] = useState({})
  const [showScore, setShowScore] = useState(false)

  // incomplete websockets for now
  const startTime = Date.now()
  useEffect(() => {
    if (timer === 0) {
      redirect(`/kahoot/game/scoreboard?next=${currentQuestion + 1}`)
    } else {
      const countdown = setInterval(() => {
        setTimer((prevTimer) => prevTimer - 1)
      }, 1000)

      return () => clearInterval(countdown)
    }
  }, [timer])

  const calculatePoints = (timeTaken) => {
    if (timeTaken < 0.5) {
      return maxPoints
    }
    const timeFraction = timeTaken / questionTimer
    const scoreFraction = 1 - (timeFraction / 2)
    const points = Math.floor(scoreFraction * maxPoints)
    return points
  }

  const handleAnswerButtonClick = (isCorrect) => {
    const endTime = Date.now()
    const timeTaken = (endTime - startTime) / 1000
    const points = calculatePoints(timeTaken)

    if (isCorrect) {
      setPlayerScores((prevScores) => ({
        ...prevScores,
        playerName: (prevScores.playerName || 0) + points
      }))

      console.log(JSON.stringify([currentQuestion.toString(), 1, 'user 1']).toString())
      socket.on('connect', function () {
        const data = [currentQuestion.toString(), 1, 'user 1']
        socket.emit('curAnswer', JSON.stringify(data).toString())
        console.log(currentQuestion)
      })
      redirect('/kahoot/game/scoreboard')
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      socket.on('connect', function () {
        const data = [currentQuestion.toString(), 0, 'user 1']
        socket.emit('curAnswer', JSON.stringify(data).toString())
        console.log(currentQuestion)
      })
      redirect('/kahoot/game/scoreboard')
      setShowScore(true)
    }
  }

  return (
    <div className='game-container'>
      {showScore ? (
        <div className='score-section'>
         <h2>Redirecting to Scoreboard...</h2>
      </div>
      ) : (
        <>
          <div className='question-section'>
            <div className='question-count'>
              <span>Question {currentQuestion + 1}</span>/{questions.length}
            </div>
            <div className='question-text'>{questions[currentQuestion].questionText}</div>
            <div className='timer'>{timer}</div> {/* Display timer */}
          </div>
          <div className='answer-section'>
            {questions[currentQuestion].answerOptions.map((answerOption, index) => (
              <button key={index} onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>
                {answerOption.answerText}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default Game
