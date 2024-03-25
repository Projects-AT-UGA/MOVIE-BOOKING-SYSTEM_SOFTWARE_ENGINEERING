import React, { useState } from 'react';
import useSignIn from '../../User/useSignIn';

const OTPPage = () => {
  // State to hold the OTP value
  const [otp, setOTP] = useState('');
  const {error,isloading,signUp}=useSignIn()
  // Function to handle OTP input changes
  const handleOTPChange = (e) => {
    const value = e.target.value;
    setOTP(value);
    
  };

  // Function to handle OTP submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the logic to verify the OTP
    
    signUp(otp)
    // Reset OTP field
    setOTP('');
  };

  return (
    <div>
      <h1>Enter OTP</h1>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={otp}
          onChange={handleOTPChange}
          placeholder="Enter OTP"
        />
        <div>{error}</div>
        <button type="submit" disabled={isloading}>Submit</button>
      </form>
    </div>
  );
};

export default OTPPage;
