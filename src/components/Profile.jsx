
import { signOut } from "firebase/auth";
import { useParams, useNavigate } from "react-router-dom";

import { auth } from '../config/firebase';


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
    <div>
      <h4>Username: {user.username}</h4>
      <h4>Email: {user.email}</h4>
      <h4>User id: {user.uid}</h4>
      <h4>url: {user.photoURL}</h4>
      <img src={user.photoURL} />
      <button onClick={handleSignOut}>Sign out</button>
    </div>
  )
}

export default Profile