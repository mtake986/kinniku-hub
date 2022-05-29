import { useEffect, useState } from 'react';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import Loading from 'react-simple-loading';

import {db} from '../config/firebase';
import GoodBad from './GoodBad';
import GoNextQuizBtn from './GoNextQuizBtn';
import QuizResultWindow from './QuizResultWindow';
import { biCircle, biPlus } from '../icons/icons';

const Test = ({currentUser}) => {
  const [quizzes, setQuizzes] = useState([]);
  // const [clickedAnswers, setClickedAnswers] = useState([]);
  const [currentQuizIndex, setCurrentQuizIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [usersCorrectAnswers, setUsersCorrectAnswers] = useState([]);
  const [clickedAnswerIndex, setClickedAnswerIndex] = useState();
  const [testStopBtnClicked, setTestStopBtnClicked] = useState(false);
  const [answeredQuizzes, setAnsweredQuizzes] = useState("")
  const location = useLocation();
  const selectedCategories = location.state.selectedCategories;
  const maxTestLength = location.state.maxTestLength;

  const getQuizzes = async () => {
    const collectionRef = collection(db, 'quizzes');

    console.log(selectedCategories)
    if (selectedCategories[0] !== "all") {
      console.log("selectedCategories[0] !== 'all'")
      var q = query(collectionRef, where("category", "in", selectedCategories));
      var s = await getDocs(q);
    } else {
      console.log("selectedCategories[0] === 'all'")
      var s = await getDocs(collectionRef);
    }

    const snapshotLength = s.docs.length;
    console.log("snapshot.docs.length: ", snapshotLength);
    let testLength = snapshotLength;

    // When maxTestLength is equal to or bigger than snapshotLength, no selection is needed.
    if (snapshotLength <= maxTestLength) {
      setQuizzes(s.docs.map(doc => doc.data()));
      return
    } 

    // When maxTestLength is smaller than snapshotLength, I need to choose random questions from snapshot.
    console.log("need to choose")
    testLength = maxTestLength;
    console.log("testLength: ", testLength, "snapshotLength: ", snapshotLength);

    // Create an array of indexes of the snapshot.
    let randomQuizIndexes = [];
    let nums = [];
    for(let i = 0; i < snapshotLength; i++) {
      nums.push(i);
    };
    console.log("nums: ", nums);

    // Choose random indexes from nums.
    let i = testLength
    while(i > 0) {
      const n = Math.floor(Math.random() * nums.length); // random number between 0 and nums.length - 1
      randomQuizIndexes.push(nums[n]);
      nums.splice(n, 1);
      i--;
      console.log("======== i: ", i, "n: ", n, "nums: ", nums, "randomQuizIndexes: ", randomQuizIndexes);
    }

    // Get the quizzes from the snapshot.
    let quizzesLis = [];
    s.docs.map((doc, index) => {
      console.log("setQuizzes", randomQuizIndexes, index);
      if (randomQuizIndexes.includes(index)) {
        quizzesLis.push({...doc.data(), id: doc.id});
      }
    })
    console.log(quizzesLis);
    setQuizzes(quizzesLis);
  };

  useEffect(() => {
    // todo: Get new quizzes
    getQuizzes();

  }, [selectedCategories]);

  // console.log(quizzes)

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
    if (answeredQuizzes === "") {
      setAnsweredQuizzes([quiz])
    } else if (answeredQuizzes !== "") {
      setAnsweredQuizzes([...answeredQuizzes, quiz])
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
      {quizzes.length === 0 && (
        <div className="loading">
          <Loading color={'#005bbb'} />
        </div>
      )}
      {testStopBtnClicked === false && quizzes.map((quiz, index) => {
        if (index === currentQuizIndex) {
          return (
            <div key={quiz.index} className='quiz'>
              <div className='quizHeader'>
                <span className='createdBy'>Created by: {quiz.user.username ? quiz.user.username : "Anonymous"}</span>
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
                <button className='testStopBtn' onClick={() => {setTestStopBtnClicked(true)}}>
                  <span>Stop</span>
                </button>
                <GoodBad quiz={quiz} currentUser={currentUser} />
                {index + 1 === quizzes.length ? (
                    <GoNextQuizBtn goNextQuiz={goNextQuiz} text='Result' clickedAnswerIndex={clickedAnswerIndex ? true : false } />
                  ) : (
                    <GoNextQuizBtn goNextQuiz={goNextQuiz} text='Next' clickedAnswerIndex={clickedAnswerIndex ? true : false } />
                  )
                }
              </div>
            </div>
          );
        } else {
          return null;
        }
      })}
      {(testStopBtnClicked === true) || (quizzes.length !== 0 && currentQuizIndex >= quizzes.length) ? (
        <QuizResultWindow
          usersCorrectAnswers={usersCorrectAnswers}
          points={points}
          answeredQuizzes={answeredQuizzes}
        />
      ) : (
        null
      )}
    </div>
  );
};

export default Test;
