import React, { useState } from 'react'
import useUser from './useUser';

const useEditUser = () => {
  const [error,setError]=useState(null);
  const [isloading,setIsLoading]=useState(false);
  const [success,setSuccess]=useState(false);
  const {state}=useUser()
  const edituser=async(data)=>{
    setSuccess(false)
    setIsLoading(true)
    setError(null)
    if(!state.login.token){
        setError("token is not present")
        setIsLoading(false)
        return;
    }

    const response=await fetch("/user",{
        method:"POST",
        headers:{
            authorization:`Bearer ${state.login.token}`,
            "Content-Type":"application/json"
        },
        body:JSON.stringify({...data,email:state.login.email})
    })
    const temp=await response.json();
    
    if(response.ok)
    {
        setSuccess("success")
    }
    else
    {
        setError(temp.message)
    }
    setIsLoading(false)
  }
  return {error,isloading,edituser,success}
}

export default useEditUser