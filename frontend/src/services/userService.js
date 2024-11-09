import axios from 'axios';

const API_URL = 'http://localhost:3001/users'; // Proxy through the API Gateway

const getUsers = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createUser = async (user) => {
  const response = await axios.post(API_URL, user);
  return response.data;
};

export default { getUsers, createUser };
