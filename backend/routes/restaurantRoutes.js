const express = require('express');
const router = express.Router();
const { getRestaurants, getRestaurant, createRestaurant } = require('../controllers/restaurantController');

router.get('/', getRestaurants);
router.get('/:id', getRestaurant);
router.post('/', createRestaurant);

module.exports = router;