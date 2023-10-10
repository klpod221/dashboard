import axios from 'axios';
import store from '../store';
import router from '../router';

const token = localStorage.getItem('token');

axios.defaults.baseURL =
  import.meta.env.VITE_API_ENDPOINT || 'https://klpod221.vercel.app/';
axios.defaults.headers.common['Content-Type'] = 'application/json';
axios.defaults.headers.common['Accept'] = 'application/json';

axios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);

axios.interceptors.response.use(
  (response) => {
    return response.data ? response.data : response;
  },

  (error) => {
    if (error.response.status === 401) {
      store.dispatch('auth/logout');
      router.push({ name: 'login' });
    }
    return Promise.reject(error);
  }
);

export default axios;
