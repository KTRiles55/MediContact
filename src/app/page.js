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
    <main>
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
      <section style={{fontSize: 2.5+'em', width: '45%', backgroundColor: 'rgba(50, 20, 65, 0.7)', margin: 0, padding: 4 + 'rem'}}>
        Here on MediContact, our booking system provides clients with a quick and reliable way to receive medical assistance. Our 24-hour service promptly responds to user requests and connects them to doctors with no delay.
        </section>
        <section className="prompt">
          <p style={{margin:'auto'}}>
            Schedule an appointment now!
          </p>
          <span>
          <button>Start Booking</button>
          <button style={{margin:2+'rem', backgroundColor:'rgb(50, 20, 65)', borderRadius:'20%', fontSize:0.6+'em'}}>View Availability</button>
          </span>
        </section>
      </div>
      </div>
      </div>
    </main>
  );
}

export default Home;