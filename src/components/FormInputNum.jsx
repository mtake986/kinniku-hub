import React from 'react'

const FormInputNum = ({placeholder}) => {
  return (
    <div className="quizFormInputNum">
      <label htmlFor={placeholder}>{placeholder}</label>
      <input type="number" />
    </div>
  )
}

export default FormInputNum