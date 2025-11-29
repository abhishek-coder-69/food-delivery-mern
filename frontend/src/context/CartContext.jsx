import React, { createContext, useState, useEffect } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cart, setCart] = useState([]);
  const [restaurant, setRestaurant] = useState(null);

  useEffect(() => {
    const savedCart = localStorage.getItem('cart');
    const savedRestaurant = localStorage.getItem('restaurant');
    if (savedCart) setCart(JSON.parse(savedCart));
    if (savedRestaurant) setRestaurant(JSON.parse(savedRestaurant));
  }, []);

  const addToCart = (item, restaurantData) => {
    if (restaurant && restaurant._id !== restaurantData._id) {
      setCart([]);
      setRestaurant(restaurantData);
    } else if (!restaurant) {
      setRestaurant(restaurantData);
    }

    const existingItem = cart.find(cartItem => cartItem._id === item._id);
    let newCart;

    if (existingItem) {
      newCart = cart.map(cartItem =>
        cartItem._id === item._id
          ? { ...cartItem, quantity: cartItem.quantity + 1 }
          : cartItem
      );
    } else {
      newCart = [...cart, { ...item, quantity: 1 }];
    }

    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    localStorage.setItem('restaurant', JSON.stringify(restaurantData));
  };

  const removeFromCart = (itemId) => {
    const newCart = cart.filter(item => item._id !== itemId);
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
    
    if (newCart.length === 0) {
      setRestaurant(null);
      localStorage.removeItem('restaurant');
    }
  };

  const updateQuantity = (itemId, quantity) => {
    if (quantity <= 0) {
      removeFromCart(itemId);
      return;
    }

    const newCart = cart.map(item =>
      item._id === itemId ? { ...item, quantity } : item
    );
    setCart(newCart);
    localStorage.setItem('cart', JSON.stringify(newCart));
  };

  const clearCart = () => {
    setCart([]);
    setRestaurant(null);
    localStorage.removeItem('cart');
    localStorage.removeItem('restaurant');
  };

  const getTotal = () => {
    return cart.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <CartContext.Provider value={{
      cart, restaurant, addToCart, removeFromCart, updateQuantity, clearCart, getTotal
    }}>
      {children}
    </CartContext.Provider>
  );
};