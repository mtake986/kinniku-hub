import React from 'react';
import { Link } from 'react-router-dom';
import "../styles/Header.css"

const Header = () => {
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
        <Link to="/profile">Profile</Link>
      </nav>
    </div>
  )
};

export default Header;
