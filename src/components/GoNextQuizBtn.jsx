import React from 'react';
import { bsArrowRight } from '../icons/icons.jsx';

const GoNextQuizBtn = ({ goNextQuiz, text }) => {
  return (
  <button onClick={goNextQuiz} className='goNextPrevQuizBtn'>
    <span>{text}</span> {bsArrowRight}
  </button>
  )
  
};

export default GoNextQuizBtn;
