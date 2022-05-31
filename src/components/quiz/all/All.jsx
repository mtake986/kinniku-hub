// ========== Import from third parties ==========
import { useState, useEffect } from 'react';
import {
  collection,
  query,
  orderBy,
  doc,
  getDoc,
  where,
  getDocs,
  deleteDoc,
} from 'firebase/firestore';


// ========== Import from inside this project ==========
import { db } from '../../../config/firebase';
import Inputs from './inputs/Inputs';
import { FilterInputsContext } from '../../../contexts/quiz/FilterInputsContext';
import { FilterResultContext } from '../../../contexts/quiz/FilterResultContext';
import Result from './Result';

// ========== Main ==========
const All = ({ uid }) => {
  const [quizzes, setQuizzes] = useState([]);
  const [users, setUsers] = useState([]);
  const [searchByCategory, setSearchByCategory] = useState('');
  const [categories, setCategories] = useState([]);
  const [searchByTag, setSearchByTag] = useState('');
  const [searchByUid, setSearchByUid] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  // useEffect(() => {
  //   GetAllQuizzes(quiqzzes={quizzes}, setQuizzes={setQuizzes});
  // })

  useEffect(() => {
    setIsLoading(true);
    getQuizCategory();
    getUsers();
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

  const handleSearchByUid = e => {
    setSearchByUid(e.target.value);
    console.log(searchByUid);
  };

  // handle filtering
  const getQuizzes = async (ctg = '', tag = '', uid="") => {
    setIsLoading(true);
    const collectionRef = collection(db, 'quizzes');
    let q = query(collectionRef, orderBy('createdAt', 'desc'));
    if (ctg !== '') {
      q = query(q, where('category', '==', ctg));
    }
    if (tag !== '') {
      q = query(q, where('tags', 'array-contains', tag));
    }
    if (uid !== '') {
      q = query(q, where('user.uid', '==', uid));
    }
    const snapshot = await getDocs(q);
    console.log(snapshot.docs);
    setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    setIsLoading(false);
  };

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

  const getUsers = async () => {
    const collectionRef = collection(db, 'users');
    const q = query(collectionRef, orderBy('createdAt', 'desc'));
    const snapshot = await getDocs(q);
    setUsers(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    console.log("users: ", users);
  }

  const handleFilter = e => {
    setIsLoading(true);
    e.preventDefault();

    if (searchByCategory === 'all') {
      console.log({ searchByCategory });
      if (searchByTag !== '') {
        getQuizzes('', searchByTag);
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

  const handleDelete = async id => {
    const yesNo = prompt(
      "Type yes(y) to delete permanently. You can't undo this action."
    );
    console.log(id);
    if (yesNo === 'yes' || yesNo === 'y') {
      const quizDocRef = doc(db, 'quizzes', id);
      console.log(quizDocRef);
      await deleteDoc(quizDocRef);
      getQuizzes(searchByCategory, searchByTag);
    }
  };

  return (
    <div className='allQuizzes'>
      <FilterInputsContext.Provider
        value={{
          handleSearchByCategory,
          searchByCategory,
          categories,
          handleSearchByTag,
          searchByTag,
          handleSearchByUid,
          searchByUid,
          users,
          handleFilter,
        }}
      >
        <Inputs />
      </FilterInputsContext.Provider>
      <FilterResultContext.Provider
        value={{ 
          quizzes,
          isLoading,
          uid,
          handleDelete,
        }}
      >
        <Result />
      </FilterResultContext.Provider>
    </div>
  );
};

export default All;
