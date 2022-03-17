// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCp6krSwy6zODYF_qPWmP_H1vY31PmvUS8",
  authDomain: "kinnikuhub.firebaseapp.com",
  projectId: "kinnikuhub",
  storageBucket: "kinnikuhub.appspot.com",
  messagingSenderId: "131675559",
  appId: "1:131675559:web:3ca3bbad263b6be90ff282",
  measurementId: "G-JRQX0B206R"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);