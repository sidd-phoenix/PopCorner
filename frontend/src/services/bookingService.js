import axios from 'axios';

const API_URL = 'http://localhost:3001/bookings'; // Proxy through the API Gateway

const getBookings = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createBooking = async (booking) => {
  const response = await axios.post(API_URL, booking);
  return response.data;
};

export default { getBookings, createBooking };
