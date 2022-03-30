// Import from 3rd parties
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'

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
import AllQuizzes from "./components/AllQuizzes";
import FormikNewQuiz from "./components/FormikNewQuiz";
import { auth } from './config/firebase';


// Actual Coding
function App() {
  const [currentUser, setCurrentUser] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setCurrentUser({ username: user.displayName, uid: user.uid, email: user.email, photoURL: user.photoURL })
      } 
    })
  }, [])
  
  console.log(currentUser)


  return (
    <BrowserRouter>
      <Header user={currentUser} />
      <div id="main">
        <Routes>
          <Route path="/" element={<Home user={currentUser === {} ? "Anonymous" : currentUser} />} />
          {/* <Route path="about" element={<About />}/> */}
          <Route path="kinniku-quiz/" element={<QuizHome />}>
            <Route path="new" element={<FormikNewQuiz uid={currentUser === {} ? null : currentUser.uid} username={currentUser === {} ? null : currentUser.username} />} />
            <Route path="test" element={<Test />} />
            <Route path="all-quizzes" element={<AllQuizzes uid={currentUser === {} ? "" : currentUser.uid} />} />
            <Route path="edit/:id" element={<QuizEdit quiz={"quiz props!!"} />} />
          </Route>
          <Route path="profile/:uid" element={<Profile setCurrentUser={setCurrentUser} user={currentUser} />} />
          {/* <Route path="login" /> */}
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
