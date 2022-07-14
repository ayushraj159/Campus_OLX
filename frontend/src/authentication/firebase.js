// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAk1pql79fhviraCclm7MfOZPRUPag7Ak8",
  authDomain: "campus-olx.firebaseapp.com",
  projectId: "campus-olx",
  storageBucket: "campus-olx.appspot.com",
  messagingSenderId: "167382162620",
  appId: "1:167382162620:web:3d6c68b13bfc5d4ed004b9",
  measurementId: "G-MVY3W3TD96"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);