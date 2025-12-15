
import EventsList from "./UseProps.tsx";


function App() {
  return (
    <main className="min-h-screen bg-neutral-900 flex flex-col items-center py-8 px-2">
      <h1 className="text-4xl font-bold text-white mb-8">Events</h1>
      <EventsList />
    </main>
  );
}

export default App;
