// UserRegistrationForm.js

import React, { useState } from 'react';
import axios from 'axios';

const UserRegistrationForm = () => {
    const [formData, setFormData] = useState({
        username: '',
        email: '',
        phone_number: '',
        address: ''
    });
    const [message, setMessage] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log(formData)
        axios.post('http://localhost:8000/api/users/', formData)
            .then(response => {
                console.log(response.data);
                setMessage('User created successfully');
                // Reset form data after successful submission
                setFormData({
                    username: '',
                    email: '',
                    phone_number: '',
                    address: ''
                });
            })
            .catch(error => {
                console.error('Error:', error);
                setMessage('Failed to create user');
            });
    };

    return (
        <div>
            <h1>User Registration</h1>
            {message && <p>{message}</p>}
            <form onSubmit={handleSubmit}>
                <input type="text" name="username" placeholder="Username" onChange={handleChange} />
                <input type="email" name="email" placeholder="Email" onChange={handleChange} />
                <input type="text" name="phone_number" placeholder="Phone Number" onChange={handleChange} />
                <input type="text" name="address" placeholder="Address" onChange={handleChange} />
                <button type="submit">Register</button>
            </form>
        </div>
    );
};

export default UserRegistrationForm;
