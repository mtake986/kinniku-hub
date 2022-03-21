import React from 'react';
import { bsArrowLeft } from '../icons/icons.jsx';

const GoNextQuizBtn = ({ goPrevQuiz, text }) => {
  return (
  <button onClick={goPrevQuiz} className='goNextPrevQuizBtn'>
    {bsArrowLeft} <span>{text}</span>
  </button>
  )
  
};

export default GoNextQuizBtn;
