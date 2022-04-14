import { signOut } from 'firebase/auth';
import {
  collection,
  getDocs,
  orderBy,
  query,
  where,
  limit,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import Loading from 'react-simple-loading';

import { auth, db } from '../config/firebase';
import '../styles/profile.css';
import QuizzesList from './multiple/QuizzesList';

const Profile = ({ currentUser, setCurrentUser }) => {
  const navigate = useNavigate();
  const location = useLocation();
  const { user } = location.state;
  const [recentlyMadeQuizzes, setRecentlyMadeQuizzes] = useState([]);
  const [mostLikesQuizzes, setMostLikesQuizzes] = useState([]);
  const [quizzes, setQuizzes] = useState([]);
  const [nowLoading, setNowLoading] = useState(true);

  useEffect(() => {
    const getQuizzesByThisUser = async () => {
      console.log(nowLoading, 'start');
      const collectionRef = collection(db, 'quizzes');
      let tempRQ = [];
      let tempLQ = [];
      let tempAllQ = [];
      const r = query(
        collectionRef,
        where('user.username', '==', user.username),
        orderBy('createdAt', 'desc'),
        limit(5)
      );
      const l = query(
        collectionRef,
        where('user.username', '==', user.username),
        orderBy('likes', 'desc'),
        limit(5)
      );
      const all = query(
        collectionRef,
        where('user.username', '==', user.username)
      );
      const querySnapshotR = await getDocs(r);
      const querySnapshotL = await getDocs(l);
      const querySnapshotAll = await getDocs(all);
      console.log('============= getQuizzesByThisUser');
      querySnapshotR.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        tempRQ.push({ ...doc.data(), id: doc.id });
      });
      querySnapshotL.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        tempLQ.push({ ...doc.data(), id: doc.id });
      });
      querySnapshotAll.forEach(doc => {
        // doc.data() is never undefined for query doc snapshots
        console.log(doc.id, ' => ', doc.data());
        tempAllQ.push({ ...doc.data(), id: doc.id });
      });
      setRecentlyMadeQuizzes(tempRQ);
      setMostLikesQuizzes(tempLQ);
      setQuizzes(tempAllQ);
      console.log(recentlyMadeQuizzes, mostLikesQuizzes, quizzes);
      setNowLoading(false);
      console.log(nowLoading, 'end');
    };
    getQuizzesByThisUser();
    console.log(recentlyMadeQuizzes, mostLikesQuizzes, quizzes);
  }, []);
  console.log(recentlyMadeQuizzes, mostLikesQuizzes, quizzes);

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
      <div className='userCard'>
        <div className='userInfo'>
          <img
            src={user.photoURL}
            alt={user.username}
            referrerPolicy='no-referrer'
          />
          <h4 className='username'>{user.username}</h4>
          <h5 className='email'>{user.email}</h5>
          <p className='numberOfQuizzes'>
            Has Made <span>{quizzes.length}</span> Quizzes
          </p>
        </div>
        {user.uid === currentUser.uid && (
          <button id='logOutBtn' onClick={handleSignOut}>
            Logout
          </button>
        )}
      </div>

      <div className='contributionContainer'>
        <div className='LMQContainer'>
          <h3>Recently Made</h3>
          <QuizzesList
            list={recentlyMadeQuizzes}
            kind='RMQs'
            nowLoading={nowLoading}
          />
        </div>

        <div className='MLQContainer'>
          <h3>Most Likes</h3>
          <QuizzesList
            list={mostLikesQuizzes}
            kind='MLQs'
            nowLoading={nowLoading}
          />
        </div>
      </div>
    </div>
  );
};

export default Profile;
