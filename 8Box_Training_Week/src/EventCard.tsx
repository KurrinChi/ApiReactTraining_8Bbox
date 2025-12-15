import React from "react";

export interface EventProps {
  id: number;
  name: string;
  type: string;
  price: number;
  date: string;
  duration: string;
  downpaymentStatus: string;
}

interface Props {
  event: EventProps;
  onClick: (event: EventProps) => void;
}

const EventItem: React.FC<Props> = ({ event, onClick }) => {
  return (
    <div
      className="bg-white rounded-xl shadow-lg p-6 mb-6 transition hover:scale-105 hover:shadow-xl cursor-pointer border border-gray-200"
      onClick={() => onClick(event)}
    >
      <div className="flex items-center justify-between mb-2">
        <h2 className="font-bold text-xl text-blue-700">{event.name}</h2>
        <span
          className={`px-3 py-1 rounded-full text-xs font-semibold ${
            event.downpaymentStatus === "Paid"
              ? "bg-green-100 text-green-700"
              : "bg-yellow-100 text-yellow-700"
          }`}
        >
          {event.downpaymentStatus}
        </span>
      </div>
      <div className="flex flex-col gap-1 text-gray-700">
        <div className="flex justify-between">
          <span className="font-medium">Type:</span>
          <span>{event.type}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Price:</span>
          <span>${event.price}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Date:</span>
          <span>{event.date}</span>
        </div>
        <div className="flex justify-between">
          <span className="font-medium">Duration:</span>
          <span>{event.duration}</span>
        </div>
      </div>
    </div>
  );
};

export default EventItem;
