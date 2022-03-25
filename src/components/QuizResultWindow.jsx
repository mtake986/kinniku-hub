
import Loading from 'react-simple-loading';
import { riEditBoxLine, riDeleteBinLine } from '../icons/icons'
import { handleQuizEdit, handleQuizDelete } from '../hooks/quizCRUD'
import { biCircle, biPlus } from '../icons/icons'

const QuizResultWindow = ({usersCorrectAnswers, points, quizzes}) => {
  return (
    <div className="quizResultWindow">
      {usersCorrectAnswers}
      <h3 className="quizResutlText">You aced {points} out of {quizzes.length} ({Math.round(points/quizzes.length*10000) / 100}%).</h3>
      {quizzes.length === 0 ? <Loading color={"#005bbb"} /> : ""}
      {quizzes.map((quiz, quizIndex) => (
        <div className="eachQuizContainer" key={quiz.id}>
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