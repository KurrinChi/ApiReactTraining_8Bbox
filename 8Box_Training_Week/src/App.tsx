import React from "react";
import EventList from "./EventList";
import { type EventProps } from "./EventCard";


const App: React.FC = () => {
  const events: EventProps[] = [
    {
      id: 1,
      name: "Concert",
      type: "Music",
      price: 50,
      date: "2025-12-20",
      duration: "2 hours",
      downpaymentStatus: "Paid",
    },
    {
      id: 2,
      name: "Workshop",
      type: "Education",
      price: 30,
      date: "2025-12-22",
      duration: "3 hours",
      downpaymentStatus: "Pending",
    },
    {
      id: 3,
      name: "Meet & Greet",
      type: "Social",
      price: 70,
      date: "2025-12-25",
      duration: "1.5 hours",
      downpaymentStatus: "Paid",
    },
  ];

  const handleEventClick = (event: EventProps) => {
    alert(`You clicked on: ${event.name}`);
  };

  return (
    <div className="max-w-md mx-auto mt-10">
      <h1 className="text-2xl font-bold mb-6 text-center">Event List</h1>
      <EventList events={events} onEventClick={handleEventClick} />
    </div>
  );
};

export default App;
