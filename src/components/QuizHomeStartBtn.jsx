import React from 'react';
import { Link } from 'react-router-dom';

const QuizHomeStartBtn = ({ selectedCategories }) => {
  return (
    <Link
      to={{ pathname: `/kinniku-quiz/test` }}
      state={{ selectedCategories: selectedCategories }}
      className={
        selectedCategories.length === 0 ? 'disable startBtn' : 'startBtn'
      }
      onClick={() => console.log(selectedCategories)}
    >
      {selectedCategories.length === 0
        ? 'Select one or more categories!!'
        : 'Start'
      }
    </Link>
  );
};

export default QuizHomeStartBtn;
