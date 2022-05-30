import React from 'react';

const FormInputSelect = props => {
  const { label, err, onChange, id, ...inputProps } = props;
  return (
    <div className='quizFormInputSelect'>
      <label>{label}</label>
      <select name={label} id={label} onChange={onChange} defaultValue="">
        <option value="" disabled>Select a category</option>
        <option value="Workout">Workout</option>
        <option value="Muscle">Muscle</option>
        <option value="Nutrition">Nutrition</option>
        <option value="Other">Other</option>
      </select>
      {/* <span className='quizFormErrMsg'>{err}</span> */}
    </div>
  );
};

export default FormInputSelect;
