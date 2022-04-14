import { useEffect, useState } from 'react';
import QuizzesList from './multiple/QuizzesList';

const QuizResultWindow = ({ usersCorrectAnswers, points, answeredQuizzes }) => {
  const [percentScore, setPercentScore] = useState('--');
  useEffect(() => {
    if (answeredQuizzes) {
      setPercentScore(
        `${Math.round((points / answeredQuizzes.length) * 1000) / 10}%`
      );
    }
  }, []);
  return (
    <div className='quizResultWindow'>
      <div className='quizResultText'>
        <h3>Overall score: {percentScore}</h3>
        <p className='quizResutlText'>
          You aced {points} out of {answeredQuizzes.length}.{' '}
        </p>
      </div>
      <QuizzesList
        list={answeredQuizzes}
        kind='answeredQuizzes'
        usersCorrectAnswers={usersCorrectAnswers}
      />
    </div>
  );
};

export default QuizResultWindow;
