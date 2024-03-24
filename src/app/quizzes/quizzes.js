import React from 'react'
import './quizzes.css'
import Navbar from '../navbar'

const quizzes = [
  { id: 1, title: 'Random Trivia', numQuestions: 10 },
  { id: 2, title: 'Korean VQ 1-2', numQuestions: 8 },
  { id: 3, title: 'DMT2 Quiz 4', numQuestions: 15 },
  { id: 4, title: 'CSO2 Quiz 5', numQuestions: 5 },
  { id: 5, title: 'DMT2 Quiz 3', numQuestions: 12 },
  { id: 6, title: 'DMT2 Quiz 2', numQuestions: 10 }
  // Add more quizzes as needed
]

const QuizzesPage = () => {
  return (
    <>
      <Navbar />
      <div className="quizzes-container">
        <h1 className="quizzes-title">Quizzes</h1>
        <div className="quizzes-list">
          {quizzes.map((quiz) => (
            <a key={quiz.id} className="quiz-item" href="/quizzes/kahoot">
              <span className="quiz-title">{quiz.title}</span>
              <span className="quiz-num-questions">{quiz.numQuestions} Questions</span>
            </a>
          ))}
        </div>
      </div>
    </>
  )
}

export default QuizzesPage
