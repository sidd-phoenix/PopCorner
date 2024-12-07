import React, { useEffect, useState } from "react";
import axios from "axios";
import NumberOfTicketsModal from "./NumSeatsModal";
import Loading from "./Loading";
import { useParams } from "react-router-dom";

const Topbar = ({seatCount, setSeatCount, isModalOpen, setIsModalOpen, setSelectedSeats}) => {

  const [data, setData]=useState(null);
  const [theater, setTheater]=useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const{m_id,t_id}=useParams();



  const fetchData = async () => {
    setLoading(true);
    setError(null); // Clear any previous errors

    try {
      const res = await axios.get(`http://localhost:3001/movies/${m_id}`);
      const theaterData=await axios.get(`http://localhost:3007/theaters/${t_id}`);
      setData(res.data);
      setTheater(theaterData.data);
    } catch (err) {
      setError("Failed to fetch movie data. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  const handleSeatClick = () => {
    setIsModalOpen(!isModalOpen);
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
      ) : (
        data &&
        <div className="border-2 border-gray bg-base-100 px-4 py-2 flex items-center justify-between">

          <NumberOfTicketsModal 
              isModalOpen={isModalOpen}
              setIsModalOpen={setIsModalOpen}
              seatCount={seatCount}
              setSeatCount={setSeatCount}
              setSelectedSeats={setSelectedSeats}
          />

          {/* Left Section */}
          <div className="left-section">
              <h1 className="text-2xl font-bold">{data.title}</h1>
              <p className="text-gray-500">{theater.name}</p>
              <p className="text-gray-500">{theater.address.street}, {theater.address.city}</p>
          </div>

          {/* Right Section */}
          <div className="right-section">
              <div className="flex btn" onClick={handleSeatClick}>
                  <span className="text-m">
                  {seatCount} {seatCount > 1 ? "Tickets" : "Ticket"}
                  </span>
                  <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="16" /* Adjust the width */
                  height="16" /* Adjust the height */
                  viewBox="0 0 12 12"
                  fill="none"
                  className="ml-1"
                  >
                  <path
                      fillRule="evenodd"
                      clipRule="evenodd"
                      d="M9.33553 0.667038C9.86628 0.663445 10.3765 0.872109 10.7526 1.24661L10.7536 1.24769C11.1283 1.62367 11.337 2.13383 11.3335 2.66459C11.3299 3.19456 11.1149 3.70112 10.7362 4.07184L4.36668 10.4414C4.31723 10.4908 4.25541 10.5261 4.18768 10.5434L1.15372 11.3216C1.02013 11.3559 0.878365 11.3171 0.780834 11.2195C0.683303 11.122 0.644488 10.9803 0.678735 10.8467L1.45645 7.81271C1.46062 7.79644 1.46582 7.78051 1.47201 7.765C1.49101 7.71707 1.51989 7.67213 1.55863 7.63332C1.5615 7.63044 1.5644 7.62763 1.56733 7.62486L7.92814 1.26405C8.29899 0.885543 8.80558 0.670626 9.33553 0.667038ZM2.04291 8.66817L1.59853 10.4017L3.3337 9.9567L2.04291 8.66817ZM4.09271 9.61154L2.3871 7.90891L8.02348 2.27256L9.72758 3.97666L4.09271 9.61154ZM10.2013 1.79914C9.97281 1.57193 9.66305 1.44535 9.34082 1.44753C9.06135 1.44942 8.79258 1.54804 8.57913 1.7244L10.2758 3.42104C10.4523 3.20766 10.5511 2.93885 10.553 2.65931C10.5551 2.33715 10.4285 2.02748 10.2013 1.79914Z"
                      fill="#666"
                  ></path>
                  </svg>
              </div>
          </div>
      
        </div>
      )
      }
    </div>
    
  );
};

export default Topbar;
