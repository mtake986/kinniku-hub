import { Routes, Route } from 'react-router-dom';
import Home from './Home'
import Add from './Add'
import Edit from './Edit'
import All from './All'



const RoutesPFC = () => {
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

export default RoutesPFC