import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: 'http://127.0.0.1:8000', // Replace with your API base URL
  timeout: 10000, // Optional: Set a timeout for requests
  // withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
    'ngrok-skip-browser-warning': '69420'
  },
});

export default axiosInstance;
