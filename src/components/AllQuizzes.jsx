// ========== Import from third parties ==========
import { useState, useEffect } from 'react'
import { collection, onSnapshot } from 'firebase/firestore';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';

// ========== Import from inside this project ==========
import db from '../config/firebase';
import { riEditBoxLine, riDeleteBinLine } from '../icons/icons'
import { handleQuizEdit, handleQuizDelete } from '../hooks/quizCRUD'

// ========== Main ==========
const AllQuizzes = () => {
  const [quizzes, setQuizzes] = useState([]);

  // useEffect(() => {
  //   GetAllQuizzes(quiqzzes={quizzes}, setQuizzes={setQuizzes});
  // })

  useEffect(() => {
    const collectionRef = collection(db, 'quizzes');
    const unsub = onSnapshot(collectionRef, {
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
    <div className="allQuizzes">
      {quizzes.length === 0 ? <Loading color={"#005bbb"} /> : ""}
      {quizzes.map((quiz, quizIndex) => (
        <div className="eachQuizContainer" key={quiz.id}>
          <div className="quizQuestionContainer">
            <span className="quizIndex">{quizIndex+1}.</span>
            <p className="quizQuestion">{quiz.question}</p>
          </div>
          <div className="icons">
            <Link to={{pathname: `/kinniku-quiz/edit/${quiz.id}`}}><i className="riEditBoxLine">{riEditBoxLine}</i></Link>
            <i className="riDeleteBinLine" onClick={() => handleQuizDelete(quiz.id)}>{riDeleteBinLine}</i>
          </div>
        </div>
      ))}
    </div>
  )
};

export default AllQuizzes;
