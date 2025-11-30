import React, { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { CartContext } from '../context/CartContext';

const Navbar = () => {
  const { user, logout, isAdmin } = useContext(AuthContext);
  const { cart } = useContext(CartContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        <Link to="/" className="nav-logo">
          🍕 FoodZone
        </Link>
        
        <ul className="nav-menu">
          <li className="nav-item">
            <Link to="/" className="nav-link">Home</Link>
          </li>
          <li className="nav-item">
            <Link to="/restaurants" className="nav-link">Restaurants</Link>
          </li>
          
          {user ? (
            <>
              {isAdmin() && (
                <li className="nav-item">
                  <Link to="/admin" className="nav-link admin-link">⚙️ Admin</Link>
                </li>
              )}
              <li className="nav-item">
                <Link to="/orders" className="nav-link">Orders</Link>
              </li>
              <li className="nav-item">
                <span className="nav-link">Hi, {user.name}</span>
              </li>
              <li className="nav-item">
                <button onClick={handleLogout} className="nav-btn">Logout</button>
              </li>
            </>
          ) : (
            <>
              <li className="nav-item">
                <Link to="/login" className="nav-link">Login</Link>
              </li>
              <li className="nav-item">
                <Link to="/register" className="nav-btn">Sign Up</Link>
              </li>
            </>
          )}
          
          {cart.length > 0 && (
            <li className="nav-item">
              <span className="cart-badge">
                🛒 {cart.length}
              </span>
            </li>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;