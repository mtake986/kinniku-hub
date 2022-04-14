import React, { useEffect, useState } from 'react'
import Loading from 'react-simple-loading';

const QuizzesList = ({quizzesList, kind}) => {
  const [MLQs, setMLQs] = useState();
  const [RMQs, setRMQs] = useState();
  useEffect(() => {
    if (kind === "MLQs") setMLQs(true);
    if (kind === "RMQs") setRMQs(true);
  }, [])

  return (
    quizzesList.length === 0 ? (
      <div className='loading'>
        <Loading color={'#005bbb'} />
      </div>
    ) : (
      quizzesList.map((quiz, quizIndex) => (
        <div className='eachQuizContainer' key={quiz.id}>
          <div className='quizQuestionContainer'>
            <span className='quizIndex'>{quizIndex + 1}.</span>
            <p className='quizQuestion'>{quiz.question}</p>
          </div>
          {MLQs && (
            <span className="likes">{quiz.likes}</span>
          )}
        </div>
      ))
    )
  )
}

export default QuizzesList