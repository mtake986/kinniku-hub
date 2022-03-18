import { useEffect, useState } from 'react';
import { doc, collection, onSnapshot } from 'firebase/firestore';

import db from '../firebaseConfig';

const Quiz = () => {
  const [disableClick, setDisableClick] = useState('ableClick');
  const [clickedAnswers, setClickedAnswers] = useState([]);
  const [quizzes, setQuizzes] = useState([]);

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

  console.log(quizzes);
  const handleJudge = (a, quiz, index) => {
    const correctAns = quiz.answers[quiz.correctAns];
    // console.log(a, correctAns, index);
    if (correctAns === a) {
      alert('Awesome!! The correct answer is ' + a);
    } else {
      console.log(clickedAnswers)
      setClickedAnswers([...clickedAnswers, index])
      setDisableClick('disableClick');
      alert(disableClick);
    }
    console.log(`after clickedAnswers ${clickedAnswers}`)
  };

  return (
    <div className='quizContainer'>
      {quizzes.map(quiz => (
        <div key={quiz.id} className='quiz'>
          <div className='quizQContainer'>
            <p className='quizQText'>{quiz.question}</p>
          </div>
          <ul className='answersContainer'>
            {quiz.answers.map((a, index) => (
              <li
                key={a}
                onClick={() => {
                  handleJudge(a, quiz, index);
                }}
                className={clickedAnswers.includes(index) && disableClick}
              >
                <a disabled={true} href='#'>
                  {a}
                </a>
              </li>
            ))}
          </ul>
          <div className='quizFooter'>
            <div className='likesDislikesContainer'>
              <span>good</span>
              <span>bad</span>
            </div>
            <span className='createdAt'>{quiz.createdAt.seconds}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default Quiz;
