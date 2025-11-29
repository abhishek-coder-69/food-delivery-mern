import React from 'react';

const RestaurantCard = ({ restaurant, onClick }) => {
  return (
    <div className="restaurant-card" onClick={onClick}>
      <img 
        src={restaurant.image || 'https://via.placeholder.com/300'} 
        alt={restaurant.name}
        className="restaurant-image"
      />
      <div className="restaurant-info">
        <h3>{restaurant.name}</h3>
        <p className="restaurant-cuisine">
          {restaurant.cuisine?.join(', ')}
        </p>
        <div className="restaurant-meta">
          <span className="rating">⭐ {restaurant.rating}</span>
          <span className="delivery-time">🕐 {restaurant.deliveryTime}</span>
        </div>
        <p className="restaurant-description">{restaurant.description}</p>
      </div>
    </div>
  );
};

export default RestaurantCard;