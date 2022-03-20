import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const QuizHome = () => {
  return (
    <div className="quizHome">
      <nav className="quizHomeNav">
        <Link to="/quiz-home/new">New</Link>{"   |   "}
        <Link to="/quiz-home/quiz">Quiz</Link>
      </nav>
      <Outlet />
    </div>

    
  )
}

export default QuizHome