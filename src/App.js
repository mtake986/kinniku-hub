
import { collection, getDocs } from "firebase/firestore"; 

import './Style.css';
import CreateQuestion from './components/CreateQuestion';
import Quiz from "./components/Quiz";


function App() {

  return (
    <div className="App">
      <CreateQuestion />
      <Quiz />
    </div>
  );
}

export default App;
