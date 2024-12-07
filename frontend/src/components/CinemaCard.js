import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import Loading from './Loading';

const CinemaCard = () => {
  const { m_id } = useParams();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null); // State to handle errors
  const [theater,setTheater]=useState(null);
  
  
  const fetchData = async () => {
    setLoading(true);
    setError(null);
  
    try {
      const res = await axios.get(`http://localhost:3001/theaters/movie/${m_id}`);
      setTheater(res.data);
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
  const {m_id}=useParams();
  const [selectedTime, setSelectedTime] = useState(null);
  const navigate = useNavigate();
  
  const handleTimeClick = (time, cinemaId) => {
    setSelectedTime(time);
    const currentPath = window.location.pathname;
    navigate(`${currentPath}/${cinemaId}`);
  };

  return (
    <div>
    {data && data.map((cinema, index) => (
      <div 
        key={index} 
        className="p-4 border border-gray-200 rounded-lg shadow-lg w-full mx-auto mb-6"
      >

        {/* Cinema Name and Address */}
        <div className="mb-4">
          <h2 className="text-xl font-semibold">{cinema.name}</h2>
          <p className="text-gray-500">
            {cinema.address.street}, {cinema.address.city}, {cinema.address.state}, {cinema.address.zipCode}
          </p>
        </div>

        {/* Time Buttons */}
        <div className="border-t border-gray-300 pt-4">
          {cinema.movies
            .filter((movie) => movie.movieId === m_id) // Filter for the relevant movie
            .map((movie) => (
              <div key={movie._id} className="mb-4">
                <div className="flex gap-2 flex-wrap">
                  {movie.times.map((time, timeIndex) => (
                    <button
                      key={timeIndex}
                      onClick={() => handleTimeClick(time.time, cinema._id)}
                      className={`px-4 py-2 rounded border`}
                    >
                      {time.time} - ₹{time.price}
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
