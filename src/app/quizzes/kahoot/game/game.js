'use client'

import React, { useState, useEffect } from 'react'
import { useSearchParams, redirect } from 'next/navigation'
import './game.css'
import { SessionProvider, useSession, signIn } from 'next-auth/react'

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

export default function GameHandler () {
  return (
    <SessionProvider>
      <Game />
    </SessionProvider>
  )
}

const Game = () => {
  const { data: session, status } = useSession()
  const searchParams = useSearchParams()
  const initialQuestionIndex = parseInt(searchParams.get('next') || '0', 10)
  const [currentQuestion] = useState(initialQuestionIndex)
  const [startTime, setStartTime] = useState(Date.now())
  const [timer, setTimer] = useState(questionTimer)
  const [playerScores, setPlayerScores] = useState({})

  let email = ''

  useEffect(() => {
    if (status === 'authenticated' && session) {
      email = session.user.email
    }
  }, [[status, session]])

  useEffect(() => {
    if (timer === 0) {
      const nextQuestion = currentQuestion + 1
      if (nextQuestion < questions.length) {
        if (nextQuestion === 0) {
          redirect(`/quizzes/kahoot/game/scoreboard?next=${currentQuestion + 1}&user=dcq2ds@gmail.com,mindyzheng2@gmail.com&score=120,100`)
        } else {
          redirect(`/quizzes/kahoot/game/scoreboard?next=${currentQuestion + 1}&user=dcq2ds@gmail.com,mindyzheng2@gmail.com&score=240,100`)
        }
      } else {
        redirect('/quizzes/kahoot/game/results?user=dcq2ds@gmail.com,mindyzheng2@gmail.com&score=240,100')
        setTimer(questionTimer)
        setStartTime(Date.now())
      }
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
    }

    const nextQuestion = currentQuestion + 1
    if (nextQuestion < questions.length) {
      if (currentQuestion === 0) {
        redirect('/quizzes/kahoot/game/scoreboard?user=dcq2ds@gmail.com,mindyzheng2@gmail.com&score=120,100')
      } else {
        redirect('/quizzes/kahoot/game/scoreboard?user=dcq2ds@gmail.com,mindyzheng2@gmail.com&score=240,100')
      }
    } else {
      redirect('/quizzes/results')
    }
  }

  return (
    <div className='game-container'>
      <div className='question-section'>
        <div className='question-count'>
          <span>Question {currentQuestion + 1}</span>/{questions.length}
        </div>
        {questions[currentQuestion] ? (
          <>
            <div className='question-text'>{questions[currentQuestion].questionText}</div>
            <div className='timer'>{timer}</div> {/* Display timer */}
            <div className='answer-section'>
              {questions[currentQuestion].answerOptions.map((answerOption, index) => (
                <button key={index} onClick={() => handleAnswerButtonClick(answerOption.isCorrect)}>
                  {answerOption.answerText}
                </button>
              ))}
            </div>
          </>
        ) : (
          <div>Loading question...</div>
        )}
      </div>
    </div>
  )
}

// export default GameHandler
