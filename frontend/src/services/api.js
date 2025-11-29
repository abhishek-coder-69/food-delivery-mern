import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const getProfile = () => API.get('/users/profile');
export const getRestaurants = () => API.get('/restaurants');
export const getRestaurant = (id) => API.get(`/restaurants/${id}`);
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getOrders = () => API.get('/orders');
export const getOrder = (id) => API.get(`/orders/${id}`);