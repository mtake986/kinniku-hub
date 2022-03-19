import { useEffect, useState } from 'react';
import { doc, collection, onSnapshot } from 'firebase/firestore';

import db from '../firebaseConfig';
import GoodBad from './GoodBad'
import GoNextQuizBtn from './GoNextQuizBtn'

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [disableClick, setDisableClick] = useState('ableClick');
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [currentQ, setCurrentQ] = useState()

  /*
  Ideally
  {
    quizIndex: [
      "answer1", "answer2"
    ], 
    quizIndex : [
      "buiohlnk"
    ]
  }
  */
  
  useEffect(() => {
    const collectionRef = collection(db, 'quizzes');

    const unsub = onSnapshot(
      collectionRef,
      {
        next: (snapshot) => {
          setQuizzes(
            snapshot.docs.map(
              doc => ({ ...doc.data(), id: doc.id })
            )
          );
        },
        error: (err) => {
          // don't forget error handling! e.g. update component with an error message
          console.error("quizes listener failed: ", err);
        }
      }
    );
    return unsub;
    // const unsub = onSnapshot(collectionRef, snapshot => {
    //   setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    // });
    // return unsub;
    // getData(): run once
    // onSnapshot(): listen for realtime updates
  }, []);

  const handleJudge = (e, a, quiz, answerIndex, quizIndex) => {
    const correctAnswer = quiz.answers[quiz.correctAnswer];
    console.log(`a => ${a}, correctAnswer => ${correctAnswer}, answerIndex => ${answerIndex}, quizIndex => ${quizIndex}`);

    
    setClickedAnswers([quizIndex, [a]]);
    console.log(`clickedAnswers => ${clickedAnswers}`)

    e.target.className = "disableClick"
  };

  const goNextQuiz = () => {
    console.log(currentQIndex, quizzes.length);
    if (currentQIndex !== quizzes.length) {
      setCurrentQIndex(prevState => prevState + 1);
    }
  }


  // console.log(`oneQ = ${oneQ}`)

  return (
    <div className='quizContainer'>
      {quizzes.map((quiz, quizIndex) => {
        if (quizIndex === currentQIndex) {
          return (
            <div key={quiz.id} className='quiz'>
              <div className='quizQContainer'>
                <p className='quizQText'>{quiz.question}</p>
              </div>
              <ul className='answersContainer'>
                {quiz.answers.map((a, answerIndex) => (
                  <li
                    key={a}
                    onClick={(e) => {
                      handleJudge(e, a, quiz, answerIndex, quizIndex);
                    }}
                    className={true ? disableClick : ""}
                  >
                    <a disabled={true} href='#'>
                      {a}
                    </a>
                  </li>
                ))}
              </ul>
              <div className="quizFooter">
                <GoodBad quiz={quiz} />
                <GoNextQuizBtn goNextQuiz={goNextQuiz}/>
              </div>
            </div>
          )
        }
      })}
      {(currentQIndex >= quizzes.length) && (
        <h1>Finish</h1>
      )}

    </div>
  );
};

export default Quiz;
