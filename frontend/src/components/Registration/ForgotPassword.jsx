import React, { useState } from "react";
import FormInput from "./FormInput";
import { NavLink,Link,useNavigate } from "react-router-dom";
import useOtp from "../../User/useOtp";
const ForgotPassword = () => {
    const [values, setValues] = useState({
        email: "",
      });
      const {error,isloading,sendOtp}=useOtp()
      const navigate=useNavigate()
      const inputs = [
        {
          id: 1,
          name: "email",
          type: "text",
          placeholder: "email",
          errorMessage: "Please enter a valid email",
          label: "email",
          required: true,
        }
      ];
    
      const handleSubmit = async(e) => {
        e.preventDefault();
       
        // Add your sendotp logic here
        const temp=await sendOtp(values);
        navigate("/newpassword/"+values.email)
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      return (
        <div className="app">
          <form className="login-form">
            <h1>Forgot Password</h1>
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
              Send OTP
            </button>
           
          </form>
        </div>
      );
}

export default ForgotPassword