// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCuAW2Z7AUwg2-F1syjys4TjYre22thoxw",
  authDomain: "team-08-cs353.firebaseapp.com",
  projectId: "team-08-cs353",
  storageBucket: "team-08-cs353.appspot.com",
  messagingSenderId: "122553631621",
  appId: "1:122553631621:web:51651f8743f8ca9fe77aec",
  measurementId: "G-ZR9Z3JMDQ4",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
