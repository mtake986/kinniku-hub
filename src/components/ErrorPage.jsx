import { useNavigate } from "react-router-dom";

const ErrorPage = () => {
  let navigate = useNavigate();
  return (
    <div>
      <h2>Error Page</h2>
      <button style={style} onClick={() => {navigate("/kinniku-quiz/home")}}>Go to Kinniku Quiz Home</button>
    </div>
  )
}

const style = {
  padding: "10px 20px",
  margin: "0 10px 10px 0",
  borderRadius: "5px",
  border: "1px solid white",
  background: "white",
  cursor: "pointer",
  fontSize: "1rem",
  transition: "0.3s",
}

export default ErrorPage