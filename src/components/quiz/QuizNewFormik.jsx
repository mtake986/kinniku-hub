import { useEffect, useRef, useState } from 'react';
import { collection, addDoc, doc, getDoc } from 'firebase/firestore';
import { Formik, Form, Field, FieldArray, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import Snackbar from './Snackbar';
import {db} from '../../config/firebase';
import { ioRemoveCircleSharp } from '../../icons/icons';

Yup.addMethod(Yup.array, 'unique', function (message, mapper = a => a) {
  return this.test('unique', message, function (list) {
    return list.length === new Set(list.map(mapper)).size;
  });
});

const quizSchema = Yup.object().shape({
  question: Yup.string()
    .min(10, 'Minimum of 10 letters!')
    .max(200, 'Maximum of 200 letters!')
    .required('Required'),
  answers: Yup.array()
    .of(Yup.string().max(50, 'Maximum of 50 letters!').required('Required'))
    .unique('Duplicate answers are not allowed')
    .min(2, `Minimum of 2 answers`),
  correctAnswer: Yup.number('only numbers are allowed')
    .min(1, 'type more than 1 please')
    .max(4, 'type less than 5')
    .required('Required'),
  category: Yup.string().required('Required'),
  tags: Yup.array()
    .of(Yup.string().max(20, 'Maximum of 20 letters!').required('Required'))
    .unique('Duplicate tags are not allowed')
    .max(3, `Maximum of 3 tags`),
  createdAt: Yup.date(),
  likes: Yup.number(),
  whoLikes: Yup.array()
    .of(Yup.string()),
});

export const QuizNewFormik = ({ user }) => {
  const [focused, setFocused] = useState(false);
  const [submitBtnHover, setSubmitBtnHover] = useState(false);
  const snackbarRef = useRef(null);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    const getQuizCategory = async () => {
      const docRef = doc(db, 'quizCategory', 'quizCategoryCategories');
      const docSnap = await getDoc(docRef);
  
      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data()['categories']);
        setCategories(docSnap.data()['categories']);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
      // console.log("I got all categories!! Here they are: " + categories)
    };
    getQuizCategory();

    return;
  }, [])

  console.log(user)
  console.log("categories: ", categories);

  return (
    <div className='quizNewFormk'>
      {/* <div className="pageTtl">New</div> */}
      <Snackbar type='success' msg='Successfully Stored!!' ref={snackbarRef} />

      <Formik
        initialValues={{
          question: '',
          answers: ['', ''],
          correctAnswer: '',
          category: '',
          createdAt: new Date(),
          likes: 0,
          whoLikes: [],
          tags: [],
        }}
        validateOnChange
        validationSchema={quizSchema}
        onSubmit={async (values, { resetForm }) => {
          // same shape as initial values
          const quizCollectionRef = collection(db, 'quizzes');
          const payload = {...values, user};
          console.log(`values => ${values}`);
          await addDoc(quizCollectionRef, payload);
          snackbarRef.current.show()
          resetForm();
        }}
      >
        {({ errors, touched, values }) => (
          <Form novalidate>
            <div style={topLabelInputContainer}>
              <label htmlFor='question' style={label}>
                Question
              </label>
              <Field
                name='question'
                onFocus={() => {
                  setFocused('question');
                }}
                onBlur={() => {
                  setFocused('');
                }}
                style={focused === 'question' ? focusStyle : quizFormInputText}
              />
              {errors.question && touched.question ? (
                <div style={quizFormErrMsg}>{errors.question}</div>
              ) : null}
            </div>

            <FieldArray
              name='answers'
              style={quizFormInputText}
              render={arrayHelpers => (
                <div style={labelInputContainer}>
                  <label htmlFor='answers1' style={label}>
                    Answers
                  </label>
                  {errors.answers && touched.answers && errors.answers === 'Duplicate answers are not allowed' ? (
                    <div style={quizFormErrMsg}>{errors.answers}</div>
                  ) : null}
                  {values.answers && values.answers.length > 0
                    ? values.answers.map((answer, index) => (
                        <div key={index} style={answerContainer}>
                          <div style={indexAnswerIconContainer}>
                            <span style={answerIndex}>{index + 1}</span>
                            <Field
                              name={`answers.${index}`}
                              key={`answers.${index}`}
                              onFocus={() => {
                                switch (index) {
                                  case 0:
                                    return setFocused('a1');
                                  case 1:
                                    return setFocused('a2');
                                  case 2:
                                    return setFocused('a3');
                                  case 3:
                                    return setFocused('a4');
                                  default:
                                    return setFocused('');
                                }
                              }}
                              onBlur={() => {
                                switch (index) {
                                  case 0:
                                    return setFocused('');
                                  case 1:
                                    return setFocused('');
                                  case 2:
                                    return setFocused('');
                                  case 3:
                                    return setFocused('');
                                  default:
                                    return setFocused('');
                                }
                              }}
                              style={
                                focused === 'a1' && index === 0
                                  ? focusStyle
                                  : focused === 'a2' && index === 1
                                  ? focusStyle
                                  : focused === 'a3' && index === 2
                                  ? focusStyle
                                  : focused === 'a4' && index === 3
                                  ? focusStyle
                                  : quizFormInputText
                              }
                            />
                            {values.answers.length >= 3 ? (
                              <i
                                onClick={() => arrayHelpers.remove(index)}
                                style={removeIcon}
                              >
                                {ioRemoveCircleSharp}
                              </i>
                            ) : (
                              null
                            )}
                          </div>
                          {/* <div style={quizFormErrMsg}>
                            <ErrorMessage name={`answers.${index}`} />
                          </div> */}
                          {errors.answers &&
                          touched.answers && 
                          errors.answers !== 'Duplicate answers are not allowed' ? (
                            <div style={quizFormErrMsg}>
                              <ErrorMessage name={`answers.${index}`} />
                            </div>
                          ) : null}
                        </div>
                      ))
                    : null}
                  {values.answers.length <= 3 ? (
                    <div
                      // style={addHover ? moreAnswerIconHover : moreAnswerIcon}
                      style={moreAnswerIcon}
                      onClick={() => arrayHelpers.push('')}
                      // onMouseEnter={() => setAddHover(true)}
                      // onMouseLeave={() => setAddHover(false)}
                    >
                      Add
                    </div>
                  ) : null}
                </div>
              )}
            />

            <div style={labelInputContainer}>
              <label htmlFor='correctAnswer' style={label}>
                Correct Answer
              </label>
              <Field
                min='1'
                max={values.answers.length}
                type='number'
                name='correctAnswer'
                onFocus={() => {
                  setFocused('ca');
                }}
                onBlur={() => {
                  setFocused('');
                }}
                style={focused === 'ca' ? focusStyle : quizFormInputText}
              />
              {errors.correctAnswer && touched.correctAnswer && values.correctAnswer === "" ? (
                <div style={quizFormErrMsg}>{errors.category}</div>
              ) : errors.correctAnswer && touched.correctAnswer ? (
                <div style={quizFormErrMsg}>
                  Only 1 ~ {values.answers.length} are allowed.
                </div>
              ) : null}
            </div>

            <div style={labelInputContainer}>
              <label style={label}>Category</label>
              <Field
                as='select'
                name='category'
                onFocus={() => {
                  setFocused('category');
                }}
                onBlur={() => {
                  setFocused('');
                }}
                style={focused === 'category' ? focusStyle : quizFormInputText}
              >
                <option value='' disabled>
                  Select a category
                </option>
                {categories.map((c) => (
                  <option key={c} value={c}>{c}</option>
                ))}
              </Field>
              {errors.category && touched.category ? (
                <div style={quizFormErrMsg}>{errors.category}</div>
              ) : null}
            </div>

            <FieldArray
              name='tags'
              style={quizFormInputText}
              render={arrayHelpers => (
                <div style={labelInputContainer}>
                  <label style={label}>
                    Tags
                  </label>
                  {errors.tags &&
                  touched.tags &&
                  errors.tags === 'Duplicate tags are not allowed' ? (
                    <div style={quizFormErrMsg}>{errors.tags}</div>
                  ) : null}
                  {values.tags && values.tags.length > 0
                    ? values.tags.map((tag, index) => (
                        <div key={index} style={answerContainer}>
                          <div style={indexAnswerIconContainer}>
                            {/* <span style={answerIndex}>{index + 1}</span> */}
                            <Field
                              name={`tags.${index}`}
                              key={`tags.${index}`}
                              onFocus={() => {
                                switch (index) {
                                  case 0:
                                    return setFocused('t1');
                                  case 1:
                                    return setFocused('t2');
                                  case 2:
                                    return setFocused('t3');
                                  default:
                                    return setFocused('');
                                }
                              }}
                              onBlur={() => {
                                switch (index) {
                                  case 0:
                                    return setFocused('');
                                  case 1:
                                    return setFocused('');
                                  case 2:
                                    return setFocused('');
                                  case 3:
                                    return setFocused('');
                                  default:
                                    return setFocused('');
                                }
                              }}
                              style={
                                focused === 't1' && index === 0
                                  ? focusStyle
                                  : focused === 't2' && index === 1
                                  ? focusStyle
                                  : focused === 't3' && index === 2
                                  ? focusStyle
                                  : quizFormInputText
                              }
                            />
                            {values.tags.length >= 1 ? (
                              <i
                                onClick={() => arrayHelpers.remove(index)}
                                style={removeIcon}
                              >
                                {ioRemoveCircleSharp}
                              </i>
                            ) : (
                              null
                            )}
                          </div>
                          {/* <div style={quizFormErrMsg}>
                            <ErrorMessage name={`answers.${index}`} />
                          </div> */}
                          {errors.tags &&
                          touched.tags &&
                          errors.tags !==
                            'Duplicate tags are not allowed' ? (
                            <div style={quizFormErrMsg}>
                              <ErrorMessage name={`tags.${index}`} />
                            </div>
                          ) : null}
                        </div>
                      ))
                    : null}
                  {values.tags.length <= 2 ? (
                    <div
                      // style={addHover ? moreAnswerIconHover : moreAnswerIcon}
                      style={moreAnswerIcon}
                      onClick={() => arrayHelpers.push('')}
                      // onMouseEnter={() => setAddHover(true)}
                      // onMouseLeave={() => setAddHover(false)}
                    >
                      Add
                    </div>
                  ) : null}
                </div>
              )}
            />
            
            <button
              // disabled={!dirty && isValid}
              type='submit'
              style={submitBtnHover ? submitButtonHover : submitButton}
              onMouseEnter={() => setSubmitBtnHover(true)}
              onMouseLeave={() => setSubmitBtnHover(false)}
            >
              Create
            </button>
          </Form>
        )}
      </Formik>
    </div>
  );
};


// ========== Styles =========
const topLabelInputContainer = {
  background: '',
  marginTop: "-15px",
};
const labelInputContainer = {
  background: '',
  margin: '30px 0',
};

const label = {
  fontSize: '1.5rem',
  margin: '10px 0 0px',
  fontFamily: "'Cormorant Garamond', serif",
};

const quizFormInputText = {
  display: 'block',
  width: '100%',
  flexDirection: 'column',
  border: 'none',
  borderBottom: '1px solid rgb(200, 200, 200)',
  fontSize: '1.2rem',
  padding: '10px 15px',
  marginTop: '5px',
  transition: '.3s',
};
const focusStyle = {
  display: 'block',
  width: '100%',
  flexDirection: 'column',
  border: 'none',
  fontSize: '1.2rem',
  padding: '10px 15px',
  outline: 'none',
  borderBottom: '1px solid #005bbb',
  marginTop: '5px',
  background: '#ecf5ff',
  transition: '.3s',
};

const quizFormErrMsg = {
  color: 'red',
  fontSize: '.9rem',
};

// This includes an answer and error
const answerContainer = {
  display: 'flex',
  flexDirection: 'column',
};

// This includes an answer index, input, and a remove icon .
const indexAnswerIconContainer = {
  marginTop: '20px',
  display: 'flex',
  alignItems: 'center',
  position: 'relative',
};

