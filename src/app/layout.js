import "globals.css";
import Link from "next/link";
import Header from "Components/Header.js";
import Footer from "Components/Footer.js";
import { lora } from "Components/font.js";
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';

export const metadata = {
  title: "MediContact",
  description: "Website for healthcare appointment scheduling."
};

export default function RootLayout({ children }) {
  return (
    <html suppressHydrationWarning lang="en" className={lora.className}>
      <body className="backdrop">
        <Header/>
        <div className="background-layer"></div>
          {children}
        <Footer/>
      </body>
      </html>
  );
}
