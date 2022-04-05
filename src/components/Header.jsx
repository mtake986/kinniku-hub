import { Link, NavLink } from 'react-router-dom';

import { signInWithGoogle } from '../config/firebase';

const Header = ({ currentUser }) => {
  let activeStyle = {
    pointerEvents: "none",
    opacity: ".5",
  };

  let activeClassName = 'underline';

  return (
    <header id='appHeader'>
      <div id='logo'>
        <Link to='/kinniku-quiz/home'>K!nN!ku Hub</Link>
      </div>
      <nav id='appNav'>
        {/* instead of <a href="/"> */}
        {/* <Link to="/">Home</Link> */}
        <NavLink
          to='kinniku-quiz/home'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          Home
        </NavLink>
        <NavLink
          to='kinniku-quiz/new'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          New
        </NavLink>
        <NavLink
          to='kinniku-quiz/all-quizzes'
          style={({ isActive }) => (isActive ? activeStyle : undefined)}
        >
          All
        </NavLink>
        {/* <Link to='kinniku-quiz/new'>New</Link>
        <Link to='kinniku-quiz/all-quizzes'>All</Link> */}

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
    </header>
  );
};

export default Header;
