import React from 'react';
import { Link } from 'react-router-dom';

const QuizHomeStartBtn = ({ selectedCategories }) => {
  return (
    <Link
    to={{ pathname: `/kinniku-quiz/test` }}
    state={{ selectedCategories: selectedCategories }}
    >
      <button
        className={
          selectedCategories.length === 0 ? 'disable startBtn' : 'startBtn'
        }
        onClick={() => console.log(selectedCategories)}
      >
      {selectedCategories.length === 0
        ? 'Select one or more categories!!'
        : 'Start'
      }
    </button>
  </Link>
  );
};

export default QuizHomeStartBtn;
