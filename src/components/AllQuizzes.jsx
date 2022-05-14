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
  deleteDoc,
} from 'firebase/firestore';
import Loading from 'react-simple-loading';
import { Link } from 'react-router-dom';

// ========== Import from inside this project ==========
import { db } from '../config/firebase.config';
import SearchByTag from './SearchByTag';
import SearchByCategory from './SearchByCategory';
import QuizzesList from './multiple/QuizzesList';

// ========== Main ==========
const AllQuizzes = ({ uid }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchByTag, setSearchByTag] = useState('');
  const [searchByTagSubmitted, setSearchByTagSubmitted] = useState(false);
  const [nowLoading, setNowLoading] = useState(true);

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
        console.log(
          `========== both inputs are not empty (category => tag):`,
          searchByCategory,
          searchByTag
        );
        let q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          where('category', '==', searchByCategory),
          where('tags', 'array-contains', searchByTag)
        );
        getQuizzes(q);
      } else {
        console.log(
          `========== only CATEGORY is not empty:`,
          searchByCategory,
          searchByTag
        );
        let q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          where('category', '==', searchByCategory)
        );
        getQuizzes(q);
      }
    } else if (searchByTagSubmitted === true) {
      if (searchByCategory !== '') {
        console.log(
          `========== both inputs are not empty (tag => category):`,
          searchByCategory,
          searchByTag
        );
        let q = query(
          collectionRef,
          orderBy('createdAt', 'desc'),
          where('category', '==', searchByCategory),
          where('tags', 'array-contains', searchByTag)
        );
        getQuizzes(q);
      } else {
        console.log(
          `========== only TAG is not empty:`,
          searchByCategory,
          searchByTag
        );
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

  const getQuizzes = async ref => {
    const unsub = onSnapshot(ref, {
      next: snapshot => {
        setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
        setNowLoading(false);
      },
      error: err => {
        console.error('quizzes listener failed: ', err);
      },
    });
    return unsub;
  };

  const handleSearchByCategory = e => {
    setSearchByCategory(e.target.value);
    console.log(searchByCategory);
  };
  const handleSearchByTag = e => {
    setSearchByTag(e.target.value);
    console.log(searchByTag);
    setSearchByTagSubmitted(false);
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
      <QuizzesList
        list={quizzes}
        kind='allQuizzes'
        uid={uid}
        nowLoading={nowLoading}
      />
      {/* todo: add nowLoading as a prop*/}
    </div>
  );
};

export default AllQuizzes;
