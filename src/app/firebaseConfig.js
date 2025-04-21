// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from 'firebase/database';
import dotenv from 'dotenv-safe';

dotenv.config();

const firebaseConfig = {
  apiKey: process.env.API_KEY,
  authDomain: "medicontact-6d095.firebaseapp.com",
  projectId: process.env.PROJECT_ID,
  storageBucket: "medicontact-6d095.firebasestorage.app",
  messagingSenderId: "1003020297192",
  appId: "1:1003020297192:web:540620ca72c14790fc7a5d",
  measurementId: "G-PN9XN2ZM9M",
  databaseURL: process.env.D_ENDPOINT
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// NEW
const database = getDatabase(app);

const auth = getAuth();
    signInWithEmailAndPassword(auth, process.env.AUTH_EMAIL, process.env.AUTH_PASSWORD)
      .then((userCredential) => {
        const user = userCredential.user;
        // Proceed with Firestore operations
      })
      .catch((error) => {
        // Handle errors
        alert("Unknown email/password");
      });
    
export { auth };
export { db }; 