
import { Link } from 'react-router-dom'
import { bsArrowRight } from '../../../icons/icons.jsx';

const GoResultWindowBtn = ({ goNextQuiz, text, clickedAnswerIndex, usersCorrectAnswers, points, answeredQuizzes}) => {
  console.log("usersCorrectAnswers: ", usersCorrectAnswers)
  console.log("points: ", points)
  console.log("answeredQuizzes: ", answeredQuizzes)
  return (
    <Link
      to={{ pathname: `/kinniku-quiz/test/result` }}
      state={{
        usersCorrectAnswers: usersCorrectAnswers,
        points: points,
        answeredQuizzes: answeredQuizzes,
      }}
    >
    <button onClick={goNextQuiz} className={clickedAnswerIndex ? 'goNextPrevQuizBtn' : 'goNextPrevQuizBtn disable'}>
      <span>{text}</span> {bsArrowRight}
    </button>
    </Link>
  )
}

export default GoResultWindowBtn