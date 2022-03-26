import { useEffect, useState } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';
import Loading from 'react-simple-loading';

import db from '../config/firebase';
import GoodBad from './GoodBad';
import GoNextQuizBtn from './GoNextQuizBtn';
import GoPrevQuizBtn from './GoPrevQuizBtn';
import QuizResultWindow from './QuizResultWindow';
import { biCircle, biPlus } from '../icons/icons';

const Test = () => {
  const [quizzes, setQuizzes] = useState([]);
  // const [clickedAnswers, setClickedAnswers] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [usersCorrectAnswers, setUsersCorrectAnswers] = useState([]);
  const [clickedAnswerIndex, setClickedAnswerIndex] = useState();

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

  console.log(`clickedAnswerIndex => ${clickedAnswerIndex}`)
  const handleJudge = async (e, answer, quiz, answerIndex, quizIndex) => {
    // It may be unnecessary to add 1. I jsut thought users don't like index 0 for answer/quiz 1.
    answerIndex++;
    quizIndex++;

    const correctAnswerIndex = quiz.correctAnswer;
    console.log(
      `answer => ${answer}, answerIndex => ${answerIndex}, correctAnswerIndex => ${correctAnswerIndex}, quizIndex => ${quizIndex}`
    );

    setClickedAnswerIndex(answerIndex);
    console.log(clickedAnswerIndex, e);

    // When an answer is clicked:
    // 1. make all disable to be clicked <- can be done by adding the same className to all.
    // 2. show the answer with a slight dif style
    // 3. add style to a selected answer.

    // add some styles to answers depending on correct or not
    if (correctAnswerIndex === answerIndex) {
      setPoints(prevState => prevState + 1);
      setUsersCorrectAnswers([...usersCorrectAnswers, quizIndex]);
      e.target.className = await 'selected correctAnswerClicked';
    } else {
      e.target.className = await 'selected incorrectAnswerClicked';
    }
  };

  const goNextQuiz = () => {
    console.log(currentQIndex, quizzes.length);
    if (currentQIndex !== quizzes.length) {
      setCurrentQIndex(prevState => prevState + 1);
    }
    setClickedAnswerIndex();
  };
  const goPrevQuiz = () => {
    console.log(currentQIndex, quizzes.length);
    if (currentQIndex !== 0) {
      setCurrentQIndex(prevState => prevState - 1);
    } else {
      setCurrentQIndex(currentQIndex);
    }
    setClickedAnswerIndex();
  };

  console.log(quizzes);
  return (
    <div className='quizContainer'>
      {quizzes.length === 0 ? <Loading color={'#005bbb'} /> : ''}
      {quizzes.map((quiz, quizIndex) => {
        if (quizIndex === currentQIndex) {
          return (
            <div key={quiz.id} className='quiz'>
              <div className='quizHeader'>
                <span className='createdBy'>Created by: User 1</span>
                <span className='quizNumber'>
                  {quizIndex + 1}/{quizzes.length}
                </span>
              </div>
              <div className='quizQuestionContainer'>
                <p className='quizQuestionText'>{quiz.question}</p>
              </div>
              <ul
                className={
                  clickedAnswerIndex
                    ? 'quizAnswersContainer answerDefined'
                    : 'quizAnswersContainer'
                }
              >
                {quiz.answers.map((answer, answerIndex) => (
                  <li
                    key={answer}
                    onClick={e => {
                      handleJudge(e, answer, quiz, answerIndex, quizIndex);
                    }}
                    className={
                      clickedAnswerIndex &&
                      answerIndex + 1 === clickedAnswerIndex
                        ? 'selected'
                        : null
                    }
                  >
                    <span className='answer'>{answer}</span>
                    <div className='correctIncorrectIcons'>
                      <span className='correctIcon'>{biCircle}</span>
                      <span className='incorrectIcon'>{biPlus}</span>
                    </div>
                  </li>
                ))}
              </ul>
              <div className='quizFooter'>
                {quizIndex !== 0 ? (
                  <GoPrevQuizBtn
                    goPrevQuiz={goPrevQuiz}
                    text='Prev'
                    disable=''
                  />
                ) : (
                  <GoPrevQuizBtn
                    goPrevQuiz={goPrevQuiz}
                    text='Prev'
                    disable='disable'
                  />
                )}

                <GoodBad quiz={quiz} />
                {quizIndex + 1 === quizzes.length ? (
                    <GoNextQuizBtn goNextQuiz={goNextQuiz} text='Result' clickedAnswerIndex={clickedAnswerIndex ? true : false } />
                  ) : (
                    <GoNextQuizBtn goNextQuiz={goNextQuiz} text='Next' clickedAnswerIndex={clickedAnswerIndex ? true : false } />
                  )
                }
              </div>
            </div>
          );
        }
      })}
      {quizzes.length !== 0 && currentQIndex >= quizzes.length ? (
        <QuizResultWindow
          usersCorrectAnswers={usersCorrectAnswers}
          points={points}
          quizzes={quizzes}
        />
      ) : (
        ''
      )}
    </div>
  );
};

export default Test;
