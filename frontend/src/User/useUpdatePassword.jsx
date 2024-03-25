import React, { useState } from 'react'
import {useNavigate} from 'react-router-dom'
const useUpdatePassword = () => {
    const [error,setError]=useState(null)
    const navigate=useNavigate()
    const [isloading,setIsLoading]=useState(true);
    const updatepassword=async(email,otp,password)=>{
        try{
            const response=await fetch("/users/forgotpassword",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json",
                },
                body:JSON.stringify({email,otp,password})
            })
            const temp=await response.json();
            console.log(temp)
            if(response.ok){
                navigate("/login")
            }
            else{
                setError(temp.message)
            }
        }
        catch(error){
            setError(error.message)
        }
        
    }

    return {error,isloading,updatepassword}
}

export default useUpdatePassword