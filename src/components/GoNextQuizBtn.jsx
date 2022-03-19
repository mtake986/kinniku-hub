import React from 'react';
import { bsArrowRight } from '../icons/icons.jsx';

const GoNextQuizBtn = ({ goNextQuiz }) => {
  return (
  <button onClick={goNextQuiz} className='goNextQuizBtn'>
    {bsArrowRight}
  </button>
  )
  
};

export default GoNextQuizBtn;
