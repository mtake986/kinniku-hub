import React, { useEffect } from 'react';

const SelectMaxTestLength = ({ maxTestLength, setMaxTestLength }) => {
  
  useEffect(() => {
    console.log(maxTestLength)
  }, [maxTestLength]);
  return (
    <div className="maxTestLengthContainer">
      <span>Max Quizzes</span>
      <select defaultValue={maxTestLength} onChange={(e) => setMaxTestLength(e.target.value)}>
        <option value='5'>5</option>
        <option value='10'>10</option>
        <option value='15'>15</option>
        <option value='20'>20</option>
        <option value='25'>25</option>
        <option value='30'>30</option>
        <option value='35'>35</option>
        <option value='40'>40</option>
        <option value='45'>45</option>
        <option value='50'>50</option>
      </select>
    </div>
  );
};

export default SelectMaxTestLength;
