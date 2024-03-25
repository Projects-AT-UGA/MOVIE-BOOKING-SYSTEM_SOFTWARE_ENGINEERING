import React, { useState } from "react";
import FormInput from "./FormInput";
import { NavLink,Link,useNavigate,useParams } from "react-router-dom";


const NewPassword = () => {
    const [values, setValues] = useState({
        otp: "",
      });
      const [error,setError]=useState(null)
      const [isloading,setIsLoading]=useState(false)
      let {email}=useParams()
      const navigate=useNavigate()
      const inputs = [
        {
          id: 1,
          name: "otp",
          type: "number",
          placeholder: "otp",
          errorMessage: "Please enter a valid email",
          label: "otp",
          required: true,
        }
      ];
    
      const handleSubmit = async(e) => {
        e.preventDefault();
        setError(null)
        setIsLoading(true)
        try{
            
            
            const response=await fetch("/users/checkotp",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify({email:email,otp:values.otp})
            })
            const temp=await response.json();

            if(response.ok){
                console.log(temp)
                navigate("/setnewpassword/"+email+"/"+values.otp)
            }
            else{
                setError(temp.message)
            }
        }
        catch(error){
            setError("server error")
        }
        setIsLoading(false)
      };
    
      const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
      };
    
      return (
        <div className="app">
           
          <form className="login-form">
         
            <h1>Set New Password</h1>
            <div>email: {email}</div>
            <div></div>
            {inputs.map((input) => (
              <FormInput
                key={input.id}
                {...input}
                value={values[input.name]}
                onChange={onChange}
              />
            ))}
            {error? <div>{error}</div> : <></>}
            
            <button className="login-button" type="submit"  onClick={handleSubmit} disabled={isloading}>
             verify OTP
            </button>
           
          </form>
        </div>
      );
}

export default NewPassword