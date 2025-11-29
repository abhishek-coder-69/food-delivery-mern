const mongoose = require('mongoose');

const menuItemSchema = new mongoose.Schema({
  name: String,
  description: String,
  price: Number,
  category: String,
  image: String,
  isVeg: Boolean
});

const restaurantSchema = new mongoose.Schema({
  name: { type: String, required: true },
  description: String,
  image: String,
  rating: { type: Number, default: 0 },
  deliveryTime: String,
  cuisine: [String],
  menu: [menuItemSchema],
  address: String,
  createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Restaurant', restaurantSchema);