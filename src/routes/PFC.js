import { Routes, Route } from 'react-router-dom';
import Home from '../components/pfc/Home'
import Add from '../components/pfc/Add'
import Edit from '../components/pfc/Edit'
import All from '../components/pfc/All'



const PFC = () => {
  return (
    <Routes>
      <Route
        path="home"
        element={<Home />}
      />
      <Route
        path="all"
        element={<All />}
      />
      <Route
        path="add"
        element={<Add />}
      />
      <Route
        path="edit/:id"
        element={<Edit />}
      />
    </Routes>
  );
}

export default PFC