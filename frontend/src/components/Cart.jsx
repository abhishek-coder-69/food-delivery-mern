import React, { useContext, useState } from 'react';
import { CartContext } from '../context/CartContext';
import { AuthContext } from '../context/AuthContext';
import { createOrder } from '../services/api';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const { cart, restaurant, updateQuantity, clearCart, getTotal } = useContext(CartContext);
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [address, setAddress] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleCheckout = async () => {
    if (!user) {
      navigate('/login');
      return;
    }

    if (!address.trim()) {
      setError('Please enter delivery address');
      return;
    }

    setLoading(true);
    setError('');

    try {
      const orderData = {
        restaurant: restaurant._id,
        items: cart.map(item => ({
          name: item.name,
          quantity: item.quantity,
          price: item.price
        })),
        totalAmount: getTotal(),
        deliveryAddress: address
      };

      await createOrder(orderData);
      clearCart();
      setAddress('');
      alert('Order placed successfully!');
      navigate('/orders');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to place order');
    } finally {
      setLoading(false);
    }
  };

  if (cart.length === 0) {
    return (
      <div className="cart-empty">
        <h3>Your cart is empty</h3>
        <p>Add items from restaurants to get started</p>
      </div>
    );
  }

  return (
    <div className="cart">
      <h2>Your Cart</h2>
      {restaurant && (
        <div className="cart-restaurant">
          <h3>{restaurant.name}</h3>
        </div>
      )}
      
      <div className="cart-items">
        {cart.map(item => (
          <div key={item._id} className="cart-item">
            <div className="cart-item-info">
              <h4>{item.name}</h4>
              <p>₹{item.price}</p>
            </div>
            <div className="cart-item-controls">
              <button onClick={() => updateQuantity(item._id, item.quantity - 1)}>-</button>
              <span>{item.quantity}</span>
              <button onClick={() => updateQuantity(item._id, item.quantity + 1)}>+</button>
            </div>
            <div className="cart-item-total">
              ₹{item.price * item.quantity}
            </div>
          </div>
        ))}
      </div>

      <div className="cart-total">
        <h3>Total: ₹{getTotal()}</h3>
      </div>

      <div className="cart-checkout">
        <input
          type="text"
          placeholder="Enter delivery address"
          value={address}
          onChange={(e) => setAddress(e.target.value)}
          className="address-input"
        />
        {error && <p className="error-message">{error}</p>}
        <button 
          onClick={handleCheckout}
          disabled={loading}
          className="checkout-btn"
        >
          {loading ? 'Placing Order...' : 'Place Order'}
        </button>
      </div>
    </div>
  );
};

export default Cart;