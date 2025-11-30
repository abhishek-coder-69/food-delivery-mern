const express = require('express');
const router = express.Router();
const {
  getAllUsers,
  getAllOrders,
  updateOrderStatus,
  getDashboardStats
} = require('../controllers/adminController');
const auth = require('../middleware/auth');
const adminAuth = require('../middleware/adminAuth');

router.use(auth, adminAuth); // All routes require admin auth

router.get('/users', getAllUsers);
router.get('/orders', getAllOrders);
router.put('/orders/:id/status', updateOrderStatus);
router.get('/stats', getDashboardStats);

module.exports = router;