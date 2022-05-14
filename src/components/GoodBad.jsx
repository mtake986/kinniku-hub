import { useState } from 'react';
import { FaHeart, FaRegHeart } from 'react-icons/fa';
// import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";
import {
  updateDoc,
  doc,
  increment,
  arrayUnion,
  arrayRemove,
} from 'firebase/firestore';
import { db } from '../config/firebase.config';

const GoodBad = ({ quiz, currentUser }) => {
  let alreadyLiked = false;
  // console.log(currentUser, quiz)

  if (
    currentUser !== 'Anonymous' &&
    quiz.whoLikes !== null &&
    quiz.whoLikes.includes(currentUser.uid)
  ) {
    alreadyLiked = true;
  }
  const [goodClicked, setGoodClicked] = useState(alreadyLiked);
  const [goodCounter, setGoodCounter] = useState(quiz.likes);

  const handleLikes = async e => {
    const docRef = doc(db, 'quizzes', quiz.id);
    if (goodClicked === false) {
      setGoodClicked(true);
      setGoodCounter(prevState => prevState + 1);
      const payload = {
        likes: increment(1),
        whoLikes:
          currentUser !== 'Anonymous' ? arrayUnion(currentUser.uid) : null,
      };
      await updateDoc(docRef, payload);
    } else {
      setGoodClicked(false);
      setGoodCounter(prevState => prevState - 1);
      const payload = {
        likes: increment(-1),
        whoLikes:
          currentUser !== 'Anonymous' ? arrayRemove(currentUser.uid) : null,
      };
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
        onClick={() => handleLikes()}
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
