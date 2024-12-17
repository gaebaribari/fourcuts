// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, doc, addDoc, updateDoc, increment } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCJl8iDZNZ7BLczGnYdrXIcBAMniyrn6-g",
  authDomain: "fourcuts-a6bcc.firebaseapp.com",
  projectId: "fourcuts-a6bcc",
  storageBucket: "fourcuts-a6bcc.firebasestorage.app",
  messagingSenderId: "190444008150",
  appId: "1:190444008150:web:24df1eafc6920a47568f77",
  measurementId: "G-8B1N1VLZBB"
};


const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export { db, app };