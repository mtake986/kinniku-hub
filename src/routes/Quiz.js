
import { Routes, Route } from 'react-router-dom';

import Home from "../components/quiz/home/Home";
import All from "../components/quiz/all/All";
import Edit from "../components/quiz/new-edit/Edit";
import NewQuiz from "../components/quiz/new-edit/NewQuiz";
import Test from "../components/quiz/test/Test";

const Quiz = ({currentUser}) => {

  return (
    <Routes>

      <Route path="home" element={<Home />} />
      <Route path="new" element={<NewQuiz user={currentUser} />} />
      <Route
        path="test"
        element={<Test currentUser={currentUser === {} ? "Anonymous" : currentUser} />}
      />
      <Route
        path="all"
        element={
          <All
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
          <Edit />
        }
      />

    </Routes>

  )
}

export default Quiz;