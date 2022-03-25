
import { Link, Outlet } from 'react-router-dom';

const QuizHome = () => {
  return (
    <div className="quizHome">
      {/* <nav className="quizHomeNav">
        <Link to="/kinniku-quiz/new">New</Link>{"   |   "}
        <Link to="/kinniku-quiz/quiz">Quiz</Link>{"   |   "}
        <Link to="/kinniku-quiz/all-quizzes">All Quizzes</Link>
      </nav> */}
      {/* <Link to="/kinniku-quiz/quiz">Quiz</Link> */}
      <Outlet />
    </div>

    
  )
}

export default QuizHome