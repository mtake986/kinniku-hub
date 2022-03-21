import { useState } from 'react';
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';

import FormInputText from './FormInputText';
import FormInputSelect from './FormInputSelect';
import db from '../firebaseConfig';

const NewQuiz = () => {
  const [values, setValues] = useState({
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: 0,
    createdAt: '',
    category: ""
  });

  const inputs = [
    {
      id: 1,
      name: 'question',
      type: 'text',
      placeholder: 'question',
      label: 'question',
    },
    {
      id: 2,
      name: 'answer1',
      type: 'text',
      placeholder: 'answer1',
      label: 'answer1',
    },
    {
      id: 3,
      name: 'answer2',
      type: 'text',
      placeholder: 'answer2',
      label: 'answer2',
    },
    {
      id: 4,
      name: 'answer3',
      type: 'text',
      placeholder: 'answer3',
      label: 'answer3',
    },
    {
      id: 5,
      name: 'answer4',
      type: 'text',
      placeholder: 'answer4',
      label: 'answer4',
    },
    {
      id: 6,
      name: 'correctAnswer',
      type: 'text',
      placeholder: 1,
      label: 'correctAnswer',
    },
    {
      id: 7,
      name: 'category',
      label: 'category',
    },
  ];

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    // const quizRef = doc(db, 'quizzes', 'category');
    // await setDoc(quizRef, payload);
    e.preventDefault();
    const quizCollectionRef = collection(db, 'quizzes');
    const payload = {
      question: values['question'],
      answers: [
        values['answer1'],
        values['answer2'],
        values['answer3'],
        values['answer4'],
      ],
      correctAnswer: parseInt(values['correctAnswer']),
      likes: 0,
      createdAt: new Date(),
      category: values['category']
    };
    await addDoc(quizCollectionRef, payload);

    setValues({
      question: '',
      answer1: '',
      answer2: '',
      answer3: '',
      answer4: '',
      correctAnswer: 0,
      createdAt: '',
      category: ""
    })
  };

  console.log(values);

  return (
    <form action='' className='quizForm' onSubmit={handleSubmit}>
      {inputs.map((input, i) => {
        if (input["type"] === "text") {
          return (
            <FormInputText
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          )
        } else {
          return (
            <FormInputSelect
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          )
        }
      })}
      <button>Submit</button>
    </form>
  );
};

export default NewQuiz;
