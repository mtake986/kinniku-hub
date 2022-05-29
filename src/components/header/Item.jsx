import { Link, NavLink } from 'react-router-dom';

const Item = ({handleClick, link, txt}) => {
  let activeStyle = {
    pointerEvents: 'none',
    opacity: '.5',
  };
  return (
    <>
      <NavLink
        to={link}
        style={({ isActive }) => (isActive ? activeStyle : undefined)}
        onClick={handleClick}
      >
        {txt}
      </NavLink>
      {/* <NavLink
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
      </NavLink> */}
    </>
  )
}

export default Item