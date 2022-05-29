import { Link, NavLink } from 'react-router-dom';
import Nav from './Nav'
const Header = ({ currentUser }) => {
  let activeStyle = {
    pointerEvents: 'none',
    opacity: '.5',
  };

  return (
    <header id='appHeader'>
      <div id='logo'>
        <Link to='/kinniku-quiz/home'>K!nN!ku Hub</Link>
      </div>
      <Nav currentUser={currentUser} />
    </header>
  );
};

export default Header;
