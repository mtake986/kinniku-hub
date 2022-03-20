import React from 'react';
import { bsArrowRight } from '../icons/icons.jsx';

const GoNextQuizBtn = ({ goNextQuiz }) => {
  return (
  <button onClick={goNextQuiz} className='goNextQuizBtn'>
    <span>Next</span> {bsArrowRight}
  </button>
  )
  
};

export default GoNextQuizBtn;
