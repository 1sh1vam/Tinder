// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyAZQjQDedLcAlfkVytSB2LYh3k-cCTIHcM",
  authDomain: "rn-tinder-mobile.firebaseapp.com",
  projectId: "rn-tinder-mobile",
  storageBucket: "rn-tinder-mobile.appspot.com",
  messagingSenderId: "693526253679",
  appId: "1:693526253679:web:253d8a301591475eebbd9a",
  measurementId: "G-XNNPEM8KVN"
};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth();

export { app, auth, db };
