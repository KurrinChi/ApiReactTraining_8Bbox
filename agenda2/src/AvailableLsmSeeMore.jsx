import React, { useState, useEffect } from "react";

function Component({ event, venue, date, type, status: initialStatus }) {
  const [status, setStatus] = useState(initialStatus);
  const [bgColor, setBgColor] = useState(initialStatus ? "#22c55e" : "#fef9c3"); // green or light yellow

  useEffect(() => {
    if (status) {
      setBgColor("#22c55e"); // green-500
    } else {
      setBgColor("#fef9c3"); // yellow-100
    }
  }, [status]);

  const updateStatus = () => {
    setStatus(!status);
  };

  return (
    <div
      className="text-center p-4 rounded shadow-md text-gray-900 max-h-96 transition-all duration-300 hover:scale-105 hover:shadow-xl"
      style={{ backgroundColor: bgColor }}
    >
      <p>Event Name: {event}</p>
      <p>Event venue: {venue}</p>
      <p>Event date: {date}</p>
      <p>Event type: {type}</p>
      <p>Event status: {status ? "Confirmed" : "Pending"}</p>

      <button
        onClick={updateStatus}
        className="text-white bg-blue-600 px-4 py-2 rounded mt-4 transition-all duration-300 hover:bg-blue-700 hover:scale-110"
      >
        Confirm
      </button>
    </div>
  );
}
export default Component;
