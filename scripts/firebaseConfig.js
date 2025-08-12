// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getDatabase } from 'firebase/database';


const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_SB_ID,
  messagingSenderId: process.env.NEXT_PUBLIC_MS_ID,
  appId: process.env.NEXT_PUBLIC_APP_ID,
  measurementId: process.env.NEXT_PUBLIC_MEASURE_ID,
  databaseURL: process.env.NEXT_PUBLIC_D_ENDPOINT
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

// NEW
const database = getDatabase(app);
const auth = getAuth(app);

export async function authenticator(req, res) {
  try {
    const userCredential = await signInWithEmailAndPassword(
          auth, process.env.NEXT_PUBLIC_AUTH_EMAIL, process.env.NEXT_PUBLIC_AUTH_PASSWORD);
    const user = userCredential.user;
    // Proceed with Firestore operations
    res.status(200).json({ uid: user.uid, email: user.email });
  }
  catch(error) {
        // Handle errors
        res.status(400).json({ error: "Invalid credentials" });
      }
}
    
export { auth };
export { db }; 
