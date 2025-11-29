import React, { useState, useEffect, useContext } from 'react';
import RestaurantCard from '../components/RestaurantCard';
import Cart from '../components/Cart';
import { getRestaurants } from '../services/api';
import { CartContext } from '../context/CartContext';

const Restaurants = () => {
  const [restaurants, setRestaurants] = useState([]);
  const [selectedRestaurant, setSelectedRestaurant] = useState(null);
  const [loading, setLoading] = useState(true);
  const { addToCart } = useContext(CartContext);

  useEffect(() => {
    fetchRestaurants();
  }, []);

  const fetchRestaurants = async () => {
    try {
      const { data } = await getRestaurants();
      setRestaurants(data);
    } catch (error) {
      console.error('Error fetching restaurants:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleRestaurantClick = (restaurant) => {
    setSelectedRestaurant(restaurant);
  };

  const handleAddToCart = (item) => {
    addToCart(item, selectedRestaurant);
  };

  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  return (
    <div className="restaurants-page">
      <div className="restaurants-section">
        <h1>Available Restaurants</h1>
        {restaurants.length === 0 ? (
          <p>No restaurants available. Please add some restaurants from the backend.</p>
        ) : (
          <div className="restaurants-grid">
            {restaurants.map(restaurant => (
              <RestaurantCard
                key={restaurant._id}
                restaurant={restaurant}
                onClick={() => handleRestaurantClick(restaurant)}
              />
            ))}
          </div>
        )}
      </div>

      {selectedRestaurant && (
        <div className="menu-modal">
          <div className="menu-content">
            <button 
              className="close-btn"
              onClick={() => setSelectedRestaurant(null)}
            >
              ✕
            </button>
            <h2>{selectedRestaurant.name}</h2>
            <p>{selectedRestaurant.description}</p>
            
            <h3>Menu</h3>
            <div className="menu-items">
              {selectedRestaurant.menu && selectedRestaurant.menu.length > 0 ? (
                selectedRestaurant.menu.map(item => (
                  <div key={item._id} className="menu-item">
                    <div className="menu-item-info">
                      <h4>{item.name}</h4>
                      <p>{item.description}</p>
                      <p className="menu-item-price">₹{item.price}</p>
                    </div>
                    <button 
                      className="add-btn"
                      onClick={() => handleAddToCart(item)}
                    >
                      Add +
                    </button>
                  </div>
                ))
              ) : (
                <p>No menu items available</p>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="cart-sidebar">
        <Cart />
      </div>
    </div>
  );
};

export default Restaurants;