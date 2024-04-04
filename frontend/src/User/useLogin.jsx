import { useState } from "react"
import useUser from "./useUser"
import {useNavigate} from 'react-router-dom'
import useSignup from "./useSignup"
const useLogin = () => {
    const navigate=useNavigate()
    const {state,dispatch}=useUser()
    const [error,setError]=useState(null)
    const [isloading,setIsLoading]=useState(false)
    const {error:newerror,isloading:newloading,sendOtp}=useSignup();
    const login=async(email,password)=>{
        
        setIsLoading(true)
        setError(null)
        const response=await fetch("/users/login",{
            method:"POST",
            headers:{
                "Content-type":"application/json"
            },
            body:JSON.stringify({email,password})
        })
        const user=await response.json();
        if(response.ok){
            dispatch({type:"LOGIN",payload:{signup:{},login:user}})
            localStorage.setItem("user",JSON.stringify(user));
            navigate("/")
        }
        else{
            if(user.message==="user is not verified"){
                                dispatch({type:"SIGNUP",payload:{signup:user.signup,login:{}}})
                
                sendOtp({...user.signup,DOB:user.signup.dob,phone:user.signup.phoneNumber})
                navigate("/otp")
            }
            setError(user.message)
        }
        setIsLoading(false)
    }

    return {error,isloading,login}
}

export default useLogin