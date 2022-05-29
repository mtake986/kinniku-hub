import { useState } from 'react';
import { Link, NavLink } from 'react-router-dom';

import { signInWithGoogle } from '../../config/firebase';
import { faRegUserCircle } from '../../icons/icons';
import NavQuiz from './NavQuiz';
import NavPFC from './NavPFC';
const Nav = ({ currentUser }) => {
  const [displayDropdown, setDisplayDropdown] = useState('');
  const activeStyle = {
    color: '#ffd500',
    opacity: '1',
  };
  return (
    <nav id='appNav'>
      <NavQuiz
        txt='Quiz'
        displayDropdown={displayDropdown}
        setDisplayDropdown={setDisplayDropdown}
        activeStyle={activeStyle}
      />
      <NavPFC
        txt='PFC'
        displayDropdown={displayDropdown}
        setDisplayDropdown={setDisplayDropdown}
        activeStyle={activeStyle}
      />
      {/* <span onClick={signInWithGoogle}>Sign in</span> */}
      {currentUser.photoURL ? (
        <span className='imgLink'>
          <Link
            to={{ pathname: `/profile/${currentUser.uid}` }}
            state={{ user: currentUser }}
          >
            <img
              src={currentUser.photoURL}
              alt='Your Profile Pic'
              referrerPolicy='no-referrer'
            />
          </Link>
        </span>
      ) : (
        <div id='signInBtn' onClick={signInWithGoogle}>
          {faRegUserCircle}
        </div>
      )}
    </nav>
  );
};

export default Nav;
