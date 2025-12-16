import EventList from "./UseProps";

function App() {
  return (
    <div className="min-h-screen w-screen bg-gray-900 p-4 sm:p-6 overflow-x-hidden">
      {/* App Header */}
      <header className="mb-8 sm:mb-6">
        <h1 className="text-3xl sm:text-2xl font-bold text-white text-center mb-2">
          Event List
        </h1>
        <p className="text-xs sm:text-sm text-gray-100 text-center">
          Upcoming and ongoing events
        </p>
      </header>

      {/* Main Content */}
      <main className="max-w-7xl mx-auto">
        <EventList />
      </main>
    </div>
  );
}

export default App;
