
import Loading from 'react-simple-loading';
import { riEditBoxLine, riDeleteBinLine } from '../icons/icons'
import { handleQuizEdit, handleQuizDelete } from '../hooks/quizCRUD'
import { biCircle, biPlus } from '../icons/icons'

const QuizResultWindow = ({correctAnswers, points, quizzes}) => {
  return (
    <div className="allQuizzes">
      <h3>You aced {points} out of {quizzes.length}.</h3>
      {quizzes.length === 0 ? <Loading color={"#005bbb"} /> : ""}
      {quizzes.map((quiz, quizIndex) => (
        <div className="eachQuizContainer" key={quiz.id}>
          <div className="quizQuestionContainer">
            <span className="quizIndex">{quizIndex+1}.</span>
            <p className="quizQuestion">{quiz.question}</p>
          </div>
          <div className="icons">
            {correctAnswers.includes(quizIndex+1) ? (
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