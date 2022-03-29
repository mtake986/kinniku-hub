
import { signOut } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";

import { auth } from '../config/firebase';
import "../styles/profile.css";

const Profile = ({user, setCurrentUser}) => {
  const {uid} = useParams();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(auth).then(() => {
      // console.log("SignOut Has Successfully Done!!!")
      setCurrentUser({})
      navigate("/");
    }).catch((err) => {
      console.log(err)
    })
  }
  
  return (
    <div id="profilePage">
      <div id="userInfo">
        <img src={user.photoURL} alt="Your Profile Picture" />
        <h4 className="username">{user.username}</h4>
        <h5 className="email">{user.email}</h5>
      </div>
      <button id="logOutBtn" onClick={handleSignOut}>Logout</button>
    </div>
  )
}

export default Profile