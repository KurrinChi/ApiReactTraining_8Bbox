import React from "react";
import EventItem, { type EventProps } from "./EventCard";


interface Props {
  events: EventProps[];
  onEventClick: (event: EventProps) => void;
}

const EventList: React.FC<Props> = ({ events, onEventClick }) => {
  return (
    <div className="space-y-4">
      {events.map((event) => (
        <EventItem key={event.id} event={event} onClick={onEventClick} />
      ))}
    </div>
  );
};

export default EventList;
