// axios.js

import axios from 'axios';

const instance = axios.create({
  baseURL:  'https://joeschmoe.io/api/v1/',  // Replace with your actual API base URL
  timeout: 5000,  // Timeout after 5 seconds
  headers: {
    'Content-Type': 'application/json',
    // Add any other headers as needed
  }
});

export default instance;
