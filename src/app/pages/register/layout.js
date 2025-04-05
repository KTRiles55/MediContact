"use client";

import "../.././globals.css";
import Header from "../.././Components/Header.js";
import Footer from "../.././Components/Footer.js";
import { lora, eb_garamond } from "../.././Components/font.js";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Link from 'next/link';
import { db } from '../.././firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';


export function ThemeProvider({ children}) {
 children = React.Node;
 return (
   <NextThemesProvider defaultTheme="light" attribute="class" enableColorScheme>
     {children}
     </NextThemesProvider>
 );
}

async function addDataToDatabase(email, password, message) {
  try {
    const doc = await addDoc(collection(db, "messages"), {
      email: email,
      password: password,
      message: message,
    });
    console.log("Wrote to doc");
    return true;
  } catch(error) {
    console.error("There was problem adding to document: ", error);
    return false;
  }
}

export default function RegisterLayout({ children }) {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const added = await addDataToDatabase(email, password, message);
    if (added) {
      setEmail("");
      setPassword("");
      setMessage("");

      alert("Credentials added to database");
    }
  }

  return (
      <div>
        <h1 style={{float:'center', margin:'auto', textAlign:'center'}}>
        Registration
      </h1>
      <div className="register">
        <form onSubmit={()=>router.push('/pages/dashboard')}>
          <p style={{marginRight: 0.2 + 'em', marginLeft: 2 + 'em', float:'left', width: 4.5 + 'em', fontWeight:'bold', fontSize: 18}}>
          <label htmlFor="email">Email: </label>
          <br/>
          <br/>
          <label htmlFor="password">Password: </label>
          <br/>
          <br/>
          <label htmlFor="re-password">Re-Enter Password: </label>
          </p>
          <p>
          <input type="text" id = "email" name="email" placeholder="johnsmith11@gmail.com" onChange={(e) => setEmail(e.target.value)}>
          </input>
          <br/>
          <input type="password" id="passw" name="passw" placeholder="password101" onChange={(e) => setPassword(e.target.value)}>
          </input>
          <input type="password" id="re-passw" name="re-passw" placeholder="password101">
          </input>
          </p>
          <input type="submit" id='signup' name='signup' value='Sign Up'></input>
          <button className='request' style={{margin:0}}><Link href="../pages/login">Return to Sign In</Link></button>
        </form>
      <ThemeProvider>{ children }</ThemeProvider>
        </div>
      </div>
  );
}
