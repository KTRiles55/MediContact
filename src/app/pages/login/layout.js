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
import { db } from 'scripts/firebaseConfig.js';
import { doc, getDoc } from 'firebase/firestore';
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
    const res = await fetch('/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (res.ok) {
      // Handle success
      router.push('/pages/dashboard');
    } else {
      alert(res.status);
    }
  };

  return (
      <div>
        <h1>
        Welcome to MediContact!
      </h1>
      <div className="log">
        <form onSubmit={(e) => handleSubmit(e)}>
          <p style={{marginRight: 1 + 'em', marginLeft: 2 + 'em', float:'left', width: 2 + 'em', fontWeight:'bold', fontSize: 18}}>
          <label htmlFor="email">Email: </label>
          <br/>
          <br/>
          <label htmlFor="password">Password: </label>
          </p>
          <p>
          <input type="text" id = "email" name="email" placeholder="johnsmith11@gmail.com" onChange={(e) => getEmail(e.target.value)}>
          </input>
          <br/>
          <input type="password" id="passw" name="passw" placeholder="password101" onChange={(e) => getPassword(e.target.value)}>
          </input>
          <button className='request'>Forgot Password?</button>
          </p>
          <input type="submit" id='signin' name='signin' value='Sign In'></input>
          <span style={{margin:1 + 'em'}}>or</span>
          <button className='request' style={{margin:0}}><Link href="../pages/register">create an account</Link></button>
        </form>
      <ThemeProvider>{ children }</ThemeProvider>
        </div>
        <div className='backdrop'>
        <p style={{fontFamily: eb_garamond.variable,
           fontWeight: 'bold', fontSize:45, marginTop:0}}>Seek medical consultation<br/>with no delay!</p>
        <p style={{marginBottom:7 + 'em', fontWeight: 'bold'}}>This platform offers you responsive, reliable<br/>and easy-to-navigate appointment booking features.</p>
        <p style={{fontSize: 30, fontWeight: 'bold'}}>Join us now to keep in contact with your medical providers<br/>and manage bookings.</p>
        </div>
        </div>
  );
}

