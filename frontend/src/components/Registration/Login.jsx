
import React, { useState, useEffect } from 'react';
import './Login.css';
import './FormInput.css';
import FormInput from './FormInput';
import useSignup from '../../User/useSignup';
import validator from 'validator'; // Import the validator package


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
    cardNumber: '',
    cardHolderName:'',
    expirationDate: '',
    cvv:'',
    cardType: '',
    billingAddress:'',
    isDefault:false,
    promoCode: '',
    subscribe: false,
    needCardDetails: false,
  });

  const [countries, setCountries] = useState([]);
  const [selectedCountryCode, setSelectedCountryCode] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [mainError, setMainError] = useState('');
  const {error,isloading,sendOtp}=useSignup();
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

    setMainError(''); // Clear previous main error message

    const { username, email, DOB, country, phone, password, confirmPassword } = formData;

    if (password !== confirmPassword) {
      setMainError('Passwords do not match');
      return;
    }

    const passwordRegex = /^(?=.*[a-zA-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    if (!passwordRegex.test(password)) {
      setMainError('Password must contain at least 8 characters including one letter, one number, and one special character.');
      return;
    }

    if (!validator.matches(country, /^[A-Za-z\s]+$/)) {
      setMainError('Invalid country format');
      return;
    }

    if (!validator.isAlphanumeric(username)) {
      setMainError('Username must be alphanumeric');
      return;
    }

    if (!validator.isEmail(email)) {
      setMainError('Invalid email format');
      return;
    }

    if (!validator.isDate(new Date(DOB))) {
      setMainError('Invalid date of birth format');
      return;
    }

    if (!validator.isMobilePhone(phone, 'any', { strictMode: false })) {
      setMainError('Invalid phone number format');
      return;
    }

    sendOtp(formData);
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
      <div className="container-login">
        <h2 className="center registration-heading">Registration Page</h2>
        <form id="registrationForm" >
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
              id="chechbox-form-input"
            />
            <label id='chechbox-form-input-label'>Subscribe for Promotions</label>
          </div>

          <div className="checkbox-wrapper">
            <input
              type="checkbox"
              name="needCardDetails"
              checked={formData.needCardDetails}
              onChange={handleChange}
              id="chechbox-form-input"
              
            />
            <label id='chechbox-form-input-label'>Would you like to enter card details?</label>
          </div>
          <div>{mainError}</div>
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
                type="password"
                placeholder="Card Number"
                label="Card Number"
                value={formData.cardNumber}
                onChange={handleChange}
              />
              <FormInput
                name="cardHolderName"
                type="text"
                placeholder="Card Holder Name"
                label="Card Holder Name"
                value={formData.cardHolderName}
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
                name="cvv"
                type="password"
                placeholder="CVV"
                label="CVV"
                value={formData.cvv}
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
              
              <div className="checkbox-wrapper">
                  <input
                    type="checkbox"
                    name="isDefault"
                    checked={formData.isDefault}
                    onChange={handleChange}
                    id='chechbox-form-input'
                  />
                  <label id="chechbox-form-input-label">Set as default card</label>
            </div>
            </>
          )}
          <div>{error}</div>
          <button className="register-button" type="submit" onClick={handleSubmit} disabled={isloading} >Register</button>
        </form>
      </div>
    </div>
  );
};

export default App;
