import axios from 'axios';

const service = axios.create({
  baseURL: 'https://localhost:7251',
  timeout: 5000,
});
export default service;
