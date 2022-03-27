import * as Yup from 'yup';

export const quizSchema = Yup.object().shape({
  question: Yup.string()
    .min(10, 'Too Short!')
    .max(100, 'Too Long!')
    .required('Required'),
  answers: Yup.array()
    .of(Yup.string().max(30, 'Too Long!').required('Required'))
    .unique('Duplicate answers are not allowed')
    .min(2, `Minimum of 2 answers`),
  correctAnswer: Yup.number('only numbers are allowed')
    .min(1, 'type more than 1 please')
    .max(4, 'type less than 5')
    .required('Required'),
  category: Yup.string().required('Required'),
  createdAt: Yup.date(),
  likes: Yup.number(),
});