import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useUser from './useUser'
const useSignIn = () => {
    const navigate=useNavigate()
    const {state,dispatch}=useUser()
    const [error,setError]=useState(null)
    const [isloading,setIsLoading]=useState(false)
    const signUp=async(otp)=>{
        setError(null)
        setIsLoading(true)
        
        const response=await fetch("/users/signup",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify(
                {
                    "country": state.signup.country,
                    "username": state.signup.username,
                    "email": state.signup.email,
                    "dob": state.signup.DOB,
                    "phoneNumber": state.signup.phone,
                    "password": state.signup.password,
                    "address": state.signup.address,
                    "subscribeForPromotions": state.signup.subscribe,
                    "otp":otp
                }
            )
        })
        const temp=await response.json();
        
        if(response.ok){
            navigate("/")
            dispatch({type:"LOGIN",payload:{signup:{},login:temp}})
            localStorage.setItem("user",JSON.stringify(temp))
        }
        else{
            setError(temp.message)
        }
        setIsLoading(false)
    }
    return {error,isloading,signUp}
}

export default useSignIn