import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="home">
      <div className="hero-section">
        <h1>Order Food Online</h1>
        <p>Delicious food delivered to your doorstep</p>
        <Link to="/restaurants" className="cta-button">
          Explore Restaurants
        </Link>
      </div>

      <div className="features">
        <div className="feature-card">
          <div className="feature-icon">🚀</div>
          <h3>Fast Delivery</h3>
          <p>Get your food delivered in 30 minutes</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">🍽️</div>
          <h3>Wide Selection</h3>
          <p>Choose from hundreds of restaurants</p>
        </div>
        <div className="feature-card">
          <div className="feature-icon">💳</div>
          <h3>Easy Payment</h3>
          <p>Multiple payment options available</p>
        </div>
      </div>

      <div className="info-section">
        <h2>How It Works</h2>
        <div className="steps">
          <div className="step">
            <span className="step-number">1</span>
            <h3>Choose Restaurant</h3>
            <p>Browse and select your favorite restaurant</p>
          </div>
          <div className="step">
            <span className="step-number">2</span>
            <h3>Add to Cart</h3>
            <p>Select items from the menu</p>
          </div>
          <div className="step">
            <span className="step-number">3</span>
            <h3>Place Order</h3>
            <p>Enter address and confirm your order</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;