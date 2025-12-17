import React, { useEffect, useState } from "react";

function CounterApp() {
  const [count, setCount] = useState(0);
  const [bgColor, setBgColor] = useState("#fef9c3"); // yellow for even (0)

  useEffect(() => {
    if (count % 2 === 0) {
      setBgColor("#fef9c3"); // yellow-100
    } else {
      setBgColor("#22c55e"); // green-500
    }
  }, [count]);

  const incrementCount = () => setCount(count + 1);
  const decrementCount = () => setCount(count - 1);

  return (
    <div
      className="text-center p-4 rounded shadow-md text-gray-900 max-h-96 transition-all duration-300 hover:scale-105 hover:shadow-xl"
      style={{ backgroundColor: bgColor }}
    >
      <p>Current Count: {count}</p>

      <button
        onClick={incrementCount}
        className="text-white bg-blue-600 px-4 py-2 rounded mt-4 transition-all duration-300 hover:bg-blue-700 hover:scale-110"
      >
        Increment
      </button>

      <button
        onClick={decrementCount}
        className="text-white bg-red-600 px-4 py-2 rounded mt-4 ml-4 transition-all duration-300 hover:bg-red-700 hover:scale-110"
      >
        Decrement
      </button>
    </div>
  );
}
export default CounterApp;
