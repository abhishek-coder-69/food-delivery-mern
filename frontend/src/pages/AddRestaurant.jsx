import React, { useState, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import { createRestaurant } from '../services/api';

const AddRestaurant = () => {
  const { user, isAdmin } = useContext(AuthContext);
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  
  const [formData, setFormData] = useState({
    name: '',
    description: '',
    image: '',
    rating: '',
    deliveryTime: '',
    cuisine: '',
    address: ''
  });

  const [menuItems, setMenuItems] = useState([
    { name: '', description: '', price: '', category: '', isVeg: true }
  ]);

  React.useEffect(() => {
    if (!user || !isAdmin()) {
      navigate('/');
    }
  }, [user, navigate, isAdmin]);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleMenuChange = (index, field, value) => {
    const newMenuItems = [...menuItems];
    newMenuItems[index][field] = value;
    setMenuItems(newMenuItems);
  };

  const addMenuItem = () => {
    setMenuItems([...menuItems, { name: '', description: '', price: '', category: '', isVeg: true }]);
  };

  const removeMenuItem = (index) => {
    const newMenuItems = menuItems.filter((_, i) => i !== index);
    setMenuItems(newMenuItems);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const restaurantData = {
        ...formData,
        rating: parseFloat(formData.rating),
        cuisine: formData.cuisine.split(',').map(c => c.trim()),
        menu: menuItems
          .filter(item => item.name && item.price)
          .map(item => ({
            ...item,
            price: parseFloat(item.price)
          }))
      };

      await createRestaurant(restaurantData);
      alert('Restaurant added successfully!');
      navigate('/admin/restaurants');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to add restaurant');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="admin-page">
      <div className="admin-header">
        <h1>Add New Restaurant</h1>
        <button onClick={() => navigate('/admin')} className="back-btn">
          ← Back to Dashboard
        </button>
      </div>

      <form onSubmit={handleSubmit} className="admin-form">
        <div className="form-section">
          <h2>Restaurant Details</h2>
          
          <div className="form-group">
            <label>Restaurant Name *</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
              placeholder="Enter restaurant name"
            />
          </div>

          <div className="form-group">
            <label>Description</label>
            <textarea
              name="description"
              value={formData.description}
              onChange={handleChange}
              placeholder="Enter description"
              rows="3"
            />
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Image URL</label>
              <input
                type="url"
                name="image"
                value={formData.image}
                onChange={handleChange}
                placeholder="https://example.com/image.jpg"
              />
            </div>

            <div className="form-group">
              <label>Rating (0-5) *</label>
              <input
                type="number"
                name="rating"
                value={formData.rating}
                onChange={handleChange}
                step="0.1"
                min="0"
                max="5"
                required
                placeholder="4.5"
              />
            </div>
          </div>

          <div className="form-row">
            <div className="form-group">
              <label>Delivery Time *</label>
              <input
                type="text"
                name="deliveryTime"
                value={formData.deliveryTime}
                onChange={handleChange}
                required
                placeholder="30-40 mins"
              />
            </div>

            <div className="form-group">
              <label>Cuisine (comma separated) *</label>
              <input
                type="text"
                name="cuisine"
                value={formData.cuisine}
                onChange={handleChange}
                required
                placeholder="Italian, Chinese, Indian"
              />
            </div>
          </div>

          <div className="form-group">
            <label>Address *</label>
            <input
              type="text"
              name="address"
              value={formData.address}
              onChange={handleChange}
              required
              placeholder="Enter restaurant address"
            />
          </div>
        </div>

        <div className="form-section">
          <div className="section-header">
            <h2>Menu Items</h2>
            <button type="button" onClick={addMenuItem} className="add-item-btn">
              + Add Item
            </button>
          </div>

          {menuItems.map((item, index) => (
            <div key={index} className="menu-item-form">
              <div className="item-header">
                <h3>Item {index + 1}</h3>
                {menuItems.length > 1 && (
                  <button
                    type="button"
                    onClick={() => removeMenuItem(index)}
                    className="remove-item-btn"
                  >
                    ✕
                  </button>
                )}
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Item Name *</label>
                  <input
                    type="text"
                    value={item.name}
                    onChange={(e) => handleMenuChange(index, 'name', e.target.value)}
                    required
                    placeholder="Margherita Pizza"
                  />
                </div>

                <div className="form-group">
                  <label>Price (₹) *</label>
                  <input
                    type="number"
                    value={item.price}
                    onChange={(e) => handleMenuChange(index, 'price', e.target.value)}
                    required
                    placeholder="299"
                  />
                </div>
              </div>

              <div className="form-group">
                <label>Description</label>
                <input
                  type="text"
                  value={item.description}
                  onChange={(e) => handleMenuChange(index, 'description', e.target.value)}
                  placeholder="Classic pizza with fresh ingredients"
                />
              </div>

              <div className="form-row">
                <div className="form-group">
                  <label>Category</label>
                  <input
                    type="text"
                    value={item.category}
                    onChange={(e) => handleMenuChange(index, 'category', e.target.value)}
                    placeholder="Pizza, Main Course, etc."
                  />
                </div>

                <div className="form-group">
                  <label>Type</label>
                  <select
                    value={item.isVeg}
                    onChange={(e) => handleMenuChange(index, 'isVeg', e.target.value === 'true')}
                  >
                    <option value="true">Vegetarian</option>
                    <option value="false">Non-Vegetarian</option>
                  </select>
                </div>
              </div>
            </div>
          ))}
        </div>

        {error && <p className="error-message">{error}</p>}

        <div className="form-actions">
          <button type="button" onClick={() => navigate('/admin')} className="cancel-btn">
            Cancel
          </button>
          <button type="submit" disabled={loading} className="submit-btn">
            {loading ? 'Adding Restaurant...' : 'Add Restaurant'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default AddRestaurant;