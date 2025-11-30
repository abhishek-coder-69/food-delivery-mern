import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getDashboardStats } from '../services/api';

const AdminDashboard = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalRestaurants: 0,
    totalOrders: 0,
    pendingOrders: 0,
    totalRevenue: 0
  });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/');
      return;
    }
    fetchStats();
  }, [user, navigate, isAdmin]);

  const fetchStats = async () => {
    try {
      const { data } = await getDashboardStats();
      setStats(data);
    } catch (error) {
      console.error('Error fetching stats:', error);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return <div className="loading">Loading dashboard...</div>;
  }

  return (
    <div className="admin-dashboard">
      <h1>Admin Dashboard</h1>
      
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon">👥</div>
          <div className="stat-info">
            <h3>{stats.totalUsers}</h3>
            <p>Total Users</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">🍽️</div>
          <div className="stat-info">
            <h3>{stats.totalRestaurants}</h3>
            <p>Total Restaurants</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">📦</div>
          <div className="stat-info">
            <h3>{stats.totalOrders}</h3>
            <p>Total Orders</p>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon">⏳</div>
          <div className="stat-info">
            <h3>{stats.pendingOrders}</h3>
            <p>Pending Orders</p>
          </div>
        </div>

        <div className="stat-card revenue">
          <div className="stat-icon">💰</div>
          <div className="stat-info">
            <h3>₹{stats.totalRevenue}</h3>
            <p>Total Revenue</p>
          </div>
        </div>
      </div>

      <div className="admin-actions">
        <h2>Quick Actions</h2>
        <div className="action-buttons">
          <Link to="/admin/add-restaurant" className="action-btn">
            ➕ Add Restaurant
          </Link>
          <Link to="/admin/restaurants" className="action-btn">
            🍽️ Manage Restaurants
          </Link>
          <Link to="/admin/orders" className="action-btn">
            📦 Manage Orders
          </Link>
          <Link to="/admin/users" className="action-btn">
            👥 View Users
          </Link>
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;