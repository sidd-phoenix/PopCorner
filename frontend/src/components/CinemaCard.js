import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const CinemaCard = () => {
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate(); // Initialize navigate

  // List of available times
  const times = ["10:25 AM", "03:30 PM", "06:05 PM", "08:40 PM", "11:15 PM"];

  // Function to handle time selection
  const handleTimeClick = (time) => {
    setSelectedTime(time);
    const currentPath = window.location.pathname;
    navigate(`${currentPath}/seatSelection`); // Navigate to seat selection page
  };

  return (
    <div className="p-4 border border-gray-200 rounded-lg shadow-lg w-full mx-auto">
      {/* Cinema Name and Address */}
      <div className="mb-4">
        <h2 className="text-xl font-semibold">PVR Acropolis Ahemdabad</h2>
        <p className="text-gray-500">PVR Acropolis Mall, Thaltej Cross Road, Near Gurdwara, Ahmedabad</p>
      </div>

      {/* Time Buttons */}
      <div className="border-t border-gray-300 pt-4">
        <h3 className="text-lg font-semibold mb-2">4DX</h3>
        <div className="flex flex-wrap gap-2">
          {times.map((time) => (
            <button
              key={time}
              onClick={() => handleTimeClick(time)}
              className={`px-4 py-2 rounded ${
                selectedTime === time 
                  ? 'border-blue-500 text-blue-600' // Selected time styling
                  : 'border-gray-300 text-gray-500'
              } border`}
            >
              {time}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CinemaCard;
