import axios from 'axios';

const API_URL = 'http://localhost:3001/payments'; // Proxy through the API Gateway

const getPayments = async () => {
  const response = await axios.get(API_URL);
  return response.data;
};

const createPayment = async (payment) => {
  const response = await axios.post(API_URL, payment);
  return response.data;
};

export default { getPayments, createPayment };
