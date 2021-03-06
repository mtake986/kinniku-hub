import React from 'react';
import { bsArrowLeft } from '../../../icons/icons.jsx';

const GoNextQuizBtn = ({ goPrevQuiz, text, disable }) => {
  return (
  <button onClick={goPrevQuiz} className={disable === "disable" ? 'disable goNextPrevQuizBtn' : 'goNextPrevQuizBtn'}>
    {bsArrowLeft} <span>{text}</span>
  </button>
  )
};

export default GoNextQuizBtn;
