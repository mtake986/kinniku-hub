// Import from 3rd parties
import { collection, getDocs } from "firebase/firestore"; 
import { BrowserRouter, Routes, Route, Link, Outlet } from 'react-router-dom';

// Import files existing in this project
import './styles/Style.css';
import Quiz from "./components/Quiz";
import Home from "./components/Home";
import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile";
import NewQuiz from "./components/NewQuiz";
import QuizHome from "./components/QuizHome";
import Header from "./components/Header";

// Actual Coding
function App() {
  return (
    <BrowserRouter>
      <Header />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home />}/>
          <Route path="about" element={<About />}/>
          <Route path="quiz-home" element={<QuizHome />}>
            <Route path="new" element={<NewQuiz />} />
            <Route path="quiz" element={<Quiz />} />
          </Route> 
          <Route path="profile/:userId" element={<Profile />}/>
          <Route path="*" element={<ErrorPage />}/>
        </Routes>
      </div>
      <footer>
        &copy; Masahiro Takechi 2022
      </footer>
    </BrowserRouter>
  );
}

export default App;
