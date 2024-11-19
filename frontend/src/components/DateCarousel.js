import React, { useState } from 'react';

// Centralized color styles for DateButtons
const colors = {
  default: 'bg-gray-200 text-gray-800',
  selected: 'bg-blue-500 text-white',
  hover: 'hover:bg-blue-500',
};

const getDateList = (days = 30) => {
  const dates = [];
  const today = new Date();
  for (let i = 0; i < days; i++) {
    const date = new Date();
    date.setDate(today.getDate() + i);
    dates.push(date);
  }
  return dates;
};

const DateButtons = () => {
  const dates = getDateList(5); // Generate 30 dates
  const todayString = new Date().toDateString(); // Current date as a string
  const [selectedDate, setSelectedDate] = useState(todayString); // Set today's date as selected by default

  return (
    <div className="grid grid-cols-5 gap-4 p-4 max-w-screen-md mx-auto">
      {dates.map((date, index) => {
        const isSelected = selectedDate === date.toDateString();
        return (
          <button
            key={index}
            onClick={() => setSelectedDate(date.toDateString())}
            className={`p-3 w-20 h-24 rounded-lg shadow transition-all duration-200 text-center ${
              isSelected ? colors.selected : colors.default
            } ${colors.hover}`}
          >
            <div className="text-lg font-semibold">{date.toDateString().slice(0, 3)}</div>
            <div className="text-xl font-bold">{date.getDate()}</div>
          </button>
        );
      })}
    </div>
  );
};

export default DateButtons;
