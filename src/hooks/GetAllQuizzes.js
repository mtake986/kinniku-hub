import { useState, useEffect } from 'react';
import { collection, onSnapshot } from 'firebase/firestore';

import { db } from '../config/firebase.config';

export const GetAllQuizzes = ({ quizzes, setQuizzes }) => {

  useEffect(() => {
    const collectionRef = collection(db, 'quizzes');
    const unsub = onSnapshot(collectionRef, {
      next: snapshot => {
        setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
      },
      error: err => {
        // don't forget error handling! e.g. update component with an error message
        console.error('quizes listener failed: ', err);
      },
    });
    return unsub;
    // const unsub = onSnapshot(collectionRef, snapshot => {
    //   setQuizzes(snapshot.docs.map(doc => ({ ...doc.data(), id: doc.id })));
    // });
    // return unsub;
    // getData(): run once
    // onSnapshot(): listen for realtime updates
  }, []);
};
