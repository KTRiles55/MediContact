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


export function ThemeProvider({ children}) {
 return (
   <NextThemesProvider defaultTheme="light" attribute="class" enableColorScheme>
     {children}
     </NextThemesProvider>
 );
}


export default function DashboardLayout({ children }) {
  const router = useRouter();
  return (
      <div className="dashboard-wrap">
        <section className="menu">
          <nav>Home</nav>
          <nav>Schedule</nav>
          <nav onClick={() => router.push('/pages/dashboard/tabs/Booking')}>Book Appointment</nav>
          <nav>Help Center</nav>
          <button onClick={() => router.push('/pages/login')}
          className='signin'>Sign Out</button> 
        </section>
      <div>
      <ThemeProvider>{ children }</ThemeProvider>
        </div>
      </div>
  );
}
