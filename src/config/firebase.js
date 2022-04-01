// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// import { getAnalytics } from "firebase/analytics";
import { addDoc, getDocs, getFirestore } from "firebase/firestore"
import { getAuth, signOut, signInWithPopup, GoogleAuthProvider, onAuthStateChanged, sendEmailVerification } from "firebase/auth";
import { useState } from "react";
import { collection, query, where } from "firebase/firestore";

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
export const db = getFirestore();


export const auth = getAuth(app);
const provider = new GoogleAuthProvider();
export const signInWithGoogle = () => {
  signInWithPopup(auth, provider)
    .then((res) => {
      console.log(res);
      
      // todo: Why create users table?? To let users have personal info, number of answers and quizzes cretaed, biography, sns links, etc
      // todo: 1st, check if res.user exists
      const userCollectionRef = collection(db, 'users');
      let userExistance = false;
      // console.log(`currentUser.uid => ${res.user.uid}`)
      // console.log(userExistance)
      const checkUserExists = async () => {
        const querySnapshot = await getDocs(userCollectionRef);
        querySnapshot.forEach( (doc) => {
          // doc.data() is never undefined for query doc snapshots
          console.log(doc.id, " => ", doc.data());      
          console.log(`currentUser.uid => ${res.user.uid}`)
          if (doc.data().uid === res.user.uid) {
            userExistance = true;
            return 0;
          }
        });
      }
      checkUserExists();
      // console.log(userExistance)

      // todo: 2nd, add this user to users collection if it doesn't exists
      if (userExistance === false) {
        console.log(`userExistance is false ${res.user.displayName}, ${res.user}`)
        const addUser = async () => {
          const payload = {
            username: res.user.displayName,
            uid: res.user.uid,
            email: res.user.email,
            photoURL: res.user.photoURL,
            createdAt: new Date(),
            bio: "biography",
          };
          await addDoc(userCollectionRef, payload);
        }
        addUser();
      }

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

