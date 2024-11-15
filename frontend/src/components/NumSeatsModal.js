import React from 'react';

const NumberOfTicketsModal = ({ isModalOpen, setIsModalOpen, seatCount, setSeatCount, setSelectedSeats }) => {

  if (!isModalOpen) return null;

  const handleConfirm = () => {
    setSeatCount(seatCount);
    setIsModalOpen(!isModalOpen);
  };

  const handleChange = (e) => {
    let value = Number(e.target.value);

    // Ensure the value stays within the range of 1 to 10
    if (value <= 10 && value>=1) {
      setSeatCount(value);
      setSelectedSeats([]);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center">
      <div className="bg-white p-6 rounded shadow-lg w-3/4 max-w-sm">
        <h2 className="text-2xl font-semibold mb-4 text-center">Select Number of Tickets</h2>
        <input
          type="number"
          min="1"
          max="10"
          value={seatCount}
          onChange={handleChange}
          className="w-full p-2 border rounded mb-4 text-center"
        />
        <button
          onClick={handleConfirm}
          className="w-full px-4 py-2 bg-blue-600 text-white rounded"
        >
          Confirm
        </button>
      </div>
    </div>
  );
};

export default NumberOfTicketsModal;
