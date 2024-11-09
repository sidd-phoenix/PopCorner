import axios from 'axios';

// Url below is of the one request is sent for (i.e. the gateway)
// Proxy through the API Gateway
const API_URL = 'http://localhost:3001/movies';


const getMovies = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createMovie = async (movie) => {
  const response = await axios.post(API_URL, movie);
  return response.data;
};

export default { getMovies, createMovie };