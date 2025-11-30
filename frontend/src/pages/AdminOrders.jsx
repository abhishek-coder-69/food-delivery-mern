import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getAllOrders, updateOrderStatus } from '../services/api';

const AdminOrders = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [orders, setOrders] = useState([]);
  const [loading, setLoading] = useState(true);
  const [filter, setFilter] = useState('all');

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/');
      return;
    }
    fetchOrders();
  }, [user, navigate, isAdmin]);

  const fetchOrders = async () => {
    try {
      const { data } = await getAllOrders();
      setOrders(data);
    } catch (error) {
      console.error('Error fetching orders:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleStatusChange = async (orderId, newStatus) => {
    try {
      await updateOrderStatus(orderId, newStatus);
      alert('Order status updated!');
      fetchOrders();
    } catch (error) {
      alert('Failed to update order status');
    }
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'Delivered': return '#10b981';
      case 'On the way': return '#3b82f6';
      case 'Preparing': return '#f59e0b';
      case 'Confirmed': return '#8b5cf6';
      case 'Cancelled': return '#ef4444';
      default: return '#6b7280';
    }
  };

  const filteredOrders = filter === 'all' 
    ? orders 
    : orders.filter(order => order.status && order.status.toLowerCase() === filter);

  if (loading) {
    return <div className="loading">Loading orders...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Orders</h1>
        <button onClick={() => navigate('/admin')} className="back-btn">
          ← Back
        </button>
      </div>

      <div className="order-filters">
        <button
          className={filter === 'all' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('all')}
        >
          All Orders ({orders.length})
        </button>
        <button
          className={filter === 'pending' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('pending')}
        >
          Pending ({orders.filter(o => o.status === 'Pending').length})
        </button>
        <button
          className={filter === 'confirmed' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('confirmed')}
        >
          Confirmed ({orders.filter(o => o.status === 'Confirmed').length})
        </button>
        <button
          className={filter === 'preparing' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('preparing')}
        >
          Preparing ({orders.filter(o => o.status === 'Preparing').length})
        </button>
        <button
          className={filter === 'on the way' ? 'filter-btn active' : 'filter-btn'}
          onClick={() => setFilter('on the way')}
        >
          On the way ({orders.filter(o => o.status === 'On the way').length})
        </button>
      </div>

      {filteredOrders.length === 0 ? (
        <div className="no-data">
          <p>No {filter !== 'all' ? filter : ''} orders found.</p>
        </div>
      ) : (
        <div className="orders-list">
          {filteredOrders.map((order) => {
            if (!order || !order._id) return null;
            
            return (
              <div key={order._id} className="admin-order-card">
                <div className="order-header">
                  <div>
                    <h3>Order #{order._id.slice(-6)}</h3>
                    <p className="order-date">
                      {new Date(order.createdAt).toLocaleString()}
                    </p>
                  </div>
                  <span
                    className="order-status"
                    style={{ backgroundColor: getStatusColor(order.status) }}
                  >
                    {order.status}
                  </span>
                </div>

                <div className="order-details">
                  <div className="detail-row">
                    <strong>Customer:</strong> {order.user?.name || 'N/A'} ({order.user?.email || 'N/A'})
                  </div>
                  <div className="detail-row">
                    <strong>Restaurant:</strong> {order.restaurant?.name || 'N/A'}
                  </div>
                  <div className="detail-row">
                    <strong>Delivery Address:</strong> {order.deliveryAddress || 'N/A'}
                  </div>
                  <div className="detail-row">
                    <strong>Items:</strong>
                    <ul>
                      {order.items && order.items.length > 0 ? (
                        order.items.map((item, index) => (
                          <li key={index}>
                            {item.name} x {item.quantity} - ₹{item.price * item.quantity}
                          </li>
                        ))
                      ) : (
                        <li>No items</li>
                      )}
                    </ul>
                  </div>
                  <div className="detail-row total">
                    <strong>Total Amount:</strong> ₹{order.totalAmount || 0}
                  </div>
                </div>

                <div className="order-actions">
                  <label>Update Status:</label>
                  <select
                    value={order.status}
                    onChange={(e) => handleStatusChange(order._id, e.target.value)}
                    className="status-select"
                  >
                    <option value="Pending">Pending</option>
                    <option value="Confirmed">Confirmed</option>
                    <option value="Preparing">Preparing</option>
                    <option value="On the way">On the way</option>
                    <option value="Delivered">Delivered</option>
                    <option value="Cancelled">Cancelled</option>
                  </select>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AdminOrders;