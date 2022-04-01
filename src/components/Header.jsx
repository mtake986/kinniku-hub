import { Link } from 'react-router-dom';

import '../styles/Header.css';
import { signInWithGoogle } from '../config/firebase';

const Header = ({ currentUser }) => {
  return (
    <div id='appHeader'>
      <div id='logo'>
        <Link to='/kinniku-quiz/home'>K!nN!ku Hub</Link>
      </div>
      <nav id='appNav'>
        {/* instead of <a href="/"> */}
        {/* <Link to="/">Home</Link> */}
        <Link to='/kinniku-quiz/home'>Home</Link>
        <Link to='/kinniku-quiz/new'>New</Link>

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
          <button id='signInBtn' onClick={signInWithGoogle}>
            Login
          </button>
        )}
      </nav>
    </div>
  );
};

export default Header;
