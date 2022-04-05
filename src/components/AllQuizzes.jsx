// ========== Import from third parties ==========
import { useState, useEffect } from 'react';
import {
  collection,
  onSnapshot,
  query,
  orderBy,
  doc,
  getDoc,
  where,
} from 'firebase/firestore';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';

// ========== Import from inside this project ==========
import { db } from '../config/firebase';
import { riEditBoxLine, riDeleteBinLine } from '../icons/icons';
import { handleQuizDelete } from '../hooks/quizCRUD';

// ========== Main ==========
const AllQuizzes = ({ uid }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState("");
  const [categories, setCategories] = useState([]);

  // useEffect(() => {
  //   GetAllQuizzes(quiqzzes={quizzes}, setQuizzes={setQuizzes});
  // })

  useEffect(() => {

    const collectionRef = collection(db, 'quizzes');
    if (searchByCategory !== '') {
      const q = query(collectionRef, orderBy('createdAt', 'desc'), where("category", "==", searchByCategory));
      const unsub = onSnapshot(q, {
        next: snapshot => {
          setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        },
        error: err => {
          // don't forget error handling! e.g. update component with an error message
          console.error('quizes listener failed: ', err);
        },
      });
    } else {
      const unsub = onSnapshot(collectionRef, {
        next: snapshot => {
          setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        },
        error: err => {
          // don't forget error handling! e.g. update component with an error message
          console.error('quizes listener failed: ', err);
        },
      });
    }

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

  }, [searchByCategory]);

  const handleSearchBar = e => {
    setSearchByCategory(e.target.value);
    console.log(searchByCategory);
  };

  return (
    <div className='allQuizzes'>
      <div className='searchContainer'>
        <span>Filter</span>
        <select
          name='category'
          onChange={handleSearchBar}
          className={
            searchByCategory !== '' 
              ? 'categorySearch notDefaultValue'
              : 'categorySearch'
          }
        >
          <option value=''>All</option>
          {categories.map(c => (
            <option key={c} value={c}>
              {c}
            </option>
          ))}
        </select>
      </div>
      {quizzes.length === 0 && (
        <div className='loading'>
          <Loading color={'#005bbb'} />
        </div>
      )}
      {quizzes.map((quiz, quizIndex) => (
        <div className='eachQuizContainer' key={quiz.id}>
          <div className='quizQuestionContainer'>
            <span className='quizIndex'>{quizIndex + 1}.</span>
            <p className='quizQuestion'>{quiz.question}</p>
          </div>

          {quiz.user.uid && uid === quiz.user.uid ? (
            <div className='icons'>
              <Link
                to={{ pathname: `/kinniku-quiz/edit/${quiz.id}` }}
                state={{ quiz: quiz }}
              >
                <i className='riEditBoxLine'>{riEditBoxLine}</i>
              </Link>
              <i
                className='riDeleteBinLine'
                onClick={() => handleQuizDelete(quiz.id)}
              >
                {riDeleteBinLine}
              </i>
            </div>
          ) : quiz.user.uid && uid !== quiz.user.uid ? (
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
          ) : null}
        </div>
      ))}
    </div>
  );
};

export default AllQuizzes;
