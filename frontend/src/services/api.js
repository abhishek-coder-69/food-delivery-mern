import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

API.interceptors.request.use((req) => {
  const token = localStorage.getItem('token');
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

// User APIs
export const login = (formData) => API.post('/users/login', formData);
export const register = (formData) => API.post('/users/register', formData);
export const getProfile = () => API.get('/users/profile');

// Restaurant APIs
export const getRestaurants = () => API.get('/restaurants');
export const getRestaurant = (id) => API.get(`/restaurants/${id}`);

// Order APIs
export const createOrder = (orderData) => API.post('/orders', orderData);
export const getOrders = () => API.get('/orders');
export const getOrder = (id) => API.get(`/orders/${id}`);

// ADMIN APIs - NEW
export const getDashboardStats = () => API.get('/admin/stats');
export const getAllOrders = () => API.get('/admin/orders');
export const updateOrderStatus = (orderId, status) => API.put(`/admin/orders/${orderId}/status`, { status });
export const getAllUsers = () => API.get('/admin/users');

export const createRestaurant = (restaurantData) => API.post('/restaurants', restaurantData);
export const updateRestaurant = (id, restaurantData) => API.put(`/restaurants/${id}`, restaurantData);
export const deleteRestaurant = (id) => API.delete(`/restaurants/${id}`);

export const addMenuItem = (restaurantId, menuItem) => API.post(`/restaurants/${restaurantId}/menu`, menuItem);
export const updateMenuItem = (restaurantId, menuId, menuItem) => API.put(`/restaurants/${restaurantId}/menu/${menuId}`, menuItem);
export const deleteMenuItem = (restaurantId, menuId) => API.delete(`/restaurants/${restaurantId}/menu/${menuId}`);