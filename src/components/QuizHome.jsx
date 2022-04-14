import {
  collection,
  onSnapshot,
  query,
  orderBy,
  limit,
  getDocs,
  doc,
  getDoc,
} from 'firebase/firestore';
import { useEffect, useState } from 'react';
import { db } from '../config/firebase';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';

import QuizHomeStartBtn from './QuizHomeStartBtn';
import QuizzesList from './multiple/QuizzesList';

const QuizHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [QRCLoading, setQRCLoading] = useState(true);
  const [newUsersLoading, setNewUsersLoading] = useState(true);

  useEffect(() => {
    // todo: Get new quizzes
    const getNewQuizzes = async () => {
      const collectionRef = collection(db, 'quizzes');
      // don't order by likes because onSnapshot listens real time updates so it's gonna make a bug. Order it by something never changes such as id and createAt.
      const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(10));
      const unsub = onSnapshot(q, {
        next: snapshot => {
          setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
          setQRCLoading(false);
        },
        error: err => {
          // don't forget error handling! e.g. update component with an error message
          console.error('quizes listener failed: ', err);
        },
      });
      return unsub;
    };
    getNewQuizzes();

    // todo: Get 10 new users
    const getNewUsers = async () => {
      const usersCollectionRef = collection(db, 'users');
      const q = query(
        usersCollectionRef,
        orderBy('createdAt', 'desc'),
        limit(10)
      );
      let tempNewUsers = [];
      const newUsersSnapshot = await getDocs(q);

      newUsersSnapshot.forEach(doc => {
        // setNewUsers([doc.data()]);
        // console.log(doc.id, " => ", doc.data());
        tempNewUsers.push(doc.data());
        // console.log(tempNewUsers)
      });
      setNewUsers(tempNewUsers);
      setNewUsersLoading(false)
    };
    getNewUsers();

    // todo: Get categories an user wants to take a test from
    const getQuizCategory = async () => {
      const docRef = doc(db, 'quizCategory', 'quizCategoryCategories');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        console.log('Document data:', docSnap.data()['categories']);
        setCategories(docSnap.data()['categories']);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
      // console.log("I got all categories!! Here they are: " + categories)
    };
    getQuizCategory();
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

  return (
    <div id='quizHome'>
      <div className='testStartContainer'>
        <div className='textContainer'>
          <h3>Wanna Start A Test??</h3>
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
          {categories.length === 0 && (
            <div className='loading'>
              <Loading color={'#005bbb'} />
            </div>
          )}
          {categories.map(c => (
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
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
        <QuizHomeStartBtn selectedCategories={selectedCategories} />
      </div>

      <div className='quizRecentlyCreatedContainer'>
        <h3>Quizzes Recently Created</h3>
        <QuizzesList list={quizzes} kind='tenRecentlyCreatedQuizzes' nowLoading={QRCLoading} />
      </div>

      <div className='newUsersContainer'>
        <h3>Newbies</h3>
        <div className='newUsers'>
          {newUsersLoading ? (
            <div className='loading'>
              <Loading color={'#005bbb'} />
            </div>
          ) : (
            newUsers.map((user, userIndex) => (
              <div className='eachNewUserContainer' key={user.uid}>
                <Link
                  to={{ pathname: `/profile/${user.uid}` }}
                  state={{ user: user }}
                >
                  <img
                    src={user.photoURL}
                    alt={user.username}
                    referrerPolicy='no-referrer'
                  />
                </Link>
                <p className='newUserUsername'>{user.username}</p>
              </div>
            ))
          )}
        </div>
      </div>
    </div>
  );
};
export default QuizHome;
