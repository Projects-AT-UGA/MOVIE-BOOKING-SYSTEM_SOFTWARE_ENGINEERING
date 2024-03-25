import { useState } from "react"
import useUser from "./useUser"
import {useNavigate} from 'react-router-dom'
const useLogin = () => {
    const navigate=useNavigate()
    const {state,dispatch}=useUser()
    const [error,setError]=useState(null)
    const [isloading,setIsLoading]=useState(false)

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
            setError(user.message)
        }
        setIsLoading(false)
    }

    return {error,isloading,login}
}

export default useLogin