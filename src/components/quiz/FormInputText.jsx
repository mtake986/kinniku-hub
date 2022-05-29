import React, { useEffect, useState } from 'react';

const FormInputText = props => {
  const { focused, setFocused, label, err, onChange, noValidate, id, ...inputProps} = props;
  const handleFocus = e => {
    setFocused(true);
  };

  return (
    <div className='quizFormInputText'>
      <label htmlFor={label}>{label}</label>
      <input
        {...inputProps}
        onChange={onChange}
        required
        onBlur={handleFocus}
        focused={focused.toString()}
      />
      <span className='quizFormErrMsg'>{err}</span>
    </div>
  );
};

export default FormInputText;