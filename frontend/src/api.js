import axios from 'axios';

const API_URL = '/api';

const api = axios.create({
  baseURL: API_URL,
});

export const setAuthHeader = (role) => {
  if (role === 'admin') {
    api.defaults.headers.common['role'] = 'admin';
  } else {
    delete api.defaults.headers.common['role'];
  }
};

export default api;
