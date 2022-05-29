import {
  collection,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
  where,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';

import QuizHomeStartBtn from './QuizHomeStartBtn';
import SelectMaxTestLength from './SelectMaxTestLength';

import { faTrophy } from '../icons/icons';
const QuizHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [rankingUsers, setRankingUsers] = useState([]);

  // Loading useState()
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);
  const [maxTestLength, setMaxTestLength] = useState(10);

  useEffect(() => {
    // todo: Get new quizzes
    const getNewQuizzes = async () => {
      setIsLoadingQuizzes(true);
      const collectionRef = collection(db, 'quizzes');
      // don't order by likes because onSnapshot listens real time updates so it's gonna make a bug. Order it by something never changes such as id and createAt.
      const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(10));
      const snapshot = await getDocs(q);
      setQuizzes(snapshot.docs.map(doc => doc.data()));
      setIsLoadingQuizzes(false);
    };
    getNewQuizzes();

    // todo: Get categories an user wants to take a test from
    const getQuizCategory = async () => {
      setIsLoadingCategories(true);
      const docRef = doc(db, 'quizCategory', 'quizCategoryCategories');
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        setCategories(docSnap.data()['categories']);
        setIsLoadingCategories(false);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
      // console.log("I got all categories!! Here they are: " + categories)
    };
    getQuizCategory();
    getTopTenActiveUsers('weekly', 7);
  }, []);

  const selectCategory = e => {
    if (e.target.value === 'all') {
      if (selectedCategories.includes(e.target.value)) {
        console.log('includes this value');
        let filtered = selectedCategories.filter(n => n !== e.target.value);
        setSelectedCategories(filtered);
      } else {
        setSelectedCategories(['all']);
      }
    } else {
      if (selectedCategories.length !== 0) {
        console.log('not empty', selectedCategories);
        if (selectedCategories.includes(e.target.value)) {
          console.log('includes this value');
          let filtered = selectedCategories.filter(n => n !== e.target.value);
          setSelectedCategories(filtered);
        } else {
          setSelectedCategories([...selectedCategories, e.target.value]);
        }
      } else {
        setSelectedCategories([e.target.value]);
      }
    }
  };

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

  const handleSwitchLy = e => {
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
    <div id='quizHome'>
      <div className='testStartContainer'>
        <div className='sectionHeader'>
          <h3>Start A Test</h3>
          <SelectMaxTestLength
            maxTestLength={maxTestLength}
            setMaxTestLength={setMaxTestLength}
          />
        </div>
        <div className='btnsContainer'>
          <button
            className={
              selectedCategories.includes('all') ? 'all selected' : 'all'
            }
            onClick={e => selectCategory(e)}
            value='all'
          >
            All
          </button>
          {isLoadingCategories ? (
            <div className='loading'>
              <Loading color={'#005bbb'} />
            </div>
          ) : categories.length === 0 ? (
            <p>No categories</p>
          ) : (
            categories.map((c, index) => (
              <button
                className={
                  selectedCategories.includes(c)
                    ? 'selected'
                    : selectedCategories.includes('all')
                    ? 'allSelected'
                    : null
                }
                onClick={e => selectCategory(e)}
                value={c}
                key={index}
              >
                {c}
              </button>
            ))
          )}
        </div>
        <QuizHomeStartBtn selectedCategories={selectedCategories} maxTestLength={maxTestLength} />
      </div>
      <div className='quizRecentlyCreatedContainer'>
        <div className='sectionHeader'>
          <h3>Quizzes Recently Created</h3>
        </div>
        <div className='quizzes'>
          {isLoadingQuizzes ? (
            <div className='loading'>
              <Loading color={'#005bbb'} />
            </div>
          ) : quizzes.length === 0 ? (
            <p>No quizzes</p>
          ) : (
            quizzes.map((quiz, index) => (
              <div className='eachQuizContainer' key={index}>
                <div className='quizQuestionContainer'>
                  <span className='quizIndex'>{index + 1}.</span>
                  <p className='quizQuestion'>{quiz.question}</p>
                </div>
                {quiz.user.uid ? (
                  <Link
                    to={{ pathname: `/profile/${quiz.user.uid}` }}
                    state={{ user: quiz.user }}
                  >
                    <img
                      src={quiz.user.photoURL}
                      alt={quiz.user.username}
                      referrerPolicy='no-referrer'
                    />
                  </Link>
                ) : null}
              </div>
            ))
          )}
        </div>
      </div>
      <div className='userRankingContainer'>
        <div className='sectionHeader'>
          <h3>User Ranking</h3>
          <select onChange={handleSwitchLy}>
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
    </div>
  );
};
export default QuizHome;
