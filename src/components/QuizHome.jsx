import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';

const QuizHome = () => {
  const [quizzes, setQuizzes] = useState([]);

  // useEffect(() => {
  //   GetAllQuizzes(quiqzzes={quizzes}, setQuizzes={setQuizzes});
  // })

  useEffect(() => {
    const collectionRef = collection(db, 'quizzes');
    const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(5));
    const unsub = onSnapshot(q, {
      next: snapshot => {
        setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      },
      error: err => {
        // don't forget error handling! e.g. update component with an error message
        console.error('quizes listener failed: ', err);
      },
    });
    return unsub;
    // const unsub = onSnapshot(collectionRef, snapshot => {
    //   setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    // });
    // return unsub;
    // getData(): run once
    // onSnapshot(): listen for realtime updates
  }, []);

  return (
    <div id='quizHome'>
      <div className='quizRecentlyCreatedContainer'>
        <h3>Quizzes Recently Created</h3>
        <div className='quizzes'>
          {quizzes.length === 0 ? <Loading color={'#005bbb'} /> : ''}
          {quizzes.map((quiz, quizIndex) => (
            <div className='eachQuizContainer' key={quiz.id}>
              <div className='quizQuestionContainer'>
                <span className='quizIndex'>{quizIndex + 1}.</span>
                <p className='quizQuestion'>{quiz.question}</p>
              </div>
              <Link
                to={{ pathname: `/profile/${quiz.user.uid}` }}
                state={{ user: quiz.user }}
              >
                <img
                  src={quiz.user.photoURL}
                  alt='Profile Picture'
                  referrerPolicy='no-referrer'
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default QuizHome;
