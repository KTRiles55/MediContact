import "../.././globals.css";
import Header from "../.././Components/Header.js";
import Footer from "../.././Components/Footer.js";
import { lora, eb_garamond } from "../.././Components/font.js";
import * as React from 'react';
import { ThemeProvider as NextThemesProvider } from 'next-themes';


export default function RegisterLayout({ children }) {
  return (
      <div>
        <h1>
        Registration
      </h1>
      <div className="register">
        <form>
          <p style={{marginRight: 1 + 'em', marginLeft: 2 + 'em', float:'left', width: 2 + 'em', fontWeight:'bold', fontSize: 18}}>
          <label htmlFor="email">Email: </label>
          <br/>
          <br/>
          <label htmlFor="password">Password: </label>
          </p>
          <p>
          <input type="text" id = "email" name="email" placeholder="johnsmith11@gmail.com">
          </input>
          <br/>
          <input type="password" id="passw" name="passw" placeholder="password101">
          </input>
          </p>
          <input type="submit" id='signup' name='signup' value='Sign Up'></input>
        </form>
      <ThemeProvider>{ children }</ThemeProvider>
        </div>
      </div>
  );
}
