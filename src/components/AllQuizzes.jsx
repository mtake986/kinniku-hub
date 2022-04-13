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
  startAfter,
  limit,
  getDocs,
} from 'firebase/firestore';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';

// ========== Import from inside this project ==========
import { db } from '../config/firebase';
import { riEditBoxLine, riDeleteBinLine } from '../icons/icons';
import { handleQuizDelete } from '../hooks/quizCRUD';
import SearchByTag from '../components/SearchByTag';
import SearchByCategory from '../components/SearchByCategory';

// ========== Main ==========
const AllQuizzes = ({ uid }) => {
  const [quizzes, setQuizzes] = useState("");
  const [searchByCategory, setSearchByCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchByTag, setSearchByTag] = useState('');
  const [searchByTagSubmitted, setSearchByTagSubmitted] = useState(false);

  // useEffect(() => {
  //   GetAllQuizzes(quiqzzes={quizzes}, setQuizzes={setQuizzes});
  // })

  useEffect(() => {
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

    const collectionRef = collection(db, 'quizzes');
    if (searchByCategory !== '') {
      if (searchByTag !== '' && searchByTagSubmitted === true) {
        console.log(`========== both inputs are not empty (category => tag):`, searchByCategory, searchByTag);
        let q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          where('category', '==', searchByCategory), 
          where('tags', 'array-contains', searchByTag)
        );
        getQuizzes(q);
      } else {
        console.log(`========== only CATEGORY is not empty:`, searchByCategory, searchByTag);
        let q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          where('category', '==', searchByCategory), 
        );
        getQuizzes(q);
      }
    } else if (searchByTagSubmitted === true) {
      if (searchByCategory !== '') {
        console.log(`========== both inputs are not empty (tag => category):`, searchByCategory, searchByTag);
        let q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          where('category', '==', searchByCategory), 
          where('tags', 'array-contains', searchByTag)
        );
        getQuizzes(q);
      } else {
        console.log(`========== only TAG is not empty:`, searchByCategory, searchByTag);
        let q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          where('tags', 'array-contains', searchByTag)
        );
        getQuizzes(q);
      }
    } else {
      getQuizzes(collectionRef);
    }
  }, [searchByCategory, searchByTagSubmitted]);

  const getQuizzes = async (ref) => {
    let tempQuizzes = [];
    const querySnapshot = await getDocs(ref);
    querySnapshot.forEach((doc) => {
      // doc.data() is never undefined for query doc snapshots
      // console.log(doc.id, " => ", doc.data());
      tempQuizzes.push({ ...doc.data(), id: doc.id });
    });
    setQuizzes(tempQuizzes)
    console.log(quizzes, 1234)
  }

  const handleSearchByCategory = e => {
    setSearchByCategory(e.target.value);
    console.log(searchByCategory);
  };
  const handleSearchByTag = e => {
    setSearchByTag(e.target.value);
    console.log(searchByTag);
    setSearchByTagSubmitted(false)
  };

  return (
    <div className='allQuizzes'>
      <div className='searchContainer'>
        <span>Filter</span>
        <div className='inputs'>
          <SearchByCategory
            handleSearchByCategory={handleSearchByCategory}
            searchByCategory={searchByCategory}
            categories={categories}
          />
          <SearchByTag
            handleSearchByTag={handleSearchByTag}
            searchByTag={searchByTag}
            searchByTagSubmitted={searchByTagSubmitted}
            setSearchByTagSubmitted={setSearchByTagSubmitted}
          />
        </div>
      </div>
      {quizzes === "" ? (
        <div className='loading'>
          <Loading color={'#005bbb'} />
        </div>
      ) : (
        quizzes.map((quiz, quizIndex) => (
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
                  alt={quiz.user.username}
                  referrerPolicy='no-referrer'
                />
              </Link>
            ) : null}
          </div>
        ))
      )}
    </div>
  );
};

export default AllQuizzes;
