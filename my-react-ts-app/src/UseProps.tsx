import Event, {type EventProps} from "./EventCard";

const Events: EventProps[] = [
  {
    eventName: "Wedding Photography",
    eventType: "Wedding",
    price: 45000.5,
    date: "2025-02-14",
    duration: 8.5,
    downpaymentStatus: true,
  },
  {
    eventName: "Birthday Coverage",
    eventType: "Birthday",
    price: 12000,
    date: "2025-03-01",
    duration: 4,
    downpaymentStatus: false,
  },
  {
    eventName: "Corporate Seminar",
    eventType: "Corporate",
    price: 30000,
    date: "2025-03-15",
    duration: 6.75,
    downpaymentStatus: true,
  },
  {
    eventName: "Concert Photo Shoot",
    eventType: "Concert",
    price: 55000,
    date: "2025-04-10",
    duration: 10,
    downpaymentStatus: false,
  },
];



const Eventlist = () => {
  return (
    <div className="w-full max-w-6xl grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
      {Events.map((event, index) => (
        <Event
          key={index}
          eventName={event.eventName}
          eventType={event.eventType}
          price={event.price}
          date={event.date}
          duration={event.duration}
          downpaymentStatus={event.downpaymentStatus}
        />
      ))}
    </div>
  );
};


export default Eventlist;