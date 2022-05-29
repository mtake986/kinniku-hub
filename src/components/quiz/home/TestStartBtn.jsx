import React from 'react';
import { Link } from 'react-router-dom';

const TestStartBtn = ({ selectedCategories, maxTestLength }) => {
  return (
    <Link
      to={{ pathname: `/kinniku-quiz/test` }}
      state={{
        selectedCategories: selectedCategories,
        maxTestLength: maxTestLength,
      }}
      className={
        selectedCategories.length === 0 ? 'disable startBtn' : 'startBtn'
      }
      onClick={() => console.log(selectedCategories)}
    >
      {selectedCategories.length === 0
        ? 'Select one or more categories!!'
        : 'Start'}
    </Link>
  );
};

export default TestStartBtn;