const answerIndex = {
  position: 'absolute',
  top: '-5px',
  left: '-5px',
  fontSize: '1rem',
};
const removeIcon = {
  position: 'absolute',
  top: '-5px',
  right: '-8px',
  fontSize: '1.2rem',
  color: 'red',
  cursor: 'pointer',
  height: '25px',
};

const moreAnswerIcon = {
  fontSize: '1.2rem',
  fontFamily: "'Cormorant Garamond', serif",
  color: '#005bbb',
  padding: '5px 10px',
  marginTop: '20px',
  cursor: 'pointer',
  transition: '.3s',
  textAlign: 'center',
};

// const moreAnswerIconHover = {
//   fontSize: '1.2rem',
//   fontFamily: "'Cormorant Garamond', serif",
//   color: '#005bbb',
//   padding: '5px 10px',
//   marginTop: "20px",
//   cursor: 'pointer',
//   transition: '.3s',
//   textAlign: 'center',
//   opacity: ".7"
// };

const submitButton = {
  padding: '10px 18px',
  marginTop: '20px',
  borderRadius: '5px',
  border: 'none',
  width: '100%',
  cursor: 'pointer',
  transition: '.3s',
  background: 'none',
  color: '#005bbb',
  fontSize: '1.5rem',
  fontFamily: "'Cormorant Garamond', serif",
};

const submitButtonHover = {
  padding: '10px 18px',
  marginTop: '20px',
  borderRadius: '5px',
  border: 'none',
  width: '100%',
  cursor: 'pointer',
  transition: '.3s',
  background: '#ecf5ff',
  color: '#005bbb',
  fontSize: '1.5rem',
  fontFamily: "'Cormorant Garamond', serif",
};

export default QuizNewFormik;
