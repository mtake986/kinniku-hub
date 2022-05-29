import { useState } from 'react';
import Item from './Item';
const NavQuiz = ({ txt, displayDropdown, setDisplayDropdown, activeStyle }) => {
  const handleClick = () => {
    displayDropdown !== 'quizdropdown'
      ? setDisplayDropdown('quizdropdown')
      : setDisplayDropdown('');
    console.log(displayDropdown);
  };

  return (
    <div className='navItem'>
      <span
        onClick={handleClick}
        style={displayDropdown === 'quizdropdown' ? activeStyle : undefined}
      >
        {txt}
      </span>
      {displayDropdown === 'quizdropdown' && (
        <div className='navItemDropdownContainer'>
          <Item handleClick={handleClick} link='kinniku-quiz/home' txt='Home' />
          <Item handleClick={handleClick} link='kinniku-quiz/new' txt='New' />
          <Item
            handleClick={handleClick}
            link='kinniku-quiz/all-quizzes'
            txt='All'
          />
        </div>
      )}
    </div>
  );
};

export default NavQuiz;
