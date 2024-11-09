import React, { useState } from 'react';

// Colors for each section and seat state
const colors = {
  gold: {
    seat: 'bg-yellow-300 text-black hover:bg-yellow-400',
    legend: 'bg-yellow-300'
  },
  silver: {
    seat: 'bg-gray-200 text-black hover:bg-gray-300',
    legend: 'bg-gray-200'
  },
  recliner: {
    seat: 'bg-purple-300 text-white hover:bg-purple-400',
    legend: 'bg-purple-300'
  },
  unavailable: 'bg-gray-300 text-white cursor-not-allowed',
  selected: 'bg-green-500 text-white',
};

// Rows for each seating section
const goldRows = [
  ['A1', 'A2', 'A3', 'A4', 'A5', 'A6', 'A7', 'A8'],
  ['B1', 'B2', 'B3', 'B4', 'B5', 'B6', 'B7', 'B8'],
];

const silverRows = [
  ['C1', 'C2', 'C3', 'C4', 'C5', 'C6', 'C7', 'C8'],
  ['D1', 'D2', 'D3', 'D4', 'D5', 'D6', 'D7', 'D8'],
];

const reclinerRows = [
  ['E1', 'E2', 'E3', 'E4', 'E5', 'E6'],
];

// Seats marked as unavailable
const unavailableSeats = ['A4', 'B2', 'C6', 'D5'];

const SeatLayout = () => {
  const [selectedSeats, setSelectedSeats] = useState([]);

  // Toggle seat selection
  const handleSeatClick = (seat) => {
    if (unavailableSeats.includes(seat)) return;

    setSelectedSeats((prevSelectedSeats) =>
      prevSelectedSeats.includes(seat)
        ? prevSelectedSeats.filter((s) => s !== seat) // Deselect seat
        : [...prevSelectedSeats, seat] // Select seat
    );
  };

  // Helper function to render rows of seats
  const renderRows = (rows, sectionColor) => (
    rows.map((row, rowIndex) => (
      <div key={rowIndex} className="flex justify-center gap-2">
        {row.map((seat) => (
          <button
            key={seat}
            onClick={() => handleSeatClick(seat)}
            className={`w-12 h-12 rounded ${
              unavailableSeats.includes(seat)
                ? colors.unavailable // Unavailable seat styling
                : selectedSeats.includes(seat)
                ? colors.selected // Selected seat styling
                : sectionColor // Section-specific seat styling
            } border text-sm font-medium`}
            disabled={unavailableSeats.includes(seat)}
          >
            {seat}
          </button>
        ))}
      </div>
    ))
  );

  return (
    <div className="p-4 max-w-lg mx-auto">
      <h2 className="text-2xl font-semibold mb-4 text-center">Select Your Seats</h2>

      {/* Curved screen at the top */}
      <div className="flex justify-center mb-4">
        <div className="w-3/4 h-6 bg-gray-300 rounded-b-full text-center text-sm font-semibold text-gray-600">
          Screen
        </div>
      </div>

      {/* Gold Section */}
      <h3 className="text-xl font-semibold mb-2 text-center">Gold Section</h3>
      <div className="grid gap-2 mb-4">
        {renderRows(goldRows, colors.gold.seat)}
      </div>

      {/* Silver Section */}
      <h3 className="text-xl font-semibold mb-2 text-center">Silver Section</h3>
      <div className="grid gap-2 mb-4">
        {renderRows(silverRows, colors.silver.seat)}
      </div>

      {/* Recliner Section */}
      <h3 className="text-xl font-semibold mb-2 text-center">Recliner Section</h3>
      <div className="grid gap-2 mb-4">
        {renderRows(reclinerRows, colors.recliner.seat)}
      </div>

      <div className="mt-6 text-center">
        <h3 className="text-lg font-semibold mb-2">Legend</h3>
        <div className="flex justify-center gap-4">
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 ${colors.unavailable} border rounded`}></div>
            <span>Unavailable</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 ${colors.gold.legend} border rounded`}></div>
            <span>Gold</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 ${colors.silver.legend} border rounded`}></div>
            <span>Silver</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 ${colors.recliner.legend} border rounded`}></div>
            <span>Recliner</span>
          </div>
          <div className="flex items-center gap-2">
            <div className={`w-4 h-4 ${colors.selected} border rounded`}></div>
            <span>Selected</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SeatLayout;
