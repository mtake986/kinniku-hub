// Import from 3rd parties
import { BrowserRouter, Routes, Route } from 'react-router-dom';

// Import files existing in this project
import './styles/Style.css';
import './styles/quiz.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

import Test from "./components/Test";
import Home from "./components/Home";
import QuizEdit from "./components/QuizEdit";
// import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile";
import QuizHome from "./components/QuizHome";
import QuizSelect from "./components/QuizSelect";
import AllQuizzes from "./components/AllQuizzes";
import FormikNewQuiz from "./components/FormikNewQuiz";


// Actual Coding
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />} />
          {/* <Route path="about" element={<About />}/> */}
          <Route path="kinniku-quiz/" element={<QuizHome />}>
            <Route path="new" element={<FormikNewQuiz />} />
            <Route path="test" element={<Test />} />
            <Route path="all-quizzes" element={<AllQuizzes />} />
            <Route path="edit/:id" element={<QuizEdit quiz={"quiz props!!"}/>} />
          </Route>
          <Route path="profile/:userId" element={<Profile />} />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
