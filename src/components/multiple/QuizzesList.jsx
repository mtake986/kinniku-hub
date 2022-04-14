// ========== Import from third parties ==========
import React, { useEffect, useState } from 'react';
import { doc, deleteDoc } from 'firebase/firestore';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';
import {
  riEditBoxLine,
  riDeleteBinLine,
  biCircle,
  biPlus,
} from '../../icons/icons';

// ========== Import from inside this project ==========
import { db } from '../../config/firebase';
import NoQuiz from '../NoQuiz';

const QuizzesList = ({ list, kind, uid, nowLoading, usersCorrectAnswers }) => {
  const [MLQs, setMLQs] = useState(false);
  const [RMQs, setRMQs] = useState(false);
  const [allQuizzes, setAllQuizzes] = useState(false);
  const [answeredQuizzes, setAnsweredQuizzes] = useState(false);
  const [tenRecentlyCreatedQuizzes, setTenRecentlyCreatedQuizzes] =
    useState(false);
  useEffect(() => {
    if (kind === 'MLQs') setMLQs(true);
    if (kind === 'RMQs') setRMQs(true);
    if (kind === 'allQuizzes') setAllQuizzes(true);
    if (kind === 'answeredQuizzes') setAnsweredQuizzes(true);
    if (kind === 'tenRecentlyCreatedQuizzes')
      setTenRecentlyCreatedQuizzes(true);
  }, []);

  const handleQuizDelete = async id => {
    const yesNo = prompt(
      "Type yes(y) to delete permanently. You can't undo this action."
    );
    if (yesNo === 'yes' || yesNo === 'y') {
      const quizDocRef = doc(db, 'quizzes', id);
      await deleteDoc(quizDocRef);
      console.log(quizDocRef);
    }
  };

  return (
    nowLoading ? (
      <div className='loading'>
        <Loading color={'#005bbb'} />
      </div>
    ) : (
      list.length > 0 ? (
        list.map((quiz, quizIndex) => (
          <div className='eachQuizContainer' key={quiz.id}>
            <div className='quizQuestionContainer'>
              <span className='quizIndex'>{quizIndex + 1}.</span>
              <p className='quizQuestion'>{quiz.question}</p>
            </div>
            {MLQs && <span className='likes'>{quiz.likes}</span>}
            {allQuizzes &&
              (quiz.user.uid && uid === quiz.user.uid ? (
                <div className='icons'>
                  <Link
                    to={{ pathname: `/kinniku-quiz/edit/${quiz.id}` }}
                    state={{ quiz: quiz }}
                  >
                    <i className='riEditBoxLine'>{riEditBoxLine}</i>
                  </Link>
                  <i
                    className='riDeleteBinLine'
                    onClick={() => handleQuizDelete(quiz.id)}
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
              ) : null)}
            {answeredQuizzes && (
              <div className='icons'>
                {usersCorrectAnswers.includes(quizIndex + 1) ? (
                  <i className='biCircle'>{biCircle}</i>
                ) : (
                  <i className='biPlus'>{biPlus}</i>
                )}
              </div>
            )}
            {tenRecentlyCreatedQuizzes && quiz.user.uid && (
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
            )}
          </div>
        ))
      ) : (
        <NoQuiz />
      )
    )
  )
};

export default QuizzesList;
