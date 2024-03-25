import React, { useState } from "react";
import FormInput from "./FormInput";
import { NavLink, Link, useNavigate, useParams } from "react-router-dom";
import useUpdatePassword from "../../User/useUpdatePassword";
const SetNewPassword = () => {
  const [values, setValues] = useState({
    otp: "",
    password: "",
    confirmPassword: "",
  });

  let { email, otp } = useParams();
  const  {error,isloading,updatepassword}=useUpdatePassword();
  const inputs = [
    {
      id: 1,
      name: "password",
      type: "password",
      placeholder: "Password",
      errorMessage: "Please enter a valid password",
      label: "Password",
      required: true,
    },
    {
      id: 2,
      name: "confirmPassword",
      type: "password",
      placeholder: "Confirm Password",
      errorMessage: "Passwords do not match",
      label: "Confirm Password",
      required: true,
    },
  ];

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (values.password !== values.confirmPassword) {
      // Passwords don't match
      alert("Passwords do not match");
    } else {
      updatepassword(email,otp,values.password)
    }
  };

  const onChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <div className="app">
      <form className="login-form">
        <h1>Set New Password</h1>
        <div>Email: {email}</div>
        <div>OTP: {otp}</div>

        {inputs.map((input) => (
          <FormInput
            key={input.id}
            {...input}
            value={values[input.name]}
            onChange={onChange}
          />
        ))}

        <button className="login-button" type="submit" onClick={handleSubmit}>
          Update Password
        </button>
      </form>
    </div>
  );
};

export default SetNewPassword;
