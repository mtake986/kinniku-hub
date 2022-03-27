import React from 'react';
import { signInWithGoogle } from '../config/firebase';

const Home = () => {

  return (
    <div>
      <h3>home</h3>
      <button onClick={signInWithGoogle}>sign in with ggl</button>
      <h4>{localStorage.getItem("username")}</h4>
      <h4>{localStorage.getItem("email")}</h4>
      <img src={localStorage.getItem("profilePic")} />
    </div>
  );
};

export default Home;
