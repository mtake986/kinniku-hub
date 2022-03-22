import { useState, useEffect } from 'react';
import { collection, onSnapshot, addDoc, setDoc, deleteDoc, doc } from 'firebase/firestore';
import db from '../config/firebase';
import { riEditBoxLine, riDeleteBinLine } from '../icons/icons'
import { handleQuizEdit, handleQuizDelete } from '../hooks/quizCRUD'
// import { GetAllQuizzes } from '../hooks/GetAllQuizzes'
import Loading from 'react-simple-loading';

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
      {quizzes.length === 0 ? <Loading /> : ""}
      {quizzes.map((quiz, quizIndex) => (
        <div className="eachQuizContainer" key={quiz.id}>
          <div className="quizQuestionContainer">
            <span className="quizIndex">{quizIndex+1}.</span>
            <p className="quizQuestion">{quiz.question}</p>
          </div>
          <div className="icons">
            <i className="riEditBoxLine" onClick={() => handleQuizEdit(quiz.id)}>{riEditBoxLine}</i>
            <i className="riDeleteBinLine" onClick={() => handleQuizDelete(quiz.id)}>{riDeleteBinLine}</i>
          </div>
        </div>
      ))}
    </div>
  )
};

export default AllQuizzes;
