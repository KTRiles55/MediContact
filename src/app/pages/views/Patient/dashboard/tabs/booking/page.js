"use client"

import DashboardLayout from 'Components/DashboardLayout';
import { useState } from "react";
import { useRouter } from "next/navigation";
import { db } from "../../../../../../../../scripts/firebaseConfig";
import { collection, addDoc } from "firebase/firestore";

export default function BookingContent() {
  const [loadForm, setLoadForm] = useState(false);
  const router = useRouter();

  const [firstName, setFirstName] = useState('');
  const [middleName, setMiddleName] = useState('');
  const [lastName, setLastName] = useState('');
  const [phone, setPhone] = useState('');
  const [birthday, setBirthday] = useState('');
  const [ssn, setSSN] = useState('');

  const [street, setStreet] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  const [reasonForVisit, setReasonForVisit] = useState('');
  const [medicalHistory, setMedicalHistory] = useState('');

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
          {/*<script src=
          "https://cdnjs.cloudflare.com/ajax/libs/html2pdf.js/0.10.1/html2pdf.bundle.min.js">
        </script>*/}
          <h2 style={{textAlign:'center'}}>Check-In Form</h2>
          <form
            id="check-in-form"
            onSubmit={async (e) => {
              e.preventDefault();
              const patientData = {
                patientName: `${firstName} ${lastName}`,
                phone,
                birthday,
                ssn,
                address: { street, city, state, zip },
                reasonForVisit,
                medicalHistory
              };

              console.log("Submitting patient data:", patientData);

            /*  localStorage.setItem("fullPatientData", JSON.stringify(patientData));
              setLoadForm(false);
              router.push('/views/Patient/dashboard/tabs/calendar/calendar-page');*/
              try{
                const docReference = await addDoc(collection(db, "appointments"),{
                  ...patientData,
                  timeSlots: [],
                  status: "incomplete",
                });

                localStorage.setItem("apptDocId", docReference.id);
                setLoadForm(false);
                router.push(`/pages/views/Patient/dashboard/tabs/calendar?docId=${docReference.id}`);
              }
              catch(err){
                console.error("Error writing to database", err);
                alert("Failed to submit check-in.");
              }
            }}
          >
            <div className="table">
              <section>
                <label htmlFor="fname">First name</label><br />
                <input
                  type="text"
                  id="fname"
                  placeholder="John"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                />
                <label htmlFor="mname">Middle name</label><br />
                <input
                  type="text"
                  id="mname"
                  placeholder="S."
                  value={middleName}
                  onChange={(e) => setMiddleName(e.target.value)}
                />
                <label htmlFor="lname">Last name</label><br />
                <input
                  type="text"
                  id="lname"
                  placeholder="Doe"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                />
                <label htmlFor="phone-num">Phone number</label><br />
                <input
                  type="text"
                  id="phone-num"
                  placeholder="(xxx) xxx-xxxx"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                />
                <label htmlFor="birth">Birthday</label><br />
                <input
                  type="date"
                  id="birth"
                  value={birthday}
                  onChange={(e) => setBirthday(e.target.value)}
                />
              </section>

              <section>
                <label htmlFor="address">Street Address</label><br />
                <input
                  type="text"
                  id="address"
                  placeholder="address"
                  value={street}
                  onChange={(e) => setStreet(e.target.value)}
                />
                <label htmlFor="city">City</label><br />
                <input
                  type="text"
                  id="city"
                  placeholder="city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                />
                <label htmlFor="state">State</label><br />
                <input
                  type="text"
                  id="state"
                  placeholder="state"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                />
                <label htmlFor="zip-code">Zip code</label><br />
                <input
                  type="text"
                  id="zip-code"
                  placeholder="zip-code"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                />
                <label htmlFor="ssn">Social Security Number</label><br />
                <input
                  type="text"
                  id="ssn"
                  placeholder="xxx-xxx-xxx"
                  value={ssn}
                  onChange={(e) => setSSN(e.target.value)}
                />
              </section>
            </div>

            <label htmlFor="reason">Reason for visit?</label>
            <textarea
              id="reason"
              value={reasonForVisit}
              onChange={(e) => setReasonForVisit(e.target.value)}
            />

            <label htmlFor="history">Medical History</label>
            <textarea
              id="history"
              value={medicalHistory}
              onChange={(e) => setMedicalHistory(e.target.value)}
            />

            <section className="check-in">
              <input type="button" value="Close" onClick={() => setLoadForm(false)} />
              <input type="submit" value="Submit" id="submitForm" />
            </section>
          </form>
        </div>
      )}
    </div>
  );
}