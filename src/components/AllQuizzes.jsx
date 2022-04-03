// ========== Import from third parties ==========
import { useState, useEffect } from 'react';
import { collection, onSnapshot, query, orderBy } from 'firebase/firestore';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';

// ========== Import from inside this project ==========
import { db } from '../config/firebase';
import { riEditBoxLine, riDeleteBinLine } from '../icons/icons';
import { handleQuizDelete } from '../hooks/quizCRUD';

// ========== Main ==========
const AllQuizzes = ({ uid }) => {
  const [quizzes, setQuizzes] = useState([]);
  console.log(uid)
  // useEffect(() => {
  //   GetAllQuizzes(quiqzzes={quizzes}, setQuizzes={setQuizzes});
  // })

  useEffect(() => {
    const collectionRef = collection(db, 'quizzes');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
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
    <div className='allQuizzes'>
      {quizzes.length === 0 ? <Loading color={'#005bbb'} /> : ''}
      {quizzes.map((quiz, quizIndex) => (
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
                onClick={() => handleQuizDelete(quiz.id)}
              >
                {riDeleteBinLine}
              </i>
            </div>
          ) : (
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
          )}
        </div>
      ))}
    </div>
  );
};

export default AllQuizzes;
