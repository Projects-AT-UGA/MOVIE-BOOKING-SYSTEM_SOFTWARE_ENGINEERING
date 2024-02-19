// LoginForm.jsx
import React, { useState } from "react";
import "./LoginForm.css";
import FormInput from "./FormInput";

const LoginForm = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Username",
      errorMessage: "Please enter a valid username",
      label: "Username",
      required: true,
    },
    {
      id: 2,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Password is required",
      label: "Password",
      required: true,
    },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add your login logic here
    console.log("Login logic goes here");
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form onSubmit={handleSubmit}>
        <h1>Login</h1>
        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}
        <button type="submit">Login</button>
        <div className="links">
          <a href="#" className="create">Create Account</a>
          <span>|</span>
          <a href="#">Forgot Password?</a>
        </div>
        
      </form>
    </div>
  );
};

export default LoginForm;
