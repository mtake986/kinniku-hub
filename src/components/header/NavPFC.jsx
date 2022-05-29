import { useState } from 'react';
import Item from './Item';

const NavPFC = ({ txt, displayDropdown, setDisplayDropdown, activeStyle }) => {
  const handleClick = () => {
    displayDropdown !== 'pfcdropdown'
      ? setDisplayDropdown('pfcdropdown')
      : setDisplayDropdown('');
    console.log(displayDropdown);
  };

  return (
    <div className='navItem'>
      <span
        onClick={handleClick}
        style={displayDropdown === 'pfcdropdown' ? activeStyle : undefined}
      >
        {txt}
      </span>
      {displayDropdown === 'pfcdropdown' && (
        <div className='navItemDropdownContainer'>
          <Item handleClick={handleClick} link='pfc/home' txt='Home' />
          <Item handleClick={handleClick} link='pfc/add-food' txt='Add' />
          <Item handleClick={handleClick} link='pfc/all-foods' txt='All' />
        </div>
      )}
    </div>
  );
};

export default NavPFC;
