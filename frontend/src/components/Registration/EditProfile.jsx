// EditProfile.jsx
import React, { useState } from 'react';
import './EditProfile.css';

export const EditProfile = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    birthday: '',
    phone: '',
    password: '',
    confirmPassword: '',
    address: '',
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
  };

  return (
    <div className="edit-profile-container1">
      <h1 className="edit1-title">Edit Profile</h1>
      <form onSubmit={handleSubmit} className="edit1-profile-form">
        <div className="edit1-form-group">
          <label htmlFor="edit1-username">Username:</label>
          <input
            type="text"
            id="edit1-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Username"
            required
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-email">Email:</label>
          <input
            type="email"
            id="edit1-email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Email"
            required
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-birthday">Birthday:</label>
          <input
            type="date"
            id="edit1-birthday"
            name="birthday"
            value={formData.birthday}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Birthday"
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-phone">Phone Number:</label>
          <input
            type="text"
            id="edit1-phone"
            name="phone"
            value={formData.phone}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Phone number"
            required
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-password">Password:</label>
          <input
            type="password"
            id="edit1-password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Password"
            required
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-confirmPassword">Confirm Password:</label>
          <input
            type="password"
            id="edit1-confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Confirm Password"
            required
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-address">Address:</label>
          <input
            type="text"
            id="edit1-address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Address"
            required
          />
        </div>
        <button type="submit" className="edit1-submit-btn">Save Changes</button>
      </form>
    </div>
  );
};

