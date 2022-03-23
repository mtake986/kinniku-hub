import React from 'react';
import { Formik, Form, Field, FieldArray } from 'formik';
import * as Yup from 'yup';

import { collection, setDoc, doc, addDoc } from 'firebase/firestore';
import db from '../config/firebase';

const quizSchema = Yup.object().shape({
  question: Yup.string()
    .min(10, 'Too Short!')
    .max(250, 'Too Long!')
    .required('Required'),
  answers: Yup.array()
    .min(2, "grtbg3r4gers")
    .of(Yup.string().min(0, 'Too Short!').max(50, 'Too Long!').nullable(false))
    .min(2, `Minimum of 2 answers`),
  // answer1: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // answer2: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // answer3: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  // answer4: Yup.string()
  //   .min(2, 'Too Short!')
  //   .max(50, 'Too Long!')
  //   .required('Required'),
  correctAnswer: Yup.number('only numbers are allowed')
    .min(1, 'type more than 1 please')
    .max(4, 'type less than 5')
    .required('Required'),
  category: Yup.string().required(),
  createdAt: Yup.date(),
  likes: Yup.number(),
});

export const FormikNewQuiz = () => (
  <div className='formikNewQuiz'>
    <Formik
      initialValues={{
        question: '',
        answers: ['', ''],
        // answer1: '',
        // answer2: '',
        // answer3: '',
        // answer4: '',
        correctAnswer: '',
        category: '',
        createdAt: new Date(),
        likes: 0,
      }}
      validationSchema={quizSchema}
      onSubmit={async values => {
        // same shape as initial values
        console.log(values);
        const quizCollectionRef = collection(db, 'quizzes');
        const payload = values;
        await addDoc(quizCollectionRef, payload);
      }}
    >
      {({ errors, touched, values }) => (
        <Form>
          <div style={labelInputContainer}>
            <label htmlFor='question' style={label}>
              Question
            </label>
            <Field name='question' style={quizFormInputText} />
            {errors.question && touched.question ? (
              <div style={quizFormErrMsg}>{errors.question}</div>
            ) : null}
          </div>

          <FieldArray
            name='answers'
            style={quizFormInputText}
            render={arrayHelpers => (
              <div>
                <label htmlFor='answers1' style={label}>
                  Answers
                </label>
                {values.answers.length <= 3 && (
                  <button
                  type='button'
                  onClick={() => arrayHelpers.push('')}
                >
                  {' '}
                  Add{' '}
                </button>
                )}
                {values.answers && values.answers.length > 0 ? (
                  values.answers.map((answer, index) => (
                    <div key={index}>
                      <Field name={`answers.${index}`} />
                      <button
                        type='button'
                        onClick={() => arrayHelpers.remove(index)}
                        style={{...values.answers.length <= 2 ? disableToClick : ""}}
                      >
                        {' '}
                        Delete{' '}
                      </button>
                    </div>
                  ))
                ) : (
                  <button type='button' onClick={() => arrayHelpers.push('')}>
                    {' '}
                    Add an answer
                  </button>
                )}
              </div>
            )}
          />

          {/* <div style={labelInputContainer}>
            <label htmlFor="answers1" style={label}>Answers</label>
            <Field name="answers[0]" style={quizFormInputText} />
            <Field name="answers[1]" style={quizFormInputText} />
            <Field name="answers[2]" style={quizFormInputText} />
            <Field name="answers[3]" style={quizFormInputText} />
            {errors.answers[0] && touched.answers[0] ? (
              <div style={quizFormErrMsg}>{errors.answers[0]}</div>
            ) : null}
          </div> */}

          {/* <div style={labelInputContainer}>
            <label htmlFor="answer1" style={label}>Answer 1</label>
            <Field name="answer1" style={quizFormInputText} />
            {errors.answer1 && touched.answer1 ? (
              <div style={quizFormErrMsg}>{errors.answer1}</div>
            ) : null}
          </div>
          
          <div style={labelInputContainer}>
            <label htmlFor="answer2" style={label}>Answer 2</label>
            <Field name="answer2" style={quizFormInputText} />
            {errors.answer2 && touched.answer2 ? (
              <div style={quizFormErrMsg}>{errors.answer2}</div>
            ) : null}
          </div>

          <div style={labelInputContainer}>
            <label htmlFor="answer3" style={label}>Answer 3</label>
            <Field name="answer3" style={quizFormInputText} />
            {errors.answer3 && touched.answer3 ? (
              <div style={quizFormErrMsg}>{errors.answer3}</div>
            ) : null}
          </div>

          <div style={labelInputContainer}>
            <label htmlFor="answer4" style={label}>Answer 4</label>
            <Field name="answer4" style={quizFormInputText} />
            {errors.answer4 && touched.answer4 ? (
              <div style={quizFormErrMsg}>{errors.answer4}</div>
            ) : null}
          </div> */}

          <div style={labelInputContainer}>
            <label htmlFor='correctAnswer' style={label}>
              Correct Answer
            </label>
            <Field name='correctAnswer' style={quizFormInputText} />
            {errors.correctAnswer && touched.correctAnswer ? (
              <div style={quizFormErrMsg}>Only 1 ~ 4 are allowed.</div>
            ) : null}
          </div>

          <div style={labelInputContainer}>
            <label style={label}>Category</label>
            <Field as='select' name='category' style={quizFormInputText}>
              <option value='' disabled>
                Select a category
              </option>
              <option value='Workout'>Workout</option>
              <option value='Muscle'>Muscle</option>
              <option value='Nutrition'>Nutrition</option>
              <option value='Other'>Other</option>
            </Field>
            {errors.category && touched.category ? (
              <div style={quizFormErrMsg}>{errors.category}</div>
            ) : null}
          </div>

          <button type='submit' style={submitButton}>
            Submit
          </button>
        </Form>
      )}
    </Formik>
  </div>
);

const labelInputContainer = {
  background: '',
};

const label = {
  fontSize: '0.9rem',
  marginBottom: '5px',
};

const quizFormInputText = {
  marginBottom: '10px',
  display: 'block',
  width: '100%',
  flexDirection: 'column',
  border: '1px solid rgb(200, 200, 200)',
  fontSize: '1rem',
  padding: '10px',
  borderRadius: '5px',
};

const quizFormErrMsg = {
  color: 'red',
  fontSize: '.9rem',
  padding: '5px 15px',
  background: 'rgb(255, 240, 240)',
  // display: "none",
};

const submitButton = {
  padding: '10px 18px',
  borderRadius: '5px',
  border: 'none',
  width: '100%',
  background: 'white',
  fontSize: '1rem',
  cursor: 'pointer',
  transition: '.3s',
  background: 'rgb(245, 245, 245)',
};

const disableToClick = {
  display: "none",
}
export default FormikNewQuiz;
