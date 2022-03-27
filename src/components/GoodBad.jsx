import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import {updateDoc, getDoc, doc, increment } from 'firebase/firestore';

import db from '../config/firebase';

const GoodBad = ({ quiz }) => {
  const [goodClicked, setGoodClicked] = useState(false);
  const [goodCounter, setGoodCounter] = useState(quiz.likes);

  // console.log(quiz.id, quiz.likes)

  const handleLikesUI = async (e) => {
    const docRef = doc(db, "quizzes", quiz.id)

    if (goodClicked === false) {
      setGoodClicked(true);
      setGoodCounter(prevState => prevState + 1);
      const payload = {likes: increment(1)}
      await updateDoc(docRef, payload);
    } else {
      setGoodClicked(false);
      setGoodCounter(prevState => prevState - 1);
      const payload = {likes: increment(-1)}
      await updateDoc(docRef, payload);
    }
  };


  return (
    <div className='quizFooter'>
      <div
        className={
          goodClicked
            ? 'likesCounterContainer checked'
            : 'likesCounterContainer'
        }
        onClick={() => handleLikesUI(quiz)}
      >
        <span className='heartIcon'>
          {goodClicked ? <FaHeart /> : <FaRegHeart />}{' '}
        </span>
        <span className='likesNumber'>{goodCounter}</span>
        {/* <span onClick={handleDislikes}>{goodClicked ? <FontAwesomeIcon icon="fa-regular fa-thumbs-down" /> : <FontAwesomeIcon icon="fa-solid fa-thumbs-down" />}bad: {badCounter}, {badClicked}</span> */}
      </div>
    </div>
  );
};

export default GoodBad;
