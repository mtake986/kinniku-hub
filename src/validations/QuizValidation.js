import * as yup from 'yup'

export const quizSchema = yup.object().shape({
  question: yup.string().min(10).max(255).required("required"), 
  answer1: yup.string().required("required"), 
  correctAnswer: yup.number("Type a number").min(1).max(4).required("required"), 
})

