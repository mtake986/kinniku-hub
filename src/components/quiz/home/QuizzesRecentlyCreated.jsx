import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
} from 'firebase/firestore';
import Loading from 'react-simple-loading';

import { db } from '../../../config/firebase';

const QuizzesRecentlyCreated = () => {
  // const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [quizzes, setQuizzes] = useState([]);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);

  useEffect(() => {
    // todo: Get new quizzes
    const getNewQuizzes = async () => {
      setIsLoadingQuizzes(true);
      const collectionRef = collection(db, 'quizzes');
      // don't order by likes because onSnapshot listens real time updates so it's gonna make a bug. Order it by something never changes such as id and createAt.
      const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(10));
      const snapshot = await getDocs(q);
      setQuizzes(snapshot.docs.map(doc => doc.data()));
      setIsLoadingQuizzes(false);
    };
    getNewQuizzes();
  
  }, []);
  return (
    <div className='quizRecentlyCreatedContainer'>
      <div className='sectionHeader'>
        <h3>Quizzes Recently Created</h3>
      </div>
      <div className='quizzes'>
        {isLoadingQuizzes ? (
          <div className='loading'>
            <Loading color={'#005bbb'} />
          </div>
        ) : quizzes.length === 0 ? (
          <p>No quizzes</p>
        ) : (
          quizzes.map((quiz, index) => (
            <div className='eachQuizContainer' key={index}>
              <div className='quizQuestionContainer'>
                <span className='quizIndex'>{index + 1}.</span>
                <p className='quizQuestion'>{quiz.question}</p>
              </div>
              {quiz.user.uid ? (
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
    </div>
  )
}

export default QuizzesRecentlyCreated