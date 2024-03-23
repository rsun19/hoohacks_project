import React from 'react'
import './quizzes.css'

const quizzes = [
  { id: 1, title: 'Quiz 1' },
  { id: 2, title: 'Quiz 2' },
  { id: 3, title: 'Quiz 3' }
  // Add more quizzes as needed
]

const QuizzesPage = () => {
  return (
    <div className="quizzes-container">
      <h1>Quizzes</h1>
      <div className="quizzes-list">
        {quizzes.map((quiz) => (
          <div key={quiz.id} className="quiz-item">
            <a href={`/quizzes/kahoot`}>{quiz.title}</a>
          </div>
        ))}
      </div>
    </div>
  )
}

export default QuizzesPage
