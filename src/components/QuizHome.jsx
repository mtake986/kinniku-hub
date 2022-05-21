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
import { faTrophy } from '../icons/icons';
const QuizHome = () => {
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [isLoadingQuizzes, setIsLoadingQuizzes] = useState(false);
  const [isLoadingUsers, setIsLoadingUsers] = useState(false);


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
      console.log(docSnap.data()['categories'])
      if (docSnap.exists()) {
        setCategories(docSnap.data()['categories']);
        console.log("exist:", categories)
        setIsLoadingCategories(false);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
      // console.log("I got all categories!! Here they are: " + categories)
    };
    getQuizCategory();

    // todo: Get 10 users, 
    // 1. get all quizzes posted in the last 7 days and make a dictionary of users who posted those quizzes
    // 2. sort by most users who posts the quiz.
    // 3. get the top 10
    // 4. display the top 10
    const getTopTenUsers = async () => {
      setIsLoadingUsers(true);
      const usersCollectionRef = collection(db, 'users');
      const q = query(
        usersCollectionRef,
        limit(10)
      );
      const snapshot = await getDocs(q);
      setUsers(snapshot.docs.map(doc => doc.data()));
      setIsLoadingUsers(false);
    };
    getTopTenUsers();
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
          <h3>Start A Test</h3>
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
          ) : (
            categories.length === 0 ? (
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
            )
          )}
        </div>
        <QuizHomeStartBtn selectedCategories={selectedCategories} />
      </div>
      <div className='quizRecentlyCreatedContainer'>
        <h3>Quizzes Recently Created</h3>
        <div className='quizzes'>
        {isLoadingQuizzes ? (
            <div className='loading'>
              <Loading color={'#005bbb'} />
            </div>
          ) : (
            quizzes.length === 0 ? (
              <p>No quizzes</p>
            ) : (
              quizzes.map((quiz, quizIndex) => (
                <div className='eachQuizContainer' key={quiz.id}>
                  <div className='quizQuestionContainer'>
                    <span className='quizIndex'>{quizIndex + 1}.</span>
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
            )
          )}

        </div>
      </div>
      {isLoadingUsers ? (
        <div className='loading'>
          <Loading color={'#005bbb'} />
        </div>
      ) : (
        users.length === 0 ? (
          <div>No users</div>
        ) : (
          <div className='userRankingContainer'>
            <div className="top">
              <h3>User Ranking</h3>
              <select>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
                <option value="total">Total</option>
              </select>
            </div>
            <div className="usersContainer">
              {users.map((user, userIndex) => (
                <Link
                  to={{ pathname: `/profile/${user.uid}` }}
                  state={{ user: user }}
                  key={user.uid}
                >
                  <div className='userContainer' key={user.uid}>
                    <div className='userInfo'>
                      {userIndex === 0 ? (
                        <div className="userRankIcon first">{faTrophy}</div>
                      ) : userIndex === 1 ? (
                        <div className="userRankIcon second">{faTrophy}</div>
                      ) : userIndex === 2 ? (
                        <div className="userRankIcon third">{faTrophy}</div>
                      ) : (
                        userIndex + 1
                      )}
                      <div className="imgAndUsername">
                        <img
                          src={user.photoURL}
                          alt={user.username}
                          referrerPolicy='no-referrer'
                        />
                        <h6 className='username'>{user.username}</h6>
                      </div>
                    </div>
                    <div className="contributionContainer">
                      <span className="number">100</span>
                      <span className="text">Contributions</span>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        )
      )}
    </div>
  );
};
export default QuizHome;
