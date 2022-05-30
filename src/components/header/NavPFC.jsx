import { useState } from 'react';
import DropdownItem from './DropdownItem';

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
          <DropdownItem handleClick={handleClick} link='pfc/home' txt='Home' />
          <DropdownItem handleClick={handleClick} link='pfc/add' txt='Add' />
          <DropdownItem handleClick={handleClick} link='pfc/all' txt='All' />
        </div>
      )}
    </div>
  );
};

export default NavPFC;
