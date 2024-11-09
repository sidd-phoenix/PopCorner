import React, { useState } from 'react';

const TicketPopup = ({ isOpen, onClose, onConfirm }) => {
  const [ticketCount, setTicketCount] = useState(1);

  if (!isOpen) return null; // Render nothing if the popup is closed

  // Handle ticket selection change
  const handleChange = (event) => {
    setTicketCount(Number(event.target.value));
  };

  // Confirm ticket selection
  const handleConfirm = () => {
    onConfirm(ticketCount);
    onClose(); // Close popup after confirming
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-80">
        <h3 className="text-xl font-semibold mb-4 text-center">Select Number of Tickets</h3>

        {/* Dropdown for ticket selection */}
        <select
          value={ticketCount}
          onChange={handleChange}
          className="w-full p-2 border border-gray-300 rounded mb-4"
        >
          {[...Array(10)].map((_, index) => (
            <option key={index} value={index + 1}>
              {index + 1} Ticket{index + 1 > 1 ? 's' : ''}
            </option>
          ))}
        </select>

        {/* Confirm and Cancel Buttons */}
        <div className="flex justify-end gap-4">
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-300 rounded text-gray-700 hover:bg-gray-400"
          >
            Cancel
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default TicketPopup;
