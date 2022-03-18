import React, { useState } from 'react'

const GoodBad = ({quiz}) => {
  const [goodCounter, setGoodCounter] = useState(quiz.likes);
  const [badCounter, setBadCounter] = useState(quiz.dislikes);

  const handleLikes = () => {
    // console.log(goodCounter);
    setGoodCounter(prevState => prevState + 1);
  }
  const handleDislikes = () => {
    setBadCounter(prevState => prevState + 1);
  }
  return (
    <div className='quizFooter'>
      <div className='likesDislikesContainer'>
        <span onClick={handleLikes}>good: {goodCounter}</span>
        <div></div>
        <span onClick={handleDislikes}>bad: {badCounter}</span>
      </div>
    </div>
  )
}

export default GoodBad