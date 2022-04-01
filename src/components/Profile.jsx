import { signOut } from 'firebase/auth';
import { useNavigate, useParams, useLocation } from 'react-router-dom';

import { auth } from '../config/firebase';
import '../styles/profile.css';

const Profile = ({ currentUser, setCurrentUser }) => {
  const {uid} = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = location.state;
  // console.log(user)

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {
        // console.log("SignOut Has Successfully Done!!!")
        setCurrentUser({});
        navigate('/kinniku-quiz/home');
      })
      .catch(err => {
        console.log(err);
      });
  };

  return (
    <div id='profilePage'>
      <div id='userInfo'>
        <img
          src={user.photoURL}
          alt='Your Profile Picture'
          referrerPolicy='no-referrer'
        />
        <h4 className='username'>{user.username}</h4>
        <h5 className='email'>{user.email}</h5>
      </div>
      {user.uid === currentUser.uid && (
        <button id='logOutBtn' onClick={handleSignOut}>
          Logout
        </button>
      )}
    </div>
  );
};

export default Profile;
