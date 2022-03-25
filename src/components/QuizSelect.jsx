
import { Link, Outlet } from 'react-router-dom';


const QuizSelect = () => {
  return (
    <div id="quizSelect">
      <div>Select a type of quiz</div>
      <h4><Link to="/kinniku-quiz/quiz">Quiz</Link></h4>
      <h4><Link to="/kinniku-quiz/all-quizzes">All Quizzes</Link></h4>
    </div>

  )
}

export default QuizSelect