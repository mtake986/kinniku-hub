
import Loading from 'react-simple-loading';
import { riEditBoxLine, riDeleteBinLine } from '../icons/icons'
import { handleQuizEdit, handleQuizDelete } from '../hooks/quizCRUD'
import { biCircle, biPlus } from '../icons/icons'

const QuizResultWindow = ({usersCorrectAnswers, points, answeredQuizzes}) => {
  return (
    <div className="quizResultWindow">
      <div className="quizResultText">
      <h3>Your score is {Math.round(points/answeredQuizzes.length*1000) / 10}%</h3>
      <p className="quizResutlText">You aced {points} out of {answeredQuizzes.length}. </p>
      </div>
      {answeredQuizzes.length === 0 && (
        <div className="loading">
          <Loading color={'#005bbb'} />
        </div>
      )}
      {answeredQuizzes.map((quiz, quizIndex) => (
        <div className="eachQuizContainer" key={quizIndex}>
          <div className="quizQuestionContainer">
            <span className="quizIndex">{quizIndex+1}.</span>
            <p className="quizQuestion">{quiz.question}</p>
          </div>
          <div className="icons">
            {usersCorrectAnswers.includes(quizIndex+1) ? (
              <i className="biCircle">{biCircle}</i>
            ) : (
              <i className="biPlus">{biPlus}</i>
            )}
          </div>
        </div>
      ))}
    </div>
  )
};

export default QuizResultWindow