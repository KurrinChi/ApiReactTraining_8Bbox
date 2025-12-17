import Component from "./AvailableLsmSeeMore";
import CounterApp from "./counterApp";

function App() {
  // Mock values to pass as props
  const event = [
    {
      mockEvent: "React Training",
      mockVenue: "Online",
      mockDate: "2025-12-16",
      mockType: "Workshop",
      mockStatus: false,
    },
  ];

  return (
    <div className="min-h-screen w-screen bg-gray-900 p-4 sm:p-6 overflow-x-hidden gap-10 flex flex-row justify-center items-center">
      <div>
        <h3 className="font-bold text-center text-3xl mb-5">Event Overview</h3>
        <div className="w-96">
          <Component
            event={event[0].mockEvent}
            venue={event[0].mockVenue}
            date={event[0].mockDate}
            type={event[0].mockType}
            status={event[0].mockStatus}
          />
        </div>
      </div>

      <div>
        <h3 className="font-bold text-center text-3xl mb-5">
          Counter Application
        </h3>
        <CounterApp />
      </div>
    </div>
  );
}

export default App;
