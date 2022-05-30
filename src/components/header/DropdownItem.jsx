import { Link, NavLink } from 'react-router-dom';

const DropdownItem = ({handleClick, link, txt}) => {
  let activeStyle = {
    pointerEvents: 'none',
    color: "#ffe668",
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
    </>
  )
}

export default DropdownItem