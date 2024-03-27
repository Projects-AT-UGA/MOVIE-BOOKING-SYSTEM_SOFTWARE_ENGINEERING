import React, { useState } from 'react'
import useAdmin from './useAdmin'
const useLogin = () => {
 const [error,setError]=useState(null)
 const {state,dispatch}=useAdmin()
 const [isloading,setIsLoading]=useState(false)
 const login=async(email,password)=>{
    setIsLoading(true)
    setError(null)
    try{
        const response=await fetch("/superuser/login",{
            method:"POST",
            headers:{
                "Content-Type":"application/json",
            },
            body:JSON.stringify({email,password})
        })
        const adminuser=await response.json()
        if(response.ok){
            dispatch({type:"LOGIN",payload:{adminuser:adminuser}})
            
            localStorage.setItem("adminuser",JSON.stringify({adminuser}))
        }
        else{
            setError(adminuser.message)
        }
    }
    catch(error){
        setError(error)
    }
    setIsLoading(false)
 }
 return {error,isloading,login}
}

export default useLogin