// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { USER_ACTION } from "../redux";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAG2MHQBW1oPUNF5KlVffziYnzuTYBLG5Q",
  authDomain: "facebook-clone-c0425.firebaseapp.com",
  projectId: "facebook-clone-c0425",
  storageBucket: "facebook-clone-c0425.appspot.com",
  messagingSenderId: "888951532566",
  appId: "1:888951532566:web:7645c33b25cbff2b579937",
  measurementId: "G-9PCD9MFMFX",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

export const auth = getAuth(app);
export const db = getFirestore(app);
