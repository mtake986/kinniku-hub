
import TestStart from './TestStart';
import QuizzesRecentlyCreated from './QuizzesRecentlyCreated';
import UserRanking from './UserRanking';


const Home = () => {

  return (
    <div id='quizHome'>
      <TestStart />
      <QuizzesRecentlyCreated />
      <UserRanking />
    </div>
  );
};
export default Home;
