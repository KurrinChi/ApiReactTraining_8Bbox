import EventCard from "./EventCard";

const events = [
  {
    eventName: "Wedding Shoot",
    eventType: "Photography",
    price: 15000,
    date: "March 25, 2025",
    duration: 6,
    downpaymentStatus: true,
  },
  {
    eventName: "Birthday Party",
    eventType: "Videography",
    price: 8000,
    date: "April 2, 2025",
    duration: 4,
    downpaymentStatus: false,
  },
  {
    eventName: "Birthday Party",
    eventType: "Same-DayEdit",
    price: 8000,
    date: "April 2, 2025",
    duration: 4,
    downpaymentStatus: true,
  },
  {
    eventName: "Birthday Party",
    eventType: "Videography",
    price: 8000,
    date: "April 2, 2025",
    duration: 4,
    downpaymentStatus: false,
  },
];

const UseProps = () => {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 p-5 gap-4 w-full">
      {events.map((event, index) => (
        <EventCard key={index} {...event} />
      ))}
    </div>
  );
};

export default UseProps;
