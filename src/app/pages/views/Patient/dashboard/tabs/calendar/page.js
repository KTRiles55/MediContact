"use client";

import { useState } from "react";
import { db } from "../../../../../../../../scripts/firebaseConfig";
import "./calendar.css";
import { doc, updateDoc } from "firebase/firestore";
import { useSearchParams } from "next/navigation";

export default function CalendarPage() {
  const [currentMonth, setCurrentMonth] = useState(0);
  const [selectedSlots, setSelectedSlots] = useState([]);
  const [activeDay, setActiveDay] = useState(null);
  const searchParams = useSearchParams();

  const monthNames = [
    "January", "February", "March", "April", "May", "June",
    "July", "August", "September", "October", "November", "December"
  ];

  const days = getDaysInMonth(currentMonth, 2025);

  const toggleSlot = (slot) => {
    if (selectedSlots.includes(slot)) {
      setSelectedSlots(selectedSlots.filter((s) => s !== slot));
    } else if (selectedSlots.length < 3) {
      setSelectedSlots([...selectedSlots, slot]);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedSlots.length === 0) {
      alert("Select at least one slot");
      return;
    }

    const docId = searchParams.get("docId");
    if (!docId) {
      alert("Missing appointment reference. Please check in first.");
      return;
    }

    try {
      const timeSlots = selectedSlots.map(slot => ({
        time: slot,
        status: "pending"
      }));

      const payload = {
        timeSlots,
        submittedAt: new Date().toISOString(),
        status: "pending"
      };

      await updateDoc(doc(db, "appointments", docId), payload);
      alert("Time slots submitted!");
      setSelectedSlots([]);
    } catch (err) {
      console.error("Error updating Firestore:", err);
      alert("Failed to submit timeslots.");
    }
  };

  return (
    <div className="calendar-container">
      <form onSubmit={handleSubmit}>
        <div className="calendar-header">
          <button type="button" disabled={currentMonth === 0} onClick={() => setCurrentMonth(m => m - 1)}>Previous</button>
          <h2>{monthNames[currentMonth]} 2025</h2>
          <button type="button" disabled={currentMonth === 11} onClick={() => setCurrentMonth(m => m + 1)}>Next</button>
        </div>

        <div className="calendar-grid">
          {["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].map(day => (
            <strong key={day}>{day}</strong>
          ))}

          {days.map((day, index) => (
            <div key={index} className="day-cell">
              {day ? (
                <>
                  <div onClick={() => setActiveDay(day.toISOString())}>
                    {day.getDate()}
                  </div>
                  {activeDay === day.toISOString() && [14, 15, 16].map(hour => {
                    const slot = new Date(day);
                    slot.setHours(hour, 0, 0, 0);
                    const iso = slot.toISOString();
                    return (
                      <button
                        key={iso}
                        type="button"
                        onClick={() => toggleSlot(iso)}
                        className={`time-slot ${selectedSlots.includes(iso) ? "selected" : ""}`}
                      >
                        {slot.toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </button>
                    );
                  })}
                </>
              ) : null}
            </div>
          ))}
        </div>

        <div className="submit-row">
          <button type="submit" className="submit-btn">Submit</button>
        </div>
      </form>
    </div>
  );
}

function getDaysInMonth(month, year) {
  const days = [];
  const date = new Date(year, month, 1);
  const startDay = date.getDay();

  for (let i = 0; i < startDay; i++) days.push(null);
  while (date.getMonth() === month) {
    days.push(new Date(date));
    date.setDate(date.getDate() + 1);
  }
  return days;
}