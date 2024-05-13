// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA0TSYTsau6HE5BbEUHoijdI3lemAkz1fY",
  authDomain: "react-notice-8082b.firebaseapp.com",
  projectId: "react-notice-8082b",
  storageBucket: "react-notice-8082b.appspot.com",
  messagingSenderId: "480420926582",
  appId: "1:480420926582:web:c9e12ea69b5cd3cd7efb57",
  measurementId: "G-1EZ3JF5KCK"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

const db = getFirestore(app);
// firestore export
export {db}