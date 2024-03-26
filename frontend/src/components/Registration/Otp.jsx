import React, { useState } from 'react';
import useSignIn from '../../User/useSignIn';
import FormInput from "./FormInput";
import { NavLink,Link } from "react-router-dom";
const OTPPage = () => {


  const [values, setValues] = useState({
    otp: "",
  });
 

  const inputs = [
    {
      id: 1,
      name: "otp",
      type: "number",
      placeholder: "otp",
      errorMessage: "Please enter a valid username",
      label: "otp",
      required: true,
    },
   
  ];
  // State to hold the OTP value
  
  const {error,isloading,signUp}=useSignIn()
 

  // Function to handle OTP submission
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you can implement the logic to verify the OTP
    
    signUp(values.otp)
    // Reset OTP field
    
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };
  return (
    <div className="app">
      <form className="login-form">
        <h1>SIGN UP</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        {error ? <div>{error}</div> : <></>}
        <button className="login-button" type="submit"  onClick={handleSubmit} disabled={isloading}>
        SIGN UP
        </button>
        
      </form>
    </div>
  );
};

export default OTPPage;
