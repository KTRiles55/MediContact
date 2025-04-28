"use client"

import Image from "next/image";
import { useRouter } from 'next/navigation';
import Header from 'Components/Header.js';
import "./globals.css";
import { useEffect } from 'react';

const Home = () => {
  const router = useRouter();
  useEffect(() => {
    // Log the firebase configuration file
    console.log('Firebase config:', "scripts/firebaseConfig.js");
  }, []);

  return (
    <main className="backdrop">
      <div className="background-layer"></div>
      <div className="home-wrap">
      <section className="menu">
      <nav>Home</nav>
      <nav>About us</nav>
      <nav>Find Healthcare</nav>
      <nav>Contact Us</nav>
    <button onClick={() => router.push('/pages/login')}
     className='signin'>Sign In</button> 
     </section>
     <h1>Welcome to MediContact!</h1>
     <div className='parent'>
      <div className='child'>
        <section className="prompt">
          <p>
            Schedule an appointment now!
          </p>
        </section>
      </div>
      </div>
      </div>
    </main>
  );
}

export default Home;