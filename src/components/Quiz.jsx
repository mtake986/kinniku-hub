import { useEffect, useState } from 'react';
import { doc, collection, onSnapshot } from 'firebase/firestore';

import db from '../firebaseConfig';
import GoodBad from './GoodBad'

const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [disableClick, setDisableClick] = useState('ableClick');
  const [clickedAnswers, setClickedAnswers] = useState(new Map());
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

  const handleJudge = (a, quiz, answerIndex, quizIndex) => {
    const correctAnswer = quiz.answers[quiz.correctAnswer];
    console.log(`a => ${a}, correctAnswer => ${correctAnswer}, answerIndex => ${answerIndex}, quizIndex => ${quizIndex}`);


    setClickedAnswers({quizIndex: "vjkjh"});
    if (clickedAnswers) {
      console.log('fhviefwfojvsknfejvbkafweoijsvdn k')
    }
    console.log(`clickedAnswers => ${clickedAnswers}`)

    // if (clickedAnswers.size === 0) {
    //   clickedAnswers.set(quizIndex, [a]);
    // } else {
    //   clickedAnswers.set(quizIndex, [clickedAnswers.get(quizIndex)]);
    // }
    // console.log(clickedAnswers, clickedAnswers.get(quizIndex)); 

    if (correctAnswer === a) {
      alert('Awesome!! The correct answer is ' + a);
      const eachQuizClickedAnswers = new Map();
      eachQuizClickedAnswers.set(quizIndex, [a])
      console.log(`each => ${eachQuizClickedAnswers.get(quizIndex)}`)
      setDisableClick('disableClick');
    } else {
      // setClickedAnswers([...clickedAnswers, answerIndex])
      setDisableClick('disableClick');
    }
  };

  return (
    <div className='quizContainer'>
      {quizzes.map((quiz, quizIndex) => (
        <div key={quiz.id} className='quiz'>
          <div className='quizQContainer'>
            <p className='quizQText'>{quiz.question}</p>
          </div>
          <ul className='answersContainer'>
            {quiz.answers.map((a, answerIndex) => (
              <li
                key={a}
                onClick={() => {
                  handleJudge(a, quiz, answerIndex, quizIndex);
                }}
                // className={clickedAnswers.get(answerIndex) ? disableClick : ""}
              >
                <a disabled={true} href='#'>
                  {a}
                </a>
              </li>
            ))}
          </ul>
          <GoodBad quiz={quiz} />
        </div>
      ))}
    </div>
  );
};

export default Quiz;
