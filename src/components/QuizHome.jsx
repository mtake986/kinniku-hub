import React from 'react'
import { Link, Outlet } from 'react-router-dom';

const QuizHome = () => {
  return (
    <div className="quizHome">
      <nav className="quizHomeNav">
        <Link to="/kinniku-quiz/new">New</Link>{"   |   "}
        <Link to="/kinniku-quiz/quiz">Quiz</Link>{"   |   "}
        <Link to="/kinniku-quiz/all-quizzes">All Quizzes</Link>
      </nav>
      <Outlet />
    </div>

    
  )
}

export default QuizHome