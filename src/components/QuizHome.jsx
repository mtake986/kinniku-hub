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

const QuizHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [newUsers, setNewUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    const collectionRef = collection(db, 'quizzes');
    const q = query(collectionRef, orderBy('createdAt', 'desc'), limit(5));
    const unsub = onSnapshot(q, {
      next: snapshot => {
        setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      },
      error: err => {
        // don't forget error handling! e.g. update component with an error message
        console.error('quizes listener failed: ', err);
      },
    });

    const usersCollectionRef = collection(db, 'users');
    let tempNewUsers = [];
    const getNewUsers = async () => {
      const newUsersSnapshot = await getDocs(usersCollectionRef);
      newUsersSnapshot.forEach(doc => {
        // setNewUsers([doc.data()]);
        // console.log(doc.id, " => ", doc.data());
        tempNewUsers.push(doc.data());
        // console.log(tempNewUsers)
      });
      setNewUsers(tempNewUsers);
      // console.log(newUsers)
    };
    getNewUsers();

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

    return unsub;
  }, []);

  const selectCategory = e => {
    if (selectedCategories.length !== 0) {
      console.log('not empty');
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
  };

  return (
    <div id='quizHome'>
      <div className='testStartContainer'>
        <div className='textContainer'>
          <h3>Wanna Start A Test??</h3>
        </div>
        <div className='selectBtnsContainer'>
          {categories.length === 0 ? <Loading color={'#005bbb'} /> : ''}
          {categories.map(c => (
            <button
              className={selectedCategories.includes(c) ? 'selected' : null}
              onClick={e => selectCategory(e)}
              value={c}
              key={c}
            >
              {c}
            </button>
          ))}
        </div>
        <QuizHomeStartBtn
          selectedCategories={selectedCategories}
        />
      </div>
      <div className='quizRecentlyCreatedContainer'>
        <h3>Quizzes Recently Created</h3>
        <div className='quizzes'>
          {quizzes.length === 0 ? <Loading color={'#005bbb'} /> : ''}
          {quizzes.map((quiz, quizIndex) => (
            <div className='eachQuizContainer' key={quiz.id}>
              <div className='quizQuestionContainer'>
                <span className='quizIndex'>{quizIndex + 1}.</span>
                <p className='quizQuestion'>{quiz.question}</p>
              </div>
              <Link
                to={{ pathname: `/profile/${quiz.user.uid}` }}
                state={{ user: quiz.user }}
              >
                <img
                  src={quiz.user.photoURL}
                  alt='Profile Picture'
                  referrerPolicy='no-referrer'
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className='newUsersContainer'>
        <h3>Newbies</h3>
        <div className='newUsers'>
          {newUsers.length === 0 ? <Loading color={'#005bbb'} /> : ''}
          {newUsers.map((user, userIndex) => (
            <div className='eachNewUserContainer' key={user.uid}>
              <Link
                to={{ pathname: `/profile/${user.uid}` }}
                state={{ user: user }}
              >
                <img
                  src={user.photoURL}
                  alt='Profile Picture'
                  referrerPolicy='no-referrer'
                />
              </Link>
              <p className='newUserUsername'>{user.username}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};
export default QuizHome;
