import axios from 'axios';

const API_URL = 'http://localhost:3001/snacks'; // Proxy through the API Gateway

const getSnacks = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createSnack = async (snack) => {
  const response = await axios.post(API_URL, snack);
  return response.data;
};

export default { getSnacks, createSnack };
