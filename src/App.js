// Import from 3rd parties
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'

// Import files existing in this project
import './styles/Style.css';
import './styles/quiz.css';

import Header from "./components/header/Header";
import Footer from "./components/footer/Footer";
import Quiz from './routes/Quiz';
import PFC from './routes/PFC';
import Profile from "./components/Profile";
import ErrorPage from "./components/ErrorPage";

import { auth } from './config/firebase';

// =========== Main ===========

function App() {
  const [currentUser, setCurrentUser] = useState("Anonymous");

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
          <Route path="/kinniku-quiz/*" element={<Quiz currentUser={currentUser} setCurrentUser={setCurrentUser} />} />
          <Route path="/pfc/*" element={<PFC />} />
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
