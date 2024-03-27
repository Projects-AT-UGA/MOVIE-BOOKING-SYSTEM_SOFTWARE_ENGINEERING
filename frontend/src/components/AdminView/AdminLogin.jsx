import React, { useState } from "react";

import FormInput from '../CheckoutPage/FormInput';
import { NavLink,Link } from "react-router-dom";
import useLogin from "./Admin/useLogin";
const AdminLogin = () => {
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
        login(values.username,values.password)
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      return (
        <div className="app">
          <form className="login-form">
            <h1>Admin Login</h1>
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
          </form>
        </div>
      );
}

export default AdminLogin