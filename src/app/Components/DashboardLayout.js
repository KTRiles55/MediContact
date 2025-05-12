"use client";

import "globals.css";
import Header from "Components/Header.js";
import Footer from "Components/Footer.js";
import { lora, eb_garamond } from "Components/font.js";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import * as React from 'react';
import 'scripts/firebaseConfig.js';
import { useRouter } from 'next/navigation';
import { getAuth, signOut } from 'firebase/auth';


export function ThemeProvider({ children}) {
 return (
   <NextThemesProvider defaultTheme="light" attribute="class" enableColorScheme>
     {children}
     </NextThemesProvider>
 );
}


export default function DashboardLayout({ children }) {
  const router = useRouter();

  async function handleSignOut(router) {
    const auth = getAuth();
    try {
      await signOut(auth);
      console.log('Successfully signed out.');
      router.push('/pages/login');
    } catch(error) {
      console.error('Failed to sign out: ', error);
    }
  }

  return (
      <div className="dashboard-wrap">
        <section className="menu">
          <nav>Home</nav>
          <nav>Schedule</nav>
          <nav onClick={() => router.push('/pages/views/Patient/dashboard/tabs/booking')}>Book Appointment</nav>
          <nav>Help Center</nav>
          <button onClick={() => handleSignOut(router)}
          className='signin'>Sign Out</button> 
        </section>
      <div>
      <ThemeProvider>{ children }</ThemeProvider>
        </div>
      </div>
  );
}
