// Import from 3rd parties
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { useEffect, useState } from 'react';
import { onAuthStateChanged } from 'firebase/auth'
import { collection, onSnapshot, where, query, orderBy, limit } from 'firebase/firestore';
import { addDoc, getDocs } from "firebase/firestore"

// Import files existing in this project
import './styles/Style.css';
import './styles/quiz.css';
import Header from "./components/Header";
import Footer from "./components/Footer";

import Test from "./components/Test";
import QuizHeader from "./components/QuizHeader";
import QuizEdit from "./components/QuizEdit";
// import About from "./components/About";
import ErrorPage from "./components/ErrorPage";
import Profile from "./components/Profile";
import QuizHome from "./components/QuizHome";
import AllQuizzes from "./components/AllQuizzes";
import FormikNewQuiz from "./components/FormikNewQuiz";
import { auth, db } from './config/firebase';


// Actual Coding
function App() {
  const [currentUser, setCurrentUser] = useState({});
  const [users, setUsers] = useState();
  const [quizzes, setQuizzes] = useState({});

  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user !== null) {
        setCurrentUser({ username: user.displayName, uid: user.uid, email: user.email, photoURL: user.photoURL })
      }
    })
    const collectionRef = collection(db, 'quizzes');
    const q = query(collectionRef, orderBy("likes", "desc"));
    console.log(q)
    const unsub = onSnapshot(q, {
      next: snapshot => {
        setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      },
      error: err => {
        console.error('quizes listener failed: ', err);
      },
    });

    const userCollectionRef = collection(db, 'users');

    let userExistance = false;
    console.log(userExistance)

    const checkUserExists = async () => {
      const querySnapshot = await getDocs(userCollectionRef);
      querySnapshot.forEach( (doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        console.log(`currentUser.uid => ${currentUser.uid}`)
        if (doc.data().uid === currentUser.uid) {
          userExistance = true;
          return;
        }
      });
      console.log(userExistance)
      if (userExistance === false) {
        console.log('userExistance is false flsalesfhiovahvoian kfadoseifhnvose')
        const addUser = async (currentUser) => {
          console.log(currentUser)
          if (currentUser) {
            await addDoc(userCollectionRef, {
              username: currentUser.username,
              uid: currentUser.uid,
              email: currentUser.email,
              photoURL: currentUser.photoURL,
              createdAt: new Date(),
              bio: "biography",
            });
          }
        }
        addUser(currentUser);
      }
    }
    checkUserExists();




    return unsub;
  }, [])

  console.log(currentUser)
  console.log(quizzes)

  return (
    <BrowserRouter>
      <Header currentUser={currentUser} />
      <div id="main">
        <Routes>
          {/* <Route path="/" element={<QuizHeader />} /> */}
          {/* <Route path="about" element={<About />}/> */}
          <Route path="kinniku-quiz/" element={<QuizHeader />} >
            <Route
              path="home"
              element={<QuizHome />}
            />
            <Route
              path="new"
              element={
                <FormikNewQuiz
                  user={currentUser}
                />
              }
            />
            <Route
              path="test"
              element={<Test />}
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
                <QuizEdit
                  quiz={"quiz props!!"}
                />
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
