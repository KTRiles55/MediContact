"use client"

import Image from "next/image";
import { useRouter } from 'next/navigation';
import Header from './Components/Header.js';
import "./globals.css";

const Home = () => {
  const router = useRouter();

  return (
    <main>
      <section className="menu">
      <nav className="menu">Home</nav>
      <nav className="menu">About us</nav>
    <button onClick={() => router.push('/pages/login')}
     className='action'>Sign In</button> 
     </section>
     <h1>Homepage</h1>
    </main>
  );
}

export default Home;