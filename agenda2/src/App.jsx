import Component from "./AvailableLsmSeeMore";

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
    <div className="min-h-screen w-screen bg-gray-900 p-4 sm:p-6 overflow-x-hidden flex flex-col justify-center items-center">
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
  );
}

export default App;
