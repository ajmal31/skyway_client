// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBcLnanIb87vMp6XoDMNRk842u8-1l6BrI",
  authDomain: "skyway-404513.firebaseapp.com",
  projectId: "skyway-404513",
  storageBucket: "skyway-404513.appspot.com",
  messagingSenderId: "102275231756",
  appId: "1:102275231756:web:45e5bf589b1225dc6c3e29",
  measurementId: "G-N7DQB6C1HZ"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth=getAuth(app)
