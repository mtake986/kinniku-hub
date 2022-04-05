
import { Link, Outlet } from 'react-router-dom';

const FixedNewQuizBtn = () => {
  return (
    <>
      {/* <div className="fixedNewQuizBtn">
        <Link to="/kinniku-quiz/new">New</Link>
      </div> */}
      <Outlet />
    </>
  )
}

export default FixedNewQuizBtn;