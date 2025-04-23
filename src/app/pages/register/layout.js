"use client";

import "globals.css";
import Header from "Components/Header.js";
import Footer from "Components/Footer.js";
import { lora, eb_garamond } from "Components/font.js";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Link from 'next/link';
import { db } from 'scripts/firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import * as React from 'react';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { hashPassword } from 'utils/hash';

const crypto = require('crypto');


export function ThemeProvider({ children}) {
 children = React.Node;
 return (
   <NextThemesProvider defaultTheme="light" attribute="class" enableColorScheme>
     {children}
     </NextThemesProvider>
 );
}

async function addDataToDatabase(fname, lname, dob, email, password, message) {
  try {
    const doc = await addDoc(collection(db, "Authentication"), {
      first_name: fname,
      last_name: lname,
      birth_date: dob, 
      email: email,
      password: password
    });
    console.log("Wrote entry to document");
    return true;
  } catch(error) {
    console.error("There was problem adding to document: ", error);
    return false;
  }
}

async function validateName(name) {
  let letters = /^[A-Za-z]+$/;
  return letters.test(name) && (name.length >= 3 && name.length <= 24);
} 

async function checkPasswordStrength(password) {
  const power = [1, 2, 3, 4];
  const width = [5, 10, 15, 20];
  const specialChars = /[!@#$%^&*()[\]{}?.<>,;:~`\-=_+]/;
  let numbers = /[0-9]/;
  let letters = /[A-Za-z]/;
  
  return numbers.test(password) && letters.test(password)
   && specialChars.test(password) && (password.length >= 8 && password.length <= 32);
}


export default function RegisterLayout({ children }) {
  const router = useRouter();
  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [dob, setBirthDate] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const register = async (e) => {
    e.preventDefault();
    const checkFname = await validateName(fname);
    const checkLname = await validateName(lname);
    const checkPassword = await checkPasswordStrength(password);

    if (checkFname && checkLname && checkPassword) {
      const added = await addDataToDatabase(fname, lname, dob, email, hashPassword(password));
      if (added) {
        setFname("");
        setLname("");
        setBirthDate("");
        setEmail("");
        setPassword("");

        alert("Credentials added to database");
        router.push('/pages/login');
      }
    }

    else {
      alert("Invalid credentials");
    }
  }

  return (
      <div>
        <h1 style={{float:'center', margin:'auto', textAlign:'center'}}>
        Registration
      </h1>
      <div className="register">
        <form onSubmit={(e) => register(e)}>
          <p className="signupfields">
          <label htmlFor="fname">First name: </label>
          <br/>
          <br/>
          <br/>
          <label htmlFor="lname">Last name: </label>
          <br/>
          <br/>
          <br/>
          <label htmlFor="dob">Birth date: </label>
          <br/>
          <br/>
          <br/>
          <label htmlFor="email">Email: </label>
          <br/>
          <br/>
          <label htmlFor="password">Password: </label>
          <br/>
          <br/>
          <br/>
          <br/>
          <br/>
          <label htmlFor="re-password">Re-Enter Password: </label>
          <br/>
          <br/>
          </p>
          <input type="text" id='fname' name='fname' placeholder='John' onChange={(e) => setFname(e.target.value)} required></input>
          <br/>
          <input type="text" id='lname' name='lname' placeholder='Smith' onChange={(e) => setLname(e.target.value)} required></input>
          <br/>
          <input type="date" id='dob' name='dob' onChange={(e) => setBirthDate(e.target.value)} required></input>
          <br/>
          <input type="text" id = "email" name="email" placeholder="johnsmith11@gmail.com" onChange={(e) => setEmail(e.target.value)} required></input>
          <br/>
          <input type="password" id="passw" name="passw" placeholder="password101" onChange={(e) => setPassword(e.target.value)} required></input>
          <p>Strong</p>
          <svg style={{backgroundColor:'green', height:1 + 'rem', width:20 + 'rem'}}></svg>
          <input type="password" id="re-passw" name="re-passw" placeholder="password101" required></input>
          <input type="submit" id='signup' name='signup' value='Sign Up'></input>
          <button className='request' style={{margin:0}}><Link href="../pages/login">Return to Sign In</Link></button>
        </form>
      <ThemeProvider>{ children }</ThemeProvider>
        </div>
      </div>
  );
}
