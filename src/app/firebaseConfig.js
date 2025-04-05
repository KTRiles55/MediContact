// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
  apiKey: "[--INSERT API KEY HERE--]",
  authDomain: "medicontact-6d095.firebaseapp.com",
  projectId: "medicontact-6d095",
  storageBucket: "medicontact-6d095.firebasestorage.app",
  messagingSenderId: "1003020297192",
  appId: "1:1003020297192:web:540620ca72c14790fc7a5d",
  measurementId: "G-PN9XN2ZM9M"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export const auth = getAuth(app);
export { db }; 
