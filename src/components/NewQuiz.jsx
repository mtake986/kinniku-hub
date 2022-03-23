import { useState } from 'react';
import { collection, setDoc, doc, addDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import FormInputText from './FormInputText';
import FormInputSelect from './FormInputSelect';
import db from '../config/firebase';

const NewQuiz = () => {
  // const navigate = useNavigate();
  // navigate("/kinniku-quiz/new")
  const [values, setValues] = useState({
    question: '',
    answer1: '',
    answer2: '',
    answer3: '',
    answer4: '',
    correctAnswer: 0,
    createdAt: '',
    category: '',
  });
  const [noValidate, setNoValidate] = useState(true)
  const [focused, setFocused] = useState(false);

  const inputs = [
    {
      id: 1,
      name: 'question',
      type: 'text',
      placeholder: 'Is protein powder white happy magical snow??',
      label: 'Question',
      required: true,
      err: 'Allowed to type only A ~ Z, a ~ z, 0 ~ 9 and 10 to 255 letters',
      pattern: '^[A-Za-z0-9 ]{10,255}$',
    },
    {
      id: 2,
      name: 'answer1',
      type: 'text',
      placeholder: 'No',
      label: 'Answer 1',
      required: true,
      err: 'Allowed to type only A ~ Z, a ~ z, 0 ~ 9 and 10 to 255 letters',
      pattern: '^[A-Za-z0-9 ]{0,30}$',
    },
    {
      id: 3,
      name: 'answer2',
      type: 'text',
      placeholder: 'Yes',
      label: 'Answer 2',
      required: true,
      err: 'Allowed to type only A ~ Z, a ~ z, 0 ~ 9 and 10 to 255 letters',
      pattern: '^[A-Za-z0-9 ]{0,30}$',
    },
    {
      id: 4,
      name: 'answer3',
      type: 'text',
      placeholder: 'Maybe',
      label: 'Answer 3',
      err: 'Allowed to type only A ~ Z, a ~ z, 0 ~ 9 and 10 to 255 letters',
      pattern: '^[A-Za-z0-9 ]{0,30}$',
    },
    {
      id: 5,
      name: 'answer4',
      type: 'text',
      placeholder: 'Tqm',
      label: 'Answer 4',
      err: 'Allowed to type only A ~ Z, a ~ z, 0 ~ 9 and 10 to 255 letters',
      pattern: '^[A-Za-z0-9 ]{0,30}$',
    },
    {
      id: 6,
      name: 'correctAnswer',
      type: 'text',
      placeholder: '',
      label: 'Correct Answer',
      required: true,
      err: 'Allowed to type only 1 ~ 4',
      pattern: '^[1-4]{0,1}$',
    },
    {
      id: 7,
      name: 'category',
      err: 'Select a category this quiz belongs to.',
      label: 'Category',
    },
  ];

  function SubmitButton() {
    const category = document.getElementById('Category');

    if (
      values['question'] &&
      values['answer1'] &&
      values['answer2'] &&
      values['answer3'] &&
      values['answer4'] &&
      values['correctAnswer'] &&
      category.selectedIndex !== 0
    ) {
      return <button type='submit'>Submit</button>;
    } else {
      return (
        <button type='submit' disabled>
          Submit
        </button>
      );
    }
  }

  const onChange = e => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    setFocused(false);
    console.log(focused)
    // const quizRef = doc(db, 'quizzes', 'category');
    // await setDoc(quizRef, payload);
    e.preventDefault();
    console.log('handlesubmit');

    // When all validatations are fine.
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
      category: values['category'],
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
      category: '', // how to set it to default value
    });


  };

  console.log(values);

  return (
    <form action='' className='quizForm' onSubmit={handleSubmit}>
      {inputs.map((input, i) => {
        if (input['type'] === 'text' || input['type'] === 'number') {
          return (
            <FormInputText
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
              focused={focused}
              setFocused={setFocused}
            />
          );
        } else {
          return (
            <FormInputSelect
              key={input.id}
              {...input}
              value={values[input.name]}
              onChange={onChange}
            />
          );
        }
      })}
      <SubmitButton />
    </form>
  );
};

export default NewQuiz;
