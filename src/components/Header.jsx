import React from 'react';
import { Link, Outlet } from 'react-router-dom';
const Header = () => {
  return (
    <div id='header'>
      <div id="icon">
        <Link to="/">K!nN!ku Hub</Link>
      </div>
      <nav>
        {/* instead of <a href="/"> */}
        <Link to="/">Home</Link> {"   |   "}
        <Link to="/about">About</Link>{"   |   "}
        <Link to="/quiz-home">QuizHome</Link>{"   |   "}
        <Link to="/profile">Profile</Link>
      </nav>
    </div>
  )
};

export default Header;
