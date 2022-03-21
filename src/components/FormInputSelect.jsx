import React from 'react';

const FormInputSelect = props => {
  const { label, onChange, id, ...inputProps } = props;
  return (
    <div className='quizFormInputSelect'>
      <span>{label}</span>
      <select name={label} id={label} onChange={onChange}>
        <option value="Workout">Workout</option>
        <option value="Muscle">Muscle</option>
        <option value="Nutrition">Nutrition</option>
      </select>
    </div>
  );
};

export default FormInputSelect;
