
import { Link } from 'react-router-dom';

import "../styles/Header.css"
import { signInWithGoogle, handleSignOut } from '../config/firebase';

const Header = ({user}) => {
  return (
    <div id='appHeader'>
      <div id="logo">
        <Link to="/">K!nN!ku Hub</Link>
      </div>
      <nav id="appNav">
        {/* instead of <a href="/"> */}
        {/* <Link to="/">Home</Link> */}
        <Link to="/kinniku-quiz/new">Create</Link>
        <Link to="/kinniku-quiz/">Home</Link>

        {/* <span onClick={signInWithGoogle}>Sign in</span> */}
        {user.username ? (
          <>
            <Link to={{ pathname: `/profile/${user.uid}` }}>Profile</Link>
          </>
        ) : (
          <button onClick={signInWithGoogle}>Sign in</button>
        )}

      </nav>
    </div>
  )
};

export default Header;
