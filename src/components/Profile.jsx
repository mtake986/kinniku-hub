import { signOut } from 'firebase/auth';
import { collection, getDocs, query, where } from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';

import { auth, db } from '../config/firebase';
import '../styles/profile.css';

const Profile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const {user} = location.state;
  const [numberOfQuizzes, setNumberOfQuizzes] = useState();
  
  useEffect(() => {
    const getNumberOfQuizzesByThisUser = async () => {
      const collectionRef = collection(db, 'quizzes');
      let tempQuizzes = [];
      const q = query(collectionRef, where("user.username", "==", user.username))
      const querySnapshot = await getDocs(q);
      querySnapshot.forEach((doc) => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, " => ", doc.data());
        tempQuizzes.push({ ...doc.data(), id: doc.id });
      })
      setNumberOfQuizzes(tempQuizzes.length);
    }
    getNumberOfQuizzesByThisUser()
  }, [user.username])

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
      <div className="userCard">
        <div className='userInfo'>
          <img
            src={user.photoURL}
            alt={user.username}
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

      <div className="contributionContainer">
        <h4 className="ctrTxt">Contribution</h4>
        <ul>
          <li className="make">Make: <span>{numberOfQuizzes}</span></li>
        </ul>
      </div>
    </div>
  );
};

export default Profile;
