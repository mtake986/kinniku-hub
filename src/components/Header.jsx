
import { Link } from 'react-router-dom';

import "../styles/Header.css"
import { signInWithGoogle, handleSignOut } from '../config/firebase';

const Header = ({user}) => {
  return (
    <div id='appHeader'>
      <div id="logo">
        <Link to="/kinniku-quiz/home">K!nN!ku Hub</Link>
      </div>
      <nav id="appNav">
        {/* instead of <a href="/"> */}
        {/* <Link to="/">Home</Link> */}
        <Link to="/kinniku-quiz/home">Home</Link>
        <Link to="/kinniku-quiz/new">Create</Link>

        {/* <span onClick={signInWithGoogle}>Sign in</span> */}
        {user.photoURL ? (
          <span className="imgLink">
            <Link to={{ pathname: `/profile/${user.uid}` }}>
              <img src={user.photoURL} alt="Your Profile Picture" referrerPolicy="no-referrer" />
            </Link>
          </span>
        ) : (
          <button id="signInBtn" onClick={signInWithGoogle}>Login</button>
        )}

      </nav>
    </div>
  )
};

export default Header;
