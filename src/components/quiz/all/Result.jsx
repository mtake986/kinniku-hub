import React, { useContext } from 'react'
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';
import { riEditBoxLine, riDeleteBinLine } from '../../../icons/icons';
import { FilterResultContext } from '../../../contexts/quiz/FilterResultContext';

const Result = () => {
  const { quizzes, isLoading, uid, handleDelete } = useContext(FilterResultContext);

  return (
    <div className="filterResult">
      {isLoading ? (
        <div className='loading'>
          <Loading color={'#005bbb'} />
        </div>
      ) : quizzes.length === 0 ? (
        <div>no quizzes</div>
      ) : (
        quizzes.map((quiz, quizIndex) => (
          <div className='eachQuizContainer' key={quiz.id}>
            <div className='quizQuestionContainer'>
              <span className='quizIndex'>{quizIndex + 1}.</span>
              <p className='quizQuestion'>{quiz.question}</p>
            </div>
            {quiz.user.uid && uid === quiz.user.uid ? (
              <div className='icons'>
                <Link
                  to={{ pathname: `/kinniku-quiz/edit/${quiz.id}` }}
                  state={{ quiz: quiz }}
                >
                  <i className='riEditBoxLine'>{riEditBoxLine}</i>
                </Link>
                <i
                  className='riDeleteBinLine'
                  onClick={() => handleDelete(quiz.id)}
                >
                  {riDeleteBinLine}
                </i>
              </div>
            ) : quiz.user.uid && uid !== quiz.user.uid ? (
              <Link
                to={{ pathname: `/profile/${quiz.user.uid}` }}
                state={{ user: quiz.user }}
              >
                <img
                  src={quiz.user.photoURL}
                  alt={quiz.user.username}
                  referrerPolicy='no-referrer'
                />
              </Link>
            ) : null}
          </div>
        ))
      )}
    </div>
  )
}

export default Result