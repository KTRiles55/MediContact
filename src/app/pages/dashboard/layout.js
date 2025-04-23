"use client";

import "globals.css";
import Header from "Components/Header.js";
import Footer from "Components/Footer.js";
import { lora, eb_garamond } from "Components/font.js";
import { ThemeProvider as NextThemesProvider } from 'next-themes';
import Link from 'next/link';
import { db } from '../.././firebaseConfig.js';
import { collection, addDoc } from 'firebase/firestore';
import * as React from 'react';
import { useState } from 'react';


export function ThemeProvider({ children}) {
 children = React.Node;
 return (
   <NextThemesProvider defaultTheme="light" attribute="class" enableColorScheme>
     {children}
     </NextThemesProvider>
 );
}


export default function DashboardLayout({ children }) {

  return (
      <div>
        <h1 style={{float:'center', margin:'auto', textAlign:'center'}}>
        Welcome to Medicontact
      </h1>
      <div>
        <form>
          
        </form>
      <ThemeProvider>{ children }</ThemeProvider>
        </div>
      </div>
  );
}
