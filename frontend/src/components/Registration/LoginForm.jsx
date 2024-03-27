import React, { useState } from "react";
import "./LoginForm.css";
import FormInput from "./FormInput";
import { NavLink,Link } from "react-router-dom";
import useLogin from "../../User/useLogin";

const LoginForm = () => {
  const [values, setValues] = useState({
    username: "",
    password: "",
  });
 const {error,isloading,login}=useLogin();

  const inputs = [
    {
      id: 1,
      name: "username",
      type: "text",
      placeholder: "Email id",
      errorMessage: "Please enter a valid username",
      label: "Email id",
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

    login(values.username,values.password)
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form className="login-form">
        <h1>Login</h1>
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
          Login
        </button>
        <div className="links">
          <NavLink to="/register" className="create-account-link">
            create account
          </NavLink>
          <span className="divider">|</span>
          <Link to="/forgotpassword" className="forgot-password-link">
            Forgot Password?
          </Link>
        </div>
      </form>
    </div>
  );
};

export default LoginForm;
