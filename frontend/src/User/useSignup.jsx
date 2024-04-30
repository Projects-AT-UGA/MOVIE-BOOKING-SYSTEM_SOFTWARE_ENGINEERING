import {useNavigate} from 'react-router-dom'
import useUser from './useUser'
import {useState} from 'react'
const useSignup = () => {
    const navigate=useNavigate()
    const {state,dispatch}=useUser()
    const [error,setError]=useState(null)
    const [isloading,setIsLoading]=useState(false)

    const addCard = async (formData1,token) => {
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
                return;
            }
            
          }
        } catch (error) {

        } finally {
        }
      };



    const sendOtp=async(formdata)=>{
        setError(null)
        setIsLoading(true)
        try{
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

            const response1=await fetch("/users/signupunverified",{
                method:"POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body:JSON.stringify(
                    {
                        "country": formdata.country,
                        "username": formdata.username,
                        "email": formdata.email,
                        "dob": formdata.DOB,
                        "phoneNumber": formdata.phone,
                        "password": formdata.password,
                        "address": formdata.address,
                        "subscribeForPromotions": formdata.subscribe,
                    }
                )
            })
            const temp=await response1.json();
            if(response1.ok){
                navigate("/otp")
                addCard({cardNumber : formdata.cardNumber,cardHolderName : formdata.cardHolderName,
                    expirationDate : formdata.expirationDate,cvv : formdata.cvv,
                    cardType : formdata.cardType,billingAddress : formdata.billingAddress,isDefault : formdata.isDefault},temp.token)
            }
            else{
                setError(temp.message)
            }
            
           
        }
        else{
            setError(temp.message)
        }
        }
        catch(error){
            setError("please check input fields")
        }
        setIsLoading(false)
    }
    return {error,isloading,sendOtp}
}

export default useSignup