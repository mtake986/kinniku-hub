import React from 'react';
import { signInWithGoogle } from '../config/firebase';

const Home = ({user}) => {

  return (
    <div>
      Welcome, {user.username ? `${user.username}` : `Mr. Anonymous`}
    </div>
  );
};

export default Home;
