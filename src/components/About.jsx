import { useNavigate } from "react-router-dom";

const About = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h2>About</h2>
      <button onClick={() => {navigate("/")}}>Go Home</button>
    </div>
  )
}

export default About