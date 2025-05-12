"use client"

import "globals.css";
import Header from "Components/Header.js";
import Footer from "Components/Footer.js";
import { lora, eb_garamond } from "Components/font.js";
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { useState } from 'react';
import 'scripts/firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth';
import { hashPassword } from 'utils/hash';


export function ThemeProvider({ children}) {
 children = React.Node;
 return (
   <NextThemesProvider defaultTheme="light" attribute="class" enableColorScheme>
     {children}
     </NextThemesProvider>
 );
}


export default function LoginLayout({ children }) {
  const router = useRouter();
  const [email, getEmail] = useState("");
  const [password, getPassword] = useState("");
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    const auth = getAuth();
    const hashedPassw = hashPassword(password);
    const userCred = await signInWithEmailAndPassword(auth, email, hashedPassw);
    const user = userCred.user;
    try {
    if (user) {
      const idToken = await user.getIdToken();
      console.log("User token: ", idToken);
    }
    else {
      console.log("User is not signed in.");
      return;
    }

    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    const tokenResults = await user.getIdTokenResult();
    const role = tokenResults.claims.role;
    if ((res.ok) && (role === 'Patient')) {
      // Handle success
      router.push('/pages/views/Patient/dashboard');
    } 
    
    else if ((res.ok) && (role === 'Doctor')) {
      // Handle success
      router.push('/pages/views/Doctor/dashboard');
    }

    else {
      alert(res.status);
    }
  } catch(err) {
    console.log("There was a problem signing in: ", err);
  }
  };

  return (
      <div className="login-wrap">
      <button onClick={() => router.push('/')}
      className='signin' style={{float:'right', padding:0.5+'rem', fontSize:2+'em',
      color:'white', backgroundColor: 'rgb(53, 5, 47)', borderStyle:'solid',
      borderRadius:'25%', margin:0.5+'rem'}}>Back to home</button> 
        <h1>
        Sign In
      </h1>
      <div className="login-container-wrapper">
      <div className="parent">
        <div className="child">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p className="labels">
          <label htmlFor="email">Email: </label>
          </p>
          <input type="text" id = "email" name="email" placeholder="johnsmith11@gmail.com" onChange={(e) => getEmail(e.target.value)}>
          </input>
        
          <p className="labels">
          <label htmlFor="password">Password: </label>
          </p>
          <input type="password" id="passw" name="passw" placeholder="password101" onChange={(e) => getPassword(e.target.value)}>
          </input>
         
          <button className='request'>Forgot Password?</button>
          <input type="submit" id='signin' name='signin' value='Sign In'></input>
          <br/>
          <span style={{margin:4+'rem', textAlign:'center', fontSize:1.5+'em'}}>Don't have an account?
          <input type='submit' value="Sign Up" style={{width:10+'rem', margin:0.5+'rem', backgroundColor: 'rgba(139, 110, 135, 0.0)', borderColor:'white'}} onClick={(e) => {
            e.preventDefault();
            router.push('/pages/register');
            }}></input>
            </span>
        </form>
      <ThemeProvider>{ children }</ThemeProvider>
      </div>
      <section>
        <div style={{textAlign:'center', fontSize:1.2+'em'}}>
        <p className="regSection" style={{fontFamily: eb_garamond.variable,
           fontWeight: 'bold', fontSize:4+'em'}}>Seek medical consultation<br/>with no delay!</p>
        <p className="regSection" style={{fontWeight: 'bold', fontSize:1.5+'em'}}>This platform offers you responsive, reliable<br/>and easy-to-navigate appointment booking features.</p>
        <p className="regSection" style={{fontSize: 2+'em', fontWeight: 'bold'}}>Join us now to keep in contact with your medical providers<br/>and manage bookings.</p>
        </div>
        </section>
        </div>
        </div>
        </div>
  );
}

