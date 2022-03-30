
import { Link, Outlet } from 'react-router-dom';

const QuizHeader = () => {
  return (
    <div id="quizHeader">
      <nav className="nav">
        <div className="left">
          <Link to="/kinniku-quiz/test">Test</Link>
          <Link to="/kinniku-quiz/all-quizzes">All</Link>
        </div>
        <div className="right">
          <Link to="/kinniku-quiz/new">New</Link>
        </div>
      </nav>
      <Outlet />
    </div>

    
  )
}

export default QuizHeader;