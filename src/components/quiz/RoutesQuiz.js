
import { Routes, Route } from 'react-router-dom';

import Home from "./home/Home";
import All from "./all/All";
import Edit from "./new-edit/Edit";
import NewQuiz from "./new-edit/NewQuiz";
import Test from "./test/Test";

const RoutesQuiz = ({currentUser}) => {

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

export default RoutesQuiz;