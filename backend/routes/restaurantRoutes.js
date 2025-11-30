const express = require('express');
const router = express.Router();
const {
  getRestaurants,
  getRestaurant,
  createRestaurant,
  updateRestaurant,
  deleteRestaurant,
  addMenuItem,
  updateMenuItem,
  deleteMenuItem
} = require('../controllers/restaurantController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

// Public routes
router.get('/', getRestaurants);
router.get('/:id', getRestaurant);

// Admin only routes
router.post('/', auth, adminAuth, createRestaurant);
router.put('/:id', auth, adminAuth, updateRestaurant);
router.delete('/:id', auth, adminAuth, deleteRestaurant);

// Menu management (admin only)
router.post('/:id/menu', auth, adminAuth, addMenuItem);
router.put('/:restaurantId/menu/:menuId', auth, adminAuth, updateMenuItem);
router.delete('/:restaurantId/menu/:menuId', auth, adminAuth, deleteMenuItem);

module.exports = router;