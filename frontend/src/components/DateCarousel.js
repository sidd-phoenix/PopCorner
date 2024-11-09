import React, { useState } from 'react';

// Centralized color styles for DateCarousel
const colors = {
  default: 'bg-gray-200 text-gray-800',
  selected: 'bg-blue-500 text-white',
  hover: 'hover:bg-blue-500',
  arrowButton: 'px-3 py-2 rounded bg-gray-300 text-gray-500 hover:bg-gray-400 focus:outline-none',
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

const DateCarousel = () => {
  const dates = getDateList(30); // Total number of dates
  const todayString = new Date().toDateString(); // Current date as a string
  const [startIndex, setStartIndex] = useState(0); // Index to start displaying dates from
  const [selectedDate, setSelectedDate] = useState(todayString); // Set today's date as selected by default

  // Show 5 dates at a time
  const visibleDates = dates.slice(startIndex, startIndex + 5);

  // Move carousel left
  const handleLeftClick = () => {
    if (startIndex > 0) {
      setStartIndex(startIndex - 1);
    }
  };

  // Move carousel right
  const handleRightClick = () => {
    if (startIndex < dates.length - 5) {
      setStartIndex(startIndex + 1);
    }
  };

  return (
    <div className="flex items-center m-2">
      {/* Left Arrow */}
      <button
        onClick={handleLeftClick}
        className={colors.arrowButton}
      >
        &#9664;
      </button>

      {/* Carousel Container with Hidden Overflow */}
      <div className="w-full max-w-xs overflow-hidden">
        <div
          className="flex transition-transform duration-300"
          style={{ transform: `translateX(-${startIndex * 72}px)` }} // Adjusting translate value for correct spacing
        >
          {visibleDates.map((date, index) => {
            const isSelected = selectedDate === date.toDateString();
            return (
              <button
                key={index}
                onClick={() => setSelectedDate(date.toDateString())}
                className={`p-3 w-16 h-20 rounded-lg mx-2 transition-all duration-200 ${
                  isSelected ? colors.selected : colors.default
                } ${colors.hover}`}
              >
                <div className="text-lg font-semibold">{date.toDateString().slice(0, 3)}</div>
                <div>{date.getDate()}</div>
              </button>
            );
          })}
        </div>
      </div>

      {/* Right Arrow */}
      <button
        onClick={handleRightClick}
        className={colors.arrowButton}
      >
        &#9654;
      </button>
    </div>
  );
};

export default DateCarousel;
