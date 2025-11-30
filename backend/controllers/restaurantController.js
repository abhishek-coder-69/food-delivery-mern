const Restaurant = require('../models/Restaurant');

// Get all restaurants (public)
exports.getRestaurants = async (req, res) => {
  try {
    const restaurants = await Restaurant.find();
    res.json(restaurants);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Get single restaurant (public)
exports.getRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Create restaurant (admin only)
exports.createRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.create(req.body);
    res.status(201).json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error', error: error.message });
  }
};

// Update restaurant (admin only)
exports.updateRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndUpdate(
      req.params.id,
      req.body,
      { new: true, runValidators: true }
    );
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete restaurant (admin only)
exports.deleteRestaurant = async (req, res) => {
  try {
    const restaurant = await Restaurant.findByIdAndDelete(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    res.json({ message: 'Restaurant deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Add menu item to restaurant (admin only)
exports.addMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.id);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    restaurant.menu.push(req.body);
    await restaurant.save();
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Update menu item (admin only)
exports.updateMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    const menuItem = restaurant.menu.id(req.params.menuId);
    if (!menuItem) {
      return res.status(404).json({ message: 'Menu item not found' });
    }
    
    Object.assign(menuItem, req.body);
    await restaurant.save();
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};

// Delete menu item (admin only)
exports.deleteMenuItem = async (req, res) => {
  try {
    const restaurant = await Restaurant.findById(req.params.restaurantId);
    if (!restaurant) {
      return res.status(404).json({ message: 'Restaurant not found' });
    }
    
    restaurant.menu.pull(req.params.menuId);
    await restaurant.save();
    
    res.json(restaurant);
  } catch (error) {
    res.status(500).json({ message: 'Server error' });
  }
};