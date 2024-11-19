import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const CinemaCard = () => {
  const { id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const [theater,setTheater]=useState(null);
  
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const res = await axios.get(`http://localhost:3001/theaters/movie/${id}`);
      setTheater(res.data); // Store the correct part of the response
    } catch (error) {
      console.error("Error fetching data:", error);
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };
  
  useEffect(()=>{
    fetchData();
  },[])

  return (
    <div>
      {loading ? (
        <Loading />
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : theater && <Card data={theater} />}
    </div>
  );
  
};

const Card = ({ data }) => {
  const [selectedTime, setSelectedTime] = useState();
  const navigate = useNavigate();
  
  const handleTimeClick = (time) => {
    setSelectedTime(time);
    const currentPath = window.location.pathname;
    navigate(`${currentPath}/seatSelection`);
  };

  return (
    <div>
      {data.map((cinema, index) => (
        <div 
          key={index} 
          className="p-4 border border-gray-200 rounded-lg shadow-lg w-full mx-auto mb-6"
        >
          {/* Cinema Name and Address */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold">{cinema.name}</h2>
            <p className="text-gray-500">
              {cinema.location.address.street}, {cinema.location.address.city}, {cinema.location.address.state}
            </p>
          </div>

          {/* Time Buttons */}
          <div className="border-t border-gray-300 pt-4">
            {cinema.showtimes.map((showtime, showtimeIndex) => (
              <div key={showtimeIndex} className="mb-4">
                <div className="flex gap-2">
                  {showtime.times.map((time, timeIndex) => (
                    <button
                      key={timeIndex}
                      onClick={() => handleTimeClick(time.time)}
                      className={`px-4 py-2 rounded ${
                        selectedTime === time.time
                          ? 'border-blue-500 text-blue-600'
                          : 'border-gray-300 text-gray-500'
                      } border`}
                    >
                      {time.time}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      ))}
    </div>
  );
};



export default CinemaCard;
