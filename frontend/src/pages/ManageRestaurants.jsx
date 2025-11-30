import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { getRestaurants, deleteRestaurant } from '../services/api';

const ManageRestaurants = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [restaurants, setRestaurants] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/');
      return;
    }
    fetchRestaurants();
  }, [user, navigate, isAdmin]);

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

  const handleDelete = async (id, name) => {
    if (window.confirm(`Are you sure you want to delete ${name}?`)) {
      try {
        await deleteRestaurant(id);
        alert('Restaurant deleted successfully!');
        fetchRestaurants();
      } catch (error) {
        alert('Failed to delete restaurant');
      }
    }
  };

  if (loading) {
    return <div className="loading">Loading restaurants...</div>;
  }

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Manage Restaurants</h1>
        <div>
          <button onClick={() => navigate('/admin/add-restaurant')} className="primary-btn">
            + Add New Restaurant
          </button>
          <button onClick={() => navigate('/admin')} className="back-btn">
            ← Back
          </button>
        </div>
      </div>

      {restaurants.length === 0 ? (
        <div className="no-data">
          <p>No restaurants found. Add your first restaurant!</p>
        </div>
      ) : (
        <div className="restaurants-table">
          <table>
            <thead>
              <tr>
                <th>Image</th>
                <th>Name</th>
                <th>Cuisine</th>
                <th>Rating</th>
                <th>Delivery Time</th>
                <th>Menu Items</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {restaurants.map((restaurant) => (
                <tr key={restaurant._id}>
                  <td>
                    <img
                      src={restaurant.image || 'https://via.placeholder.com/60'}
                      alt={restaurant.name}
                      className="table-image"
                    />
                  </td>
                  <td>
                    <strong>{restaurant.name}</strong>
                    <br />
                    <small>{restaurant.address}</small>
                  </td>
                  <td>{restaurant.cuisine?.join(', ')}</td>
                  <td>⭐ {restaurant.rating}</td>
                  <td>{restaurant.deliveryTime}</td>
                  <td>{restaurant.menu?.length || 0} items</td>
                  <td>
                    <div className="action-buttons">
                      <button
                        onClick={() => navigate(`/admin/edit-restaurant/${restaurant._id}`)}
                        className="edit-btn"
                      >
                        Edit
                      </button>
                      <button
                        onClick={() => handleDelete(restaurant._id, restaurant.name)}
                        className="delete-btn"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
};

export default ManageRestaurants;