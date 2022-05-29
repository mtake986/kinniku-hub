import { useState } from 'react'
import Item from './Item'


const NavPFC = ({txt, displayDropdown, setDisplayDropdown}) => {

  const handleClick = () => {
    displayDropdown !== "pfcdropdown" ? setDisplayDropdown("pfcdropdown") : setDisplayDropdown("");
    console.log(displayDropdown);
  }

  return (
    <div className="navItem">
      <span onClick={handleClick}>{txt}</span>
      {displayDropdown === "pfcdropdown" && (
        <div className="navItemDropdownContainer">
          <Item 
            handleClick={handleClick} 
            link='kinniku-quiz/home' 
            txt="Home" 
          />
          <Item 
            handleClick={handleClick} 
            link='kinniku-quiz/new' 
            txt="New" 
          />
          <Item 
            handleClick={handleClick} 
            link='kinniku-quiz/all-quizzes'
            txt="All" 
          />
        </div>
      )}
    </div>
  )
}

export default NavPFC