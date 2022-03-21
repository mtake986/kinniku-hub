import React from 'react';

const FormInputText = props => {
  const { label, onChange, id, ...inputProps } = props;
  return (
    <div className='quizFormInputText'>
      <label htmlFor={label}>{label}</label>
      <input {...inputProps} onChange={onChange} />
    </div>
  );
};

export default FormInputText;
