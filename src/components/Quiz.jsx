import { useEffect, useState } from 'react';
import { Link, Outlet } from 'react-router-dom';
import { doc, collection, onSnapshot } from 'firebase/firestore';
import Loading from 'react-simple-loading';

import db from '../config/firebase';
import GoodBad from './GoodBad';
import GoNextQuizBtn from './GoNextQuizBtn';
import GoPrevQuizBtn from './GoPrevQuizBtn';
import { bsEmojiDizzy, bsEmojiLaughing } from '../icons/icons';


const Quiz = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [disableClick, setDisableClick] = useState('ableClick');
  // const [clickedAnswers, setClickedAnswers] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [currentQ, setCurrentQ] = useState();
  const [loading, setLoading] = useState(false);

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

  const handleJudge = (e, answer, quiz, answerIndex, quizIndex) => {
    // It may be unnecessary to add 1. I jsut thought users don't like index 0 for answer/quiz 1.
    answerIndex++;
    quizIndex++;
    const correctAnswerIndex = quiz.correctAnswer;
    console.log(
      `answer => ${answer}, answerIndex => ${answerIndex}, correctAnswerIndex => ${correctAnswerIndex}, quizIndex => ${quizIndex}`
    );

    // Noneed??
    // setClickedAnswers([...clickedAnswers, answer]);
    // console.log(`clickedAnswers => ${clickedAnswers}`);

    // add some styles to answers depending on correct or not
    if (correctAnswerIndex === answerIndex) {
      e.target.className = 'correctAnswerClicked disableClick';
    } else {
      e.target.className = 'incorrectAnswerClicked disableClick';
    }
  };

  const goNextQuiz = () => {
    console.log(currentQIndex, quizzes.length);
    if (currentQIndex !== quizzes.length) {
      setCurrentQIndex(prevState => prevState + 1);
    }
  };
  const goPrevQuiz = () => {
    console.log(currentQIndex, quizzes.length);
    if (currentQIndex !== 0) {
      setCurrentQIndex(prevState => prevState - 1);
    }
  };

  // console.log(`oneQ = ${oneQ}`)
  console.log(quizzes);
  return (
    <div className='quizContainer'>
      {quizzes.length === 0 ? <Loading color={"#005bbb"} /> : ""}
      {quizzes.map((quiz, quizIndex) => {
        if (quizIndex === currentQIndex) {
          return (
            <div key={quiz.id} className='quiz'>
              <div className="quizHeader">
                <span className="createdBy">Created by: User 1</span>
                <span className="quizNumber">{quizIndex+1}/{quizzes.length}</span>
              </div>
              <div className='quizQuestionContainer'>
                <p className='quizQuestionText'>{quiz.question}</p>
              </div>
              <ul className='answersContainer'>
                {quiz.answers.map((answer, answerIndex) => (
                  <li
                    key={answer}
                    onClick={e => {
                      handleJudge(e, answer, quiz, answerIndex, quizIndex);
                    }}
                  >
                    <span className='answer'>{answer}</span>
                    <div className='correctIncorrectIcons'>
                      <span className='incorrectIcon'>
                        {bsEmojiDizzy}
                      </span>
                      <span className='correctIcon'>
                        {bsEmojiLaughing}
                      </span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='quizFooter'>
                <GoPrevQuizBtn goPrevQuiz={goPrevQuiz} text="Prev" />
                
                <GoodBad quiz={quiz} />
                {quizIndex+1 === quizzes.length ? (
                  <GoNextQuizBtn goNextQuiz={goNextQuiz} text="Result" />
                ) : (
                  <GoNextQuizBtn goNextQuiz={goNextQuiz} text="Next" />
                )}
              </div>
              <span className="category">{quiz.category}</span>
            </div>
          );
        }
      })}
      {quizzes.length !== 0 && currentQIndex >= quizzes.length ? "Finish" : ""}
    </div>
  );
};

export default Quiz;
