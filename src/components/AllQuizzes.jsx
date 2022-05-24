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
  getDocs,
  deleteDoc,
} from 'firebase/firestore';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';

// ========== Import from inside this project ==========
import { db } from '../config/firebase';
import { riEditBoxLine, riDeleteBinLine } from '../icons/icons';
import SearchByTag from '../components/SearchByTag';
import SearchByCategory from '../components/SearchByCategory';

// ========== Main ==========
const AllQuizzes = ({ uid }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchByTag, setSearchByTag] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   GetAllQuizzes(quiqzzes={quizzes}, setQuizzes={setQuizzes});
  // })

  useEffect(() => {
    setIsLoading(true);
    const getQuizCategory = async () => {
      const docRef = doc(db, 'quizCategory', 'quizCategoryCategories');
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setCategories(docSnap.data()['categories']);
      } else {
        // doc.data() will be undefined in this case
        console.log('No such document!');
      }
    };
    getQuizCategory();
    getQuizzes();
  }, []);

  const handleSearchByCategory = e => {
    setSearchByCategory(e.target.value);
    console.log(searchByCategory);
  };

  const handleSearchByTag = e => {
    setSearchByTag(e.target.value);
    console.log(searchByTag);
  };

  // handle filtering
  const getQuizzes = async (ctg='', tag='') => {
    setIsLoading(true);
    const collectionRef = collection(db, 'quizzes');
    let q = query(
      collectionRef,
      orderBy('createdAt', 'desc')
    );
    if (ctg !== "") {
      q = query(q, where('category', '==', ctg));
    }
    if (tag !== '') {
      q = query(q, where('tags', 'array-contains', tag));
    }
    const snapshot = await getDocs(q);
    console.log(snapshot.docs);
    setQuizzes(snapshot.docs.map(doc => ({...doc.data(), id: doc.id})));
    setIsLoading(false);
  };

  const handleFilter = e => {
    setIsLoading(true);
    e.preventDefault();

    if((searchByCategory === 'all')) {
      console.log({searchByCategory});
      if (searchByTag !== '') {
        getQuizzes("", searchByTag);
      } else {
        getQuizzes();
      }
    } else {
      if ((searchByCategory !== '') & (searchByTag !== '')) {
        console.log('both filled: ', searchByCategory, searchByTag);
        getQuizzes(searchByCategory, searchByTag);
      } else if (searchByCategory !== '') {
        console.log('category filled', searchByCategory);
        getQuizzes(searchByCategory);
      } else if (searchByTag !== '') {
        console.log('tag filled', searchByTag);
        getQuizzes(searchByTag);
      }
    }
    
  };


  const handleDelete = async (id) => {
    const yesNo = prompt("Type yes(y) to delete permanently. You can't undo this action.");
    console.log(id);
    if (yesNo === "yes" || yesNo === "y") {
      const quizDocRef = doc(db, "quizzes", id);
      console.log(quizDocRef)
      await deleteDoc(quizDocRef);
      getQuizzes(searchByCategory, searchByTag);
    }
  }

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
          />
        </div>
        <button className='submitBtn' onClick={handleFilter}>
          Filter
        </button>
      </div>

      {isLoading ? (
        <div className='loading'>
          <Loading color={'#005bbb'} />
        </div>
      ) : (
        quizzes.length === 0 ? (
          <div>no quizzes</div>
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
                    onClick={() => handleDelete(quiz.id)}
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
        )
      )}

    </div>
  );
};

export default AllQuizzes;
