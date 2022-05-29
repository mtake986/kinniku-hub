// Import from 3rd parties
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'

// Import files existing in this project
import './styles/Style.css';
import './styles/quiz.css';
import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";

import Test from "./components/quiz/Test";
import FixedNewQuizBtn from "./components/quiz/FixedNewQuizBtn";
import QuizEdit from "./components/quiz/QuizEdit";
// import About from "./components/quiz/About";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/quiz/Profile";
import QuizHome from "./components/quiz/QuizHome";
import AllQuizzes from "./components/quiz/AllQuizzes";
import QuizNewFormik from "./components/quiz/QuizNewFormik";
import { auth } from './config/firebase';


// Actual Coding
function App() {
  const [currentUser, setCurrentUser] = useState("Anonymous");
  // const [quizzes, setQuizzes] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setCurrentUser({ username: user.displayName, uid: user.uid, email: user.email, photoURL: user.photoURL })
      }
    })

    // const collectionRef = collection(db, 'quizzes');
    // const q = query(collectionRef, orderBy("createdAt", "desc"));
    // console.log(q)
    // const unsub = onSnapshot(q, {
    //   next: snapshot => {
    //     setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    //   },
    //   error: err => {
    //     console.error('quizes listener failed: ', err);
    //   },
    // });
    // return unsub;
  }, [])


  return (
    <BrowserRouter>
      <Header currentUser={currentUser} />
      <div id="bodyContainer">
        <Routes>
          {/* <Route path="/" element={<QuizHeader />} /> */}
          {/* <Route path="about" element={<About />}/> */}
          <Route path="kinniku-quiz/" element={<FixedNewQuizBtn />} >
            <Route
              path="home"
              element={<QuizHome />}
            />
            <Route
              path="new"
              element={
                <QuizNewFormik
                  user={currentUser}
                />
              }
            />
            <Route
              path="test"
              element={<Test currentUser={currentUser === {} ? "Anonymous" : currentUser} />}
            />
            <Route
              path="all-quizzes"
              element={
                <AllQuizzes
                  uid={currentUser === {}
                    ? ""
                    : currentUser.uid
                  }
                />
              }
            />
            <Route
              path="edit/:id"
              element={
                <QuizEdit />
              }
            />
          </Route>

          <Route
            path="profile/:uid"
            element={
              <Profile
                setCurrentUser={setCurrentUser}
                currentUser={currentUser}
              />
            }
          />
          <Route path="*" element={<ErrorPage />} />
        </Routes>
      </div>
      <Footer />

    </BrowserRouter>
  );
}

export default App;
