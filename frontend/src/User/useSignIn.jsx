import React,{useState} from 'react'
import {useNavigate} from 'react-router-dom'
import useUser from './useUser'
const useSignIn = () => {
    const navigate=useNavigate()
    const {state,dispatch}=useUser()
    const [error,setError]=useState(null)
    const [isloading,setIsLoading]=useState(false)
    const [isLoadingAdd, setIsLoadingAdd] = useState(false);
    const [adderror,setAddError]=useState(null)
    const addCard = async (formData1,token) => {
        setIsLoadingAdd(true);
        setAddError(null)
        try {
          const { id, ...formDataWithoutId } = formData1;
          if (state) {
            const response = await fetch('/card', {
              method: 'POST',
              headers: {
                'Content-Type': 'application/json',
                authorization: `Bearer ${token}`
              },
              body: JSON.stringify(formDataWithoutId)
            });
            const temp=await response.json()
            if (!response.ok) {
                setAddError(temp.message);
                return;
            }
            
          }
        } catch (error) {
            setAddError("failed to add");
        } finally {
          setIsLoadingAdd(false);
          console.log(adderror)
        }
      };
      
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
            
            
           
            // addCard({cardNumber : state.signup.cardNumber,
            //     cardHolderName : state.signup.cardHolderName,
            //     expirationDate : state.signup.expirationDate,
            //     cvv : state.signup.cvv,
            //     cardType : state.signup.cardType,
            //     billingAddress : state.signup.billingAddress,
            //     isDefault : state.signup.isDefault},temp.token)
            dispatch({type:"LOGIN",payload:{signup:{},login:temp}})
            
            
            localStorage.setItem("user",JSON.stringify(temp))
            navigate("/registrationsuccessful")
        }
        else{
            setError(temp.message)
        }
        setIsLoading(false)
    }
    return {error,isloading,signUp}
}

export default useSignIn