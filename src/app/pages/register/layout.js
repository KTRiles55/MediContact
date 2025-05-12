"use client";

import "globals.css";
import Header from "Components/Header.js";
import Footer from "Components/Footer.js";
import { lora, eb_garamond } from "Components/font.js";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Link from 'next/link';
import { db, auth } from 'scripts/firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import * as React from 'react';
import { useState, useRef, useEffect } from 'react';
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

// Create new user with selected role and personal id
const createUserWithRole = async (email, password, role) => {
  try {
    const response = await fetch('/api/register', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({ email, password, role }),
    });

    if (response.ok) {
      const data = await response.json();
      console.log(`New user created with ID no. ${data.uid}`);
      return data;
    } else {
      const err = await response.json();
      console.error('Problem creating new user: ', err);
      return null;
    }
  } catch(error) {
    console.error('Failed to create new user', error);
  }
}

async function addDataToDatabase(fname, lname, email, ssn, password, question, answer) {
  // Check the role that the user is registering as
  const patient = document.getElementById('patient');
  const doctor = document.getElementById('doctor');
  const role = (patient.className === 'active') ? 'Patient' : (doctor.className === 'active') ? 'Doctor' : 'Undefined';
  if (role === 'Undefined') {
    alert("Please select which type of user that you are registering as.");
    return false;
  }

  // Assign role and id to new user
  try {
    // Add new user credentials into database
    const new_user = await createUserWithRole(email, password, role);
    const uid = new_user['uid'];
    
    const doc = await addDoc(collection(db, "Authentication"), {
      user_id: uid,
      first_name: fname,
      last_name: lname,
      email: email,
      ssn: ssn,
      password: password,
      security_question: question,
      security_answer: answer
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


// Prevent event listener from activating when user clicks outside of the button
function useOutsideClick(callback) {
  const ref = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        callback();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    document.addEventListener('touchstart', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('touchstart', handleClickOutside);
    };
  }, [ref, callback]);
}

// Add hyphen for every 3 numbers
function addHyphen() {
  let input = document.getElementById('ssn');

  // Remove any non-digit characters
  let value = input.value.replace(/\D/g, '');

  // Format the value as xxx-xx-xxxx
  if (value.length <= 3) {
    input.value = value;
  } else if (value.length <= 5) {
    input.value = `${value.slice(0, 3)}-${value.slice(3)}`;
  } else {
    input.value = `${value.slice(0, 3)}-${value.slice(3, 5)}-${value.slice(5, 9)}`;
}
}

export default function RegisterLayout({ children }) {
  const router = useRouter();

  const [fname, setFname] = useState("");
  const [lname, setLname] = useState("");
  const [email, setEmail] = useState("");
  const [ssn, setSSN] = useState("");
  const [password, setPassword] = useState("");
  const [reEnPassword, setReEnPassword] = useState("");
  const [question, setSecurityQuestion] = useState("");
  const [answer, setSecurityAnswer] = useState("");

  const [securityQuestions, chooseSecurityQuestions] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    const checkFname = await validateName(fname);
    const checkLname = await validateName(lname);
    const checkPassword = await checkPasswordStrength(password);

    if (password != reEnPassword) {
      alert("Please re-enter the same password");
    }
    else if (checkFname && checkLname && checkPassword) {
      const hashedPassword = hashPassword(password);
      const hashedSSN = crypto.createHash('sha512').update(ssn).digest('hex');
      const hashedQuestion = crypto.createHash("sha256").update(question).digest('hex');
      const hashedAnswer = crypto.createHash("sha256").update(answer).digest('hex');

      const added = await addDataToDatabase(fname, lname, email, hashedSSN, hashedPassword, hashedQuestion, hashedAnswer);
      if (added) {
        setFname("");
        setLname("");
        setEmail("");
        setSSN("")
        setPassword("");
        setSecurityQuestion("");
        setSecurityAnswer("");

        alert("New user is registered.");
        router.push('/pages/login');
      }
    }

    else {
      alert("Invalid credentials");
    }
  }

  // Toggle button in active mode whenever user clicks on it
  const [isActive, setIsActive] = useState(false);
  const buttonRef = useRef(null);

  // Use the custom hook to detect outside clicks
  useOutsideClick(buttonRef, () => {
    // Prevent deactivation when clicking outside
    if (isActive) {
      setIsActive(false);
    }
  });

  const toggleButton = (e, state) => {
    e.preventDefault();
    setIsActive(state);
  };

  return (
      <div className="register-wrap">
        <h1>
        Registration
      </h1>
      <br/>
      <div>
        <form onSubmit={(e) => register(e)}>
          <section className="signupfields">
          <label htmlFor="fname">First name </label>
          <input type="text" id='fname' name='fname' placeholder='John' onChange={(e) => setFname(e.target.value)} required></input>
          <br/>

          <label htmlFor="lname">Last name </label>
          <input type="text" id='lname' name='lname' placeholder='Smith' onChange={(e) => setLname(e.target.value)} required></input>
          <br/>
          
          <label htmlFor="email">Email </label><br/>
          <input type="text" id = "email" name="email" placeholder="johnsmith11@gmail.com" onChange={(e) => setEmail(e.target.value)} required></input>
          <br/>

          <label htmlFor="ssn">Social Security No. </label>
          <input type="text" id='ssn' name='ssn' maxLength='11' pattern="^[0-9]{3}[\-][0-9]{2}[\-][0-9]{4}$" placeholder="xxx-xx-xxxx" onInput={() => addHyphen()} 
          onChange={(e) => {
            setSSN(e.target.value);
            e.target.setCustomValidity('');
            }} required onInvalid={(e) => e.target.setCustomValidity('Please enter your 9-digit Social Security Number')}></input>
          <br/>

          <label htmlFor="passw">Password </label>
          <input type="password" id="passw" name="passw" placeholder="password101" onChange={(e) => setPassword(e.target.value)} required></input>
          <br/>

          <label htmlFor="re-passw">Re-Enter Password </label><br/>
          <input type="password" id="re-passw" name="re-passw" placeholder="password101" onChange={(e) => setReEnPassword(e.target.value)} required></input>
          <br/>
          <select style={{padding:0.5+'rem'}} id='question' value={question}
        onChange={(e) => setSecurityQuestion(e.target.value)} required>
        <option value="What is your mother's maiden name?">What is your mother's maiden name?</option>
        <option value="What is the name of your first pet?">What is the name of your first pet?</option>
        <option value="What is the make and model of your first car?">What is the make and model of your first car?</option>
        </select>
        <input type='text' style={{padding:0.3+'rem'}}id='answer' value={answer} onChange={(e) => setSecurityAnswer(e.target.value)} required/>
          <br/>
          <label htmlFor='role'>Are you signing up as a patient or doctor?</label>
          <section id='role'>
          <button id='patient' ref={buttonRef} className={isActive === 'patient' ? 'active' : ''} onClick={(e)=>toggleButton(e, 'patient')}>Patient</button>
          <button id='doctor' ref={buttonRef} className={isActive === 'doctor' ? 'active' : ''} onClick={(e)=>toggleButton(e, 'doctor')}>Doctor</button>
          <input type="submit" id='signup' name='signup' value='Sign Up'></input>
          </section>
          <button className='request' style={{margin:0}}><Link href="../pages/login">Return to Sign In</Link></button>
          </section>
        </form>
      <ThemeProvider>{ children }</ThemeProvider>
        </div>
      </div>
  );
}
