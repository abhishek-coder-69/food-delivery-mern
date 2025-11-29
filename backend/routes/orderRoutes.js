const express = require('express');
const router = express.Router();
const { createOrder, getUserOrders, getOrder } = require('../controllers/orderController');
const auth = require('../middleware/auth');

router.post('/', auth, createOrder);
router.get('/', auth, getUserOrders);
router.get('/:id', auth, getOrder);

module.exports = router;