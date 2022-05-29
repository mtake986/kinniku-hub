import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  where,
} from 'firebase/firestore';
import Loading from 'react-simple-loading';

import { db } from '../../../config/firebase';
import { faTrophy } from '../../../icons/icons';

const UserRanking = () => {
  // const [isLoadingUsers, setIsLoadingUsers] = useState(false);

  const [rankingUsers, setRankingUsers] = useState([]);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  useEffect(() => {
    getTopTenActiveUsers('weekly', 7);
  }, []);
  const getTopTenActiveUsers = async (kind, daysAgo) => {
    // todo: Get 10 users,
    // 1. get all quizzes posted in the last 7 days and make a dictionary of users who posted those quizzes
    // 2. get the top 10
    // 3. sort by most users who posts the quiz.

    // 1.
    setIsLoadingUsers(true);
    const date = new Date();
    date.setDate(date.getDate() - daysAgo);

    const collectionRef = collection(db, 'quizzes');
    let q;
    if (kind === 'total') {
      q = query(collectionRef, orderBy('createdAt', 'desc'));
    } else {
      q = query(
        collectionRef,
        orderBy('createdAt', 'desc'),
        where('createdAt', '>', date)
      );
    }
    const snapshot = await getDocs(q);

    // Make a dict with a key of uid and value of the number of quizzes posted in the last 7 days by the uid
    let obj = {};
    snapshot.docs.map(doc => {
      const uid = doc.data().user['uid'];
      if (uid !== undefined) {
        if (uid in obj) {
          obj[uid] += 1;
        } else {
          obj = { ...obj, [uid]: 1 };
        }
      }
    });

    // 2.
    const getUsers = async () => {
      console.log('============= get toptenusers =============');
      const usersCollectionRef = collection(db, 'users');
      const q = query(
        usersCollectionRef,
        limit(10),
        where('uid', 'in', Object.keys(obj))
      );
      const snapshot = await getDocs(q);
      const users = snapshot.docs.map(doc => doc.data());
      users.map(user => {
        user['posts'] = obj[user['uid']];
      });
      // 3.
      users.sort((a, b) => b.posts - a.posts);
      setRankingUsers(users);
      setIsLoadingUsers(false);
    };
    getUsers();
  };

  const selectTerm = e => {
    if (e.target.value === 'weekly') {
      console.log(e.target.value);
      getTopTenActiveUsers('weekly', 7);
    } else if (e.target.value === 'monthly') {
      console.log(e.target.value);
      getTopTenActiveUsers('monthly', 28);
    } else {
      console.log(e.target.value);
      getTopTenActiveUsers('all', 9999);
    }
  };

  return (
    <div className='userRankingContainer'>
      <div className='sectionHeader'>
        <h3>User Ranking</h3>
        <select onChange={selectTerm}>
          <option value='weekly'>Weekly</option>
          <option value='monthly'>Monthly</option>
          <option value='total'>Total</option>
        </select>
      </div>
      {isLoadingUsers ? (
        <div className='loading'>
          <Loading color={'#005bbb'} />
        </div>
      ) : rankingUsers.length === 0 ? (
        <div>No users</div>
      ) : (
        <div className='usersContainer'>
          {rankingUsers.map((user, userIndex) => (
            <Link
              to={{ pathname: `/profile/${user.uid}` }}
              state={{ user: user }}
              key={user.uid}
            >
              <div className='userContainer' key={user.uid}>
                <div className='userInfo'>
                  {userIndex === 0 ? (
                    <div className='userRankIcon first'>{faTrophy}</div>
                  ) : userIndex === 1 ? (
                    <div className='userRankIcon second'>{faTrophy}</div>
                  ) : userIndex === 2 ? (
                    <div className='userRankIcon third'>{faTrophy}</div>
                  ) : (
                    <div className='userRankIcon lowerThanThird'>
                      {userIndex + 1}
                    </div>
                  )}
                  <div className='imgAndUsername'>
                    <img
                      src={user.photoURL}
                      alt={user.username}
                      referrerPolicy='no-referrer'
                    />
                    <h6 className='username'>{user.username}</h6>
                  </div>
                </div>
                <div className='contributionContainer'>
                  <span className='number'>{user.posts}</span>
                  <span className='text'>Posts</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      )}
    </div>
  )
}

export default UserRanking