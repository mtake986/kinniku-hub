
import { Link } from 'react-router-dom'
import { bsArrowRight } from '../../../icons/icons.jsx';

const GoResultWindowBtn = ({ goNextQuiz, text, clickedAnswerIndex, usersCorrectAnswers, points, answeredQuizzes, stopBtn, quizzes}) => {
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
        quizzes: quizzes,
      }}
    >
    <button 
      onClick={goNextQuiz} 
      className={
        stopBtn || clickedAnswerIndex ? 'goNextPrevQuizBtn'
        : 'goNextPrevQuizBtn disable'}
    >
      {stopBtn ? (
        <div>
          <span>{text}</span> 
        </div>
      ) : (
        <div>
          <span>{text}</span> 
          <span>{bsArrowRight}</span>
        </div>
      )}
    </button>
    </Link>
  )
}

export default GoResultWindowBtn