"use client"

import DashboardLayout from 'Components/DashboardLayout';
import { useState } from 'react';

export default function BookingContent() {
  const [loadForm, setLoadForm] = useState(false);

    return (
      <div>
      <div className="booking-wrap">
      <h1>
        Begin scheduling with a doctor now!
      </h1>
      <button onClick={() => setLoadForm(true)}>Start booking</button>
      </div>

      {loadForm && (
        <div className={`popup-form ${loadForm ? 'show' : ''}`}>
          <script src=
          "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js">
        </script>
          <h2 style={{textAlign:'center'}}>Check-In Form</h2>
          <form method='POST' id='check-in-form'>
          <div className="table">
          <section>
          <label htmlFor='fname'>First name</label><br/>
          <input type='text' placeholder='John' id='fname'></input>
          <label htmlFor='mname'>Middle name</label><br/>
          <input type='text' placeholder='S.' id='mname'></input>
          <label htmlFor='lname'>Last name</label><br/>
          <input type='text' placeholder='Doe' id='lname'></input>
          <label htmlFor='phone-num'>Phone number</label><br/>
          <input type='number' placeholder='(xxx) xxx-xxxx'></input>
          <label htmlFor='birth'>Birthday</label><br/>
          <input type='date' placeholder='birth'></input>
          </section>

          <section>
          <label htmlFor='address'>Street Address</label><br/>
          <input type='text' placeholder='address'></input>
          <label htmlFor='city'>City</label><br/> 
          <input type='text' placeholder='city'></input>
          <label htmlFor='state'>State</label><br/>
          <input type='text' placeholder='state'></input>
          <label htmlFor='zip-code'>Zip code</label><br/>
          <input type='number' placeholder='zip-code'></input>
          <label htmlFor='ssn'>Social Security Number</label><br/>
          <input type='number' placeholder='xxx-xxx-xxx' id='ssn'></input>
          </section>
          </div>
          <label htmlFor='reason'>Reason for visit?</label>
          <textarea id='reason'></textarea>
          
          <label htmlFor='history'>Medical History</label>
          <textarea id='history'></textarea>
          <section className='check-in'>
          <input type='button' value='Close' onClick={()=>setLoadForm(false)}></input>
          <input type='submit' value='Submit' id='submitForm' onClick={()=>setLoadForm(false)}></input>
          </section>
          </form>
          </div>
      )}
      </div>
    );
  }
  
  