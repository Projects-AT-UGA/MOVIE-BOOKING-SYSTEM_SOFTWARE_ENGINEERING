
import useUser from './useUser'
import {useState} from 'react'
const useOtp = () => {
  
    const {state,dispatch}=useUser()
    const [error,setError]=useState(null)
    const [isloading,setIsLoading]=useState(false)

    const sendOtp=async(formdata)=>{
        setError(null)
        setIsLoading(true)
        const response=await fetch("/users/sendotp",{
            method:"POST",
            headers: {
                "Content-Type": "application/json",
            },
            body:JSON.stringify({email:formdata.email})
        })
        const temp=await response.json();
        if(response.ok){
            dispatch({type:"SIGNUP",payload:{signup:formdata,login:{}}})
            setError(temp.message)
        }
        else{
            setError(temp.message)
        }
        setIsLoading(false)
    }
    return {error,isloading,sendOtp}
}

export default useOtp