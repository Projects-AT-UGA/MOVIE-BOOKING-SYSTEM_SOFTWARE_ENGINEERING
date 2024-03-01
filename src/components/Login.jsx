
import React, { useState, useEffect } from 'react';
import './Login.css';
import './formInput.css';
import FormInput from './FormInput';

const App = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    DOB: '',
    password: '',
    confirmPassword: '',
    address: '',
    country: '',
    phone: '',
    cardType: '',
    cardNumber: '',
    expirationDate: '',
    billingAddress: '',
    zipcode: '',
    promoCode: '',
    subscribe: false,
    needCardDetails: false,
  });

  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [passwordError, setPasswordError] = useState('');

  useEffect(() => {
    
    fetch('https://restcountries.com/v2/all')
      .then(response => response.json())
      .then(data => {
        const countryList = data.map(country => ({
          name: country.name,
          code: country.alpha2Code,
          phoneCode: country.callingCodes[0],
        }));
        setCountries(countryList);
      })
      .catch(error => console.error('Error fetching countries:', error));
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmPassword) {
      setPasswordError('Passwords do not match');
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(formData.password)) {
      setPasswordError('Password must contain at least 8 characters including one letter, one number, and one special character.');
      return;
    }

    setPasswordError('');

   
    window.location.href = '/home'; 
  };

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({
      ...formData,
      [name]: newValue,
    });
  };

  const handleCountryChange = (e) => {
    const selectedCountry = countries.find(country => country.name === e.target.value);
    if (selectedCountry) {
      setSelectedCountryCode(selectedCountry.phoneCode);
    }
    handleChange(e);
  };

  return (
    <div className="registration-container">
      <div className="container">
        <h2 className="center registration-heading">Registration Page</h2>
        <form id="registrationForm" onSubmit={handleSubmit}>
          <FormInput
            name="username"
            type="text"
            placeholder="Username"
            label="Username *"
            value={formData.username}
            onChange={handleChange}
            star
          />
  
          <FormInput
            name="email"
            type="email"
            placeholder="Email"
            label="Email *"
            value={formData.email}
            onChange={handleChange}
            star
          />
  
          <FormInput
            name="DOB"
            type="date"
            label="DOB *"
            value={formData.DOB}
            onChange={handleChange}
            star
          />
  
          <FormInput
            name="phone"
            type="tel"
            placeholder="Phone number"
            label="Phone number *"
            value={formData.phone}
            onChange={handleChange}
            star
          />          
          
          <div className="password-error-container">{passwordError && <span className="password-error-message">{passwordError}</span>}</div>
            <FormInput
                name="password"
                type="password"
                placeholder="Password"
                label="Password *"
                value={formData.password}
                onChange={handleChange}
                star
            />
            {passwordError && <div className="empty-space" />}
            <FormInput
                name="confirmPassword"
                type="password"
                placeholder="Confirm Password"
                label="Confirm Password *"
                value={formData.confirmPassword}
                onChange={handleChange}
                star
            />

          <FormInput
            name="address"
            type="text"
            placeholder="Address"
            label="Address *"
            value={formData.address}
            onChange={handleChange}
            star
          />

          <div className="formInput">
            <label htmlFor="country">Country:</label>
            <select
              name="country"
              id="country"
              value={formData.country}
              onChange={handleCountryChange}
              required
            >
              <option value="" disabled>Select Country</option>
              {countries.map(country => (
                <option key={country.name} value={country.name}>{country.name}</option>
              ))}
            </select>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              name="subscribe"
              checked={formData.subscribe}
              onChange={handleChange}
            />
            <label>Subscribe for Promotions</label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              name="needCardDetails"
              checked={formData.needCardDetails}
              onChange={handleChange}
            />
            <label>Would you like to enter card details?</label>
          </div>

          {formData.needCardDetails && (
            <>
              <div className="formInput" style={{ marginTop: '10px' }}>
                <label style={{ marginBottom: '20px', fontSize: '16px' }}>Card Information:</label>
              </div>
              <FormInput
                name="cardType"
                type="select"
                label="Card Type"
                value={formData.cardType}
                onChange={handleChange}
                options={['Visa', 'MasterCard', 'American Express', 'Discover']}
            />
              <FormInput
                name="cardNumber"
                type="text"
                placeholder="Card Number"
                label="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
              />
              <FormInput
                name="expirationDate"
                type="date"
                placeholder="Expiration Date"
                label="Expiration Date"
                value={formData.expirationDate}
                onChange={handleChange}
              />
              <FormInput
                name="billingAddress"
                type="text"
                placeholder="Billing Address"
                label="Billing Address"
                value={formData.billingAddress}
                onChange={handleChange}
              />
              <FormInput
                name="zipcode"
                type="text"
                placeholder="Zipcode"
                label="Zipcode"
                value={formData.zipcode}
                onChange={handleChange}
              />
            </>
          )}
          <button className="register-button" type="submit">Register</button>
        </form>
      </div>
    </div>
  );
};

export default App;
