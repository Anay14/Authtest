// api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://your-backend-url.com/api'
});

export default api;
