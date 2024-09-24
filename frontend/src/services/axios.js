import axios from 'axios';

const Api = axios.create({
  baseURL: process.env.REACT_APP_FRONTEND_URL || "http://localhost:5000",
  withCredentials: true
});

export default Api;
