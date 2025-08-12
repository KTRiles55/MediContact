"use client";

import { useEffect, useState } from "react";
import { db } from "../../../../../../scripts/firebaseConfig";
import {
  collection,
  query,
  where,
  getDoc,
  getDocs,
  updateDoc,
  doc,
} from "firebase/firestore";
import "./page.css";

export default function DoctorDashboard() {
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchAppointments = async () => {
      const q = query(collection(db, "appointments"), where("status", "==", "pending"));
      const snapshot = await getDocs(q);
      const data = snapshot.docs.map((docSnap) => ({
        id: docSnap.id,
        ...docSnap.data(),
      }));
      setAppointments(data);
    };

    fetchAppointments();
  }, []);

  const updateStatus = async (docId, slotTime, newStatus) => {
    try {
      const docRef = doc(db, "appointments", docId);
      const snapshot = await getDoc(docRef);
      const data = snapshot.data();

      const updatedTimeSlots = data.timeSlots.map(slotObj => {
        const time = typeof slotObj === "string" ? slotObj : slotObj.time;
        if (time === slotTime) {
          return { time, status: newStatus };
        }
        return slotObj;
      });

      await updateDoc(docRef, { timeSlots: updatedTimeSlots });

      setAppointments(prev =>
        prev.map(appt => {
          if (appt.id !== docId) return appt;
          return {
            ...appt,
            timeSlots: updatedTimeSlots,
          };
        })
      );
    } catch (err) {
      console.error("Failed to update:", err);
    }
  };

  return (
    <div className="dashboard-container">
      <h1>Doctor Dashboard</h1>
      <div className="scroll-area">
      {appointments.map((appt) =>
        appt.timeSlots?.map((slotObj, index) => (
          <div className="card" key={`${appt.id}-${index}`}>
            <p><strong>Email:</strong> {appt.email}</p>
            <p><strong>Patient:</strong> {appt.patientName}</p>
            <p><strong>Reason:</strong> {appt.reasonForVisit}</p>
            <p><strong>History:</strong> {appt.medicalHistory}</p>
            <p><strong>Time:</strong> {new Date(slotObj.time || slotObj).toLocaleString()}</p>
            <p><strong>Status:</strong> {slotObj.status || "pending"}</p>

            <div className="buttons">
              <button
                className="approve"
                onClick={() => updateStatus(appt.id, slotObj.time || slotObj, `approved for ${new Date(slotObj.time || slotObj).toLocaleString()}`)}
              >
                Approve
              </button>
              <button
                className="decline"
                onClick={() => updateStatus(appt.id, slotObj.time || slotObj, "declined")}
              >
                Decline
              </button>
            </div>
          </div>
        ))
      )}
      </div>
    </div>
  );
}