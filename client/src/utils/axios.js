import axios from 'axios';

const instance = axios.create({
  baseURL: '/',  // Use relative URL since Vite proxy will handle it
  timeout: 5000,  // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers as needed
  }
});

export default instance;