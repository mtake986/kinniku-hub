// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useState } from "react";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
  storageBucket: process.env.REACT_APP_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.REACT_APP_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.REACT_APP_FIREBASE_APP_ID,
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// const analytics = getAnalytics(app);
export default getFirestore();
export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((res) => {
      
      // const username = res.user.displayName;
      // const email = res.user.email;
      // const profilePic = res.user.photoURL;
      // const uid = res.user.uid;
      // const user = res.user

      // localStorage.setItem("username", username);
      // localStorage.setItem("email", email);
      // localStorage.setItem("profilePic", profilePic);
      // localStorage.setItem("uid", uid);
      // localStorage.setItem("user", user);

      console.log(res);

    }).catch((err) => {
      console.log(err);
    })
}

// export const AuthState = () => {
//   const [userInfo, setUserInfo] = useState({})
//   onAuthStateChanged(auth, (user) => {
//     if (user) {
//       const username = user.displayName;
//       const uid = user.uid;
//       const email = user.email;
//       const photoURL = user.photoURL
//       // const emailVerified = user.emailVerified
  
//       setUserInfo({username, uid, email, photoURL});
      
//       console.log(`username => ${username}`)
//       console.log(`uid => ${uid}`)
//       console.log(`email => ${email}`)
//       console.log(`photoURL => ${photoURL}`)
//       // console.log(`emailVerified => ${emailVerified}`)
//       return userInfo;
//     } else {
//       console.log("no user signed in")
//     }
//   })
// }

// sendEmailVerification(auth.currentUser)
//   .then(() => {
//     console.log('email verification sent!')
//   })

