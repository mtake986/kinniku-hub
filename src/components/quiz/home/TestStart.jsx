import { useEffect, useState } from 'react';
import {
  doc,
  getDoc,
} from 'firebase/firestore';
import Loading from 'react-simple-loading';
import { db } from '../../../config/firebase';

import TestStartBtn from './TestStartBtn.jsx'
import SelectMaxTestLength from './SelectMaxTestLength.jsx'

const TestStart = () => {
  // const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  // const [maxTestLength, setMaxTestLength] = useState(10);
  const [categories, setCategories] = useState([]);
  const [isLoadingCategories, setIsLoadingCategories] = useState(false);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [maxTestLength, setMaxTestLength] = useState(10);

  useEffect(() => {
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
      <TestStartBtn
        selectedCategories={selectedCategories}
        maxTestLength={maxTestLength}
      />
    </div>
  )
}

export default TestStart