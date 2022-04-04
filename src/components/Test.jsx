import { useEffect, useState } from 'react';
import { collection, onSnapshot, query, orderBy, where, limit, getDocs } from 'firebase/firestore';
import { useLocation } from 'react-router-dom';
import Loading from 'react-simple-loading';

import {db} from '../config/firebase';
import GoodBad from './GoodBad';
import GoNextQuizBtn from './GoNextQuizBtn';
import GoPrevQuizBtn from './GoPrevQuizBtn';
import QuizResultWindow from './QuizResultWindow';
import { biCircle, biPlus } from '../icons/icons';

const Test = ({currentUser}) => {
  const [quizzes, setQuizzes] = useState([]);
  // const [clickedAnswers, setClickedAnswers] = useState([]);
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [usersCorrectAnswers, setUsersCorrectAnswers] = useState([]);
  const [clickedAnswerIndex, setClickedAnswerIndex] = useState();
  const location = useLocation();
  const selectedCategories = location.state.selectedCategories;
  const [time, setTime] = useState(10);

  console.log(`selectedCategories => `, selectedCategories, "desu")

  // console.log(currentUser)

  useEffect(() => {
    // todo: Get new quizzes
    const getQuizzesFromPassedCategories = async () => {
      const collectionRef = collection(db, 'quizzes');

      let tempQuizzes = [];
      if (selectedCategories.includes("all")) {
        const querySnapshot = await getDocs(collectionRef);
        querySnapshot.forEach((doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());
          tempQuizzes.push({ ...doc.data(), id: doc.id });
        });
      } else {
        for (let i = 0; i < selectedCategories.length; i++) {
          const c = selectedCategories[i];
          const q = query(collectionRef, where("category", "==", c))
          console.log(c, "=>", q)
          const querySnapshot = await getDocs(q);
          querySnapshot.forEach((doc) => {
            console.log(doc.id, " => ", doc.data());
            // dont forget to add id, refer onSnapshot in QuizHome
            tempQuizzes.push({ ...doc.data(), id: doc.id });
          });
        }
      }
      setQuizzes(tempQuizzes);
      console.log(quizzes)
    };
    getQuizzesFromPassedCategories();

  }, []);

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
  };

  const goNextQuiz = () => {
    if (currentQIndex !== quizzes.length) {
      setCurrentQIndex(prevState => prevState + 1);
    }
    setClickedAnswerIndex();
  };
  
  const goPrevQuiz = () => {
    if (currentQIndex !== 0) {
      setCurrentQIndex(prevState => prevState - 1);
    } else {
      setCurrentQIndex(currentQIndex);
    }
    setClickedAnswerIndex();
  };

  return (
    <div className='quizContainer'>
      {quizzes.length === 0 && (
        <div className="loading">
          <Loading color={'#005bbb'} />
        </div>
      )}
      {quizzes.map((quiz, quizIndex) => {
        if (quizIndex === currentQIndex) {
          return (
            <div key={quiz.id} className='quiz'>
              <div className='quizHeader'>
                <span className='createdBy'>Created by: {quiz.user.username ? quiz.user.username : "Anonymous"}</span>
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
                    key={answerIndex}
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
                <GoodBad quiz={quiz} currentUser={currentUser} />
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
        null
      )}
    </div>
  );
};

export default Test;
