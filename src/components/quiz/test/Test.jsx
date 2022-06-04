import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import Loading from 'react-simple-loading';

import GoodBad from './GoodBad';
import GoNextQuizBtn from './GoNextQuizBtn';
import QuizResultWindow from './QuizResultWindow';
import { db } from '../../../config/firebase';
import { biCircle, biPlus } from '../../../icons/icons';
import NoData from '../../NoData';
import GoResultWindowBtn from './GoResultWindowBtn';

const Test = ({ currentUser }) => {
  const [quizzes, setQuizzes] = useState([]);
  // const [clickedAnswers, setClickedAnswers] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [usersCorrectAnswers, setUsersCorrectAnswers] = useState([]);
  const [clickedAnswerIndex, setClickedAnswerIndex] = useState();
  const [testStopBtnClicked, setTestStopBtnClicked] = useState(false);
  const [answeredQuizzes, setAnsweredQuizzes] = useState('');
  const location = useLocation();
  const selectedCategories = location.state.selectedCategories;
  const maxTestLength = location.state.maxTestLength;
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    // todo: Get new quizzes
    getQuizzes();
  }, [selectedCategories]);

  // console.log(quizzes)

  const getQuizzes = async () => {
    setIsLoading(true);

    const collectionRef = collection(db, 'quizzes');

    let s;
    if (selectedCategories[0] !== 'all') {
      const q = query(
        collectionRef,
        where('category', 'in', selectedCategories)
      );
      s = await getDocs(q);
    } else {
      s = await getDocs(collectionRef);
    }

    const snapshotLength = s.docs.length;
    let testLength = snapshotLength;

    // When maxTestLength is equal to or bigger than snapshotLength, no selection is needed.
    if (snapshotLength <= maxTestLength) {
      setQuizzes(s.docs.map(doc => doc.data()));
    }

    // When maxTestLength is smaller than snapshotLength, I need to choose random questions from snapshot.
    testLength = maxTestLength;

    // Create an array of indexes of the snapshot.
    let randomQuizIndexes = [];
    let nums = [];
    for (let i = 0; i < snapshotLength; i++) {
      nums.push(i);
    }

    // Choose random indexes from nums.
    let i = testLength;
    while (i > 0) {
      const n = Math.floor(Math.random() * nums.length); // random number between 0 and nums.length - 1
      randomQuizIndexes.push(nums[n]);
      nums.splice(n, 1);
      i--;
      console.log(i);
    }
    console.log();

    // Get the quizzes from the snapshot.
    let quizzesLis = [];
    s.docs.map((doc, index) => {
      if (randomQuizIndexes.includes(index)) {
        quizzesLis.push({ ...doc.data(), id: doc.id });
      }
    });
    setQuizzes(quizzesLis);
    setIsLoading(false);
  };

  const handleJudge = async (e, answer, quiz, answerIndex, quizIndex) => {
    // It may be unnecessary to add 1. I jsut thought users don't like index 0 for answer/quiz 1.
    answerIndex++;
    quizIndex++;

    const correctAnswerIndex = quiz.correctAnswer;
    console.log(
      `answer => ${answer}, answerIndex => ${answerIndex}, correctAnswerIndex => ${correctAnswerIndex}, quizIndex => ${quizIndex}`
    );

    setClickedAnswerIndex(answerIndex);

    // add some styles to answers depending on correct or not
    if (correctAnswerIndex === answerIndex) {
      setPoints(prevState => prevState + 1);
      setUsersCorrectAnswers([...usersCorrectAnswers, quizIndex]);
      e.target.className = await 'selected correctAnswerClicked';
    } else {
      e.target.className = await 'selected incorrectAnswerClicked';
    }

    // add this quiz into answeredQuizzes
    if (answeredQuizzes === '') {
      setAnsweredQuizzes([quiz]);
    } else if (answeredQuizzes !== '') {
      setAnsweredQuizzes([...answeredQuizzes, quiz]);
    }
    console.log(answeredQuizzes);
  };

  const goNextQuiz = () => {
    if (currentQuizIndex !== quizzes.length) {
      setCurrentQuizIndex(prevState => prevState + 1);
    }
    setClickedAnswerIndex();
  };

  // const goPrevQuiz = () => {
  //   if (currentQuizIndex !== 0) {
  //     setCurrentQuizIndex(prevState => prevState - 1);
  //   } else {
  //     setCurrentQuizIndex(currentQuizIndex);
  //   }
  //   setClickedAnswerIndex();
  // };

  return (
    <div className='quizContainer'>
      {isLoading ? (
        <div className='loading'>
          <Loading color={'#005bbb'} />
        </div>
      ) : quizzes.length === 0 ? (
        <NoData txt='No Quizzes to display...' />
      ) : (
        testStopBtnClicked === false &&
        quizzes.map((quiz, index) => {
          if (index === currentQuizIndex) {
            return (
              <div key={quiz.index} className='quiz'>
                <div className='quizHeader'>
                  <span className='createdBy'>
                    Created by:{' '}
                    {quiz.user.username ? quiz.user.username : 'Anonymous'}
                  </span>
                  <span className='quizNumber'>
                    {index + 1}/{quizzes.length}
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
                      key={answerIndex}
                      onClick={e => {
                        handleJudge(e, answer, quiz, answerIndex, index);
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
                  {/* {quizIndex !== 0 ? (
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
                  )} */}
                  <button
                    className='testStopBtn'
                    onClick={() => {
                      setTestStopBtnClicked(true);
                    }}
                  >
                    <span>Stop</span>
                  </button>
                  <GoodBad quiz={quiz} currentUser={currentUser} />
                  {/* todo: context provider here */}
                  {index + 1 === quizzes.length ? (
                    // <GoNextQuizBtn goNextQuiz={goNextQuiz} text='Result' clickedAnswerIndex={clickedAnswerIndex ? true : false } />
                    <GoResultWindowBtn
                      goNextQuiz={goNextQuiz}
                      text='Result'
                      clickedAnswerIndex={clickedAnswerIndex ? true : false}
                      usersCorrectAnswers={usersCorrectAnswers}
                      points={points}
                      answeredQuizzes={answeredQuizzes}
                    />
                  ) : (
                    <GoNextQuizBtn
                      goNextQuiz={goNextQuiz}
                      text='Next'
                      clickedAnswerIndex={clickedAnswerIndex ? true : false}
                    />
                  )}
                </div>
              </div>
            );
          } else {
            return null;
          }
        })
      )}
    </div>
  );
};

export default Test;
