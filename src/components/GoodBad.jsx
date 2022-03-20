import React, { useState } from 'react'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import { FaHeart, FaRegHeart } from "react-icons/fa";
// import { FaThumbsUp, FaRegThumbsUp } from "react-icons/fa";

const GoodBad = ({quiz}) => {
  const [goodClicked, setGoodClicked] = useState(false);
  const [badClicked, setBadClicked] = useState(false);
  const [goodCounter, setGoodCounter] = useState(quiz.likes);
  const [badCounter, setBadCounter] = useState(quiz.dislikes);

  const handleLikes = (e) => {
    if (goodClicked === false) {
      setGoodClicked(true)
      setGoodCounter(prevState => prevState + 1);
      if (badClicked === true) {
        setBadClicked(false)
        setBadCounter(prevState => prevState - 1);
      }
    } else {
      setGoodClicked(false)
      setGoodCounter(prevState => prevState - 1);
    }
  }

  // const handleDislikes = () => {
  //   if (badClicked === false) {
  //     setBadClicked(true)
  //     setBadCounter(prevState => prevState + 1);
  //     if (goodClicked === true) {
  //       setGoodClicked(false)
  //       setGoodCounter(prevState => prevState - 1);
  //     }
  //   } else {
  //     setBadClicked(false)
  //     setBadCounter(prevState => prevState - 1);
  //   }
  // }

  return (
    <div className='quizFooter'>
      <div className={goodClicked ? 'likesCounterContainer checked' : 'likesCounterContainer'} onClick={handleLikes}>
        <span className='heartIcon'>{goodClicked ? <FaHeart /> : <FaRegHeart />} </span>
        <span className="likesNumber">{goodCounter}</span>
        {/* <span onClick={handleDislikes}>{goodClicked ? <FontAwesomeIcon icon="fa-regular fa-thumbs-down" /> : <FontAwesomeIcon icon="fa-solid fa-thumbs-down" />}bad: {badCounter}, {badClicked}</span> */}
      </div>
    </div>
  )
}

export default GoodBad