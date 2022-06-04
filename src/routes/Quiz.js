
import { Routes, Route } from 'react-router-dom';

import Home from "../components/quiz/home/Home";
import All from "../components/quiz/all/All";
import Edit from "../components/quiz/new-edit/Edit";
import NewQuiz from "../components/quiz/new-edit/NewQuiz";
import Test from "../components/quiz/test/Test";
import QuizResultWindow from '../components/quiz/test/QuizResultWindow';

const Quiz = ({currentUser}) => {

  return (
    <Routes>

      <Route path="home" element={<Home />} />
      <Route path="new" element={<NewQuiz user={currentUser} />} />
      <Route
        path="test"
        element={<Test currentUser={currentUser === {} ? "Anonymous" : currentUser} />}
      >
      </Route>
      {/* Don't know why I got an error if I moved this route into test Route.  */}
      <Route path="test/result" element={<QuizResultWindow />} />
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