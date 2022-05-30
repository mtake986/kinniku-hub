import React from 'react';
import { bsArrowRight } from '../../../icons/icons.jsx';

const GoNextQuizBtn = ({ goNextQuiz, text, clickedAnswerIndex }) => {
  return (
  <button onClick={goNextQuiz} className={clickedAnswerIndex ? 'goNextPrevQuizBtn' : 'goNextPrevQuizBtn disable'}>
    <span>{text}</span> {bsArrowRight}
  </button>
  )
  
};

export default GoNextQuizBtn;
