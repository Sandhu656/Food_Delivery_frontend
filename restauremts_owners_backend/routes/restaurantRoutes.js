const express = require('express');
const {
  getPendingRestaurants,
  approveRestaurant,
  rejectRestaurant
} = require('../controllers/restaurantController');
const router = express.Router();

// Fetch all pending restaurants
router.get('/decision', getPendingRestaurants);

// Approve a restaurant
router.patch('/approve/:id', approveRestaurant);

// Reject a restaurant
router.delete('/reject/:id', rejectRestaurant);

module.exports = router;