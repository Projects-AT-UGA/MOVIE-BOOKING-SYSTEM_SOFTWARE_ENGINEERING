// AdminPromotions.jsx

import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import useAdmin from './Admin/useAdmin';

const AdminPromotions = () => {
  const [promotions, setPromotions] = useState([]);
  const {state}=useAdmin()
  const [formData, setFormData] = useState({
    id: null,
    code: '',
    discountPercentage: 0,
    isActive: false
  });
  const [formData1, setFormData1] = useState({
    id: null,
    code: '',
    discountPercentage: 0,
    isActive: false
  });
  const [error, setError] = useState(null);
  
  const fetchPromotions = async () => {
    try {
      const response = await fetch('/admin/promotions',{
        headers:{
          authorization:`Bearer ${state.adminuser.token}`
        }
      });
      const data = await response.json();
      setPromotions(data);
    } catch (error) {
      console.error('Error fetching promotions:', error);
    }
  };

  const createPromotion = async () => {
    try {
      setError(null);
      const response = await fetch('/admin/promotions', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:`Bearer ${state.adminuser.token}`
        },
        body: JSON.stringify(formData1)
      });
      const data = await response.json();
      if (response.ok) {
        setPromotions([...promotions, data]);
        setFormData1({ id: null, code: '', discountPercentage: 0, isActive: false });
      } else {
        setError(data.message);
      }
    } catch (error) {
      console.error('Error creating promotion:', error);
    }
  };

  const deletePromotion = async (promotionId) => {
    try {
      const response = await fetch(`/admin/promotions/${promotionId}`, {
        method: 'DELETE',
        headers:{
          authorization:`Bearer ${state.adminuser.token}`
        }
      });
      if (response.ok) {
        setPromotions(promotions.filter(promotion => promotion.id !== promotionId));
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error deleting promotion:', error);
    }
  };

  const updatePromotion = async () => {
    try {
      const response = await fetch(`/admin/promotions/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization:`Bearer ${state.adminuser.token}`
        },
        body: JSON.stringify(formData)
      });
      if (response.ok) {
        fetchPromotions();
        setFormData({ id: null, code: '', discountPercentage: 0, isActive: false });
      } else {
        const data = await response.json();
        setError(data.message);
      }
    } catch (error) {
      console.error('Error updating promotion:', error);
    }
  };

  const handlePromotionClick = (promotion) => {
    setFormData(promotion);
  };

  useEffect(() => {
    fetchPromotions();
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div>Admin Promotions</div>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <div style={{ width: '30%' }}>
          {/* Left Section - Display Promotions */}
          <h2>Promotions</h2>
          <ul>
            {promotions.map((promotion) => (
              <li key={promotion.id} onClick={() => handlePromotionClick(promotion)}>
                {promotion.code} - {promotion.discountPercentage}% {promotion.isActive ? 'Active' : 'Inactive'}
                <button onClick={() => deletePromotion(promotion.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>

        <div style={{ width: '30%' }}>
          {/* Right Section - Update Promotion */}
          <div>
            <input
              type="text"
              placeholder="Code"
              value={formData.code}
              onChange={(e) => setFormData({ ...formData, code: e.target.value })}
            />
            <input
              type="number"
              placeholder="Discount Percentage"
              value={formData.discountPercentage}
              onChange={(e) => setFormData({ ...formData, discountPercentage: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={formData.isActive}
                onChange={(e) => setFormData({ ...formData, isActive: e.target.checked })}
              />
              Active
            </label>
            <button onClick={updatePromotion}>Update Promotion</button>
          </div>
        </div>


        <div style={{ width: '30%' }}>
          {/* Middle Section - Create Promotion */}
          <div>
            <input
              type="text"
              placeholder="Code"
              value={formData1.code}
              onChange={(e) => setFormData1({ ...formData1, code: e.target.value })}
            />
            <input
              type="number"
              placeholder="Discount Percentage"
              value={formData1.discountPercentage}
              onChange={(e) => setFormData1({ ...formData1, discountPercentage: e.target.value })}
            />
            <label>
              <input
                type="checkbox"
                checked={formData1.isActive}
                onChange={(e) => setFormData1({ ...formData1, isActive: e.target.checked })}
              />
              Active
            </label>
            <button onClick={createPromotion}>Create Promotion</button>
            {error && <div>{error}</div>}
          </div>
        </div>
        
      </div>
    </div>
  );
};

export default AdminPromotions;
