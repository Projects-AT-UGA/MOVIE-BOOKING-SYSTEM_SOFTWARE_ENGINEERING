import React, { useState } from 'react'
import useUser from '../User/useUser'
import useBooking from './useBooking'

const useSubmitOrder = (code) => {
  const [submitError,setSubmitError]=useState(null)
  const [submitIsloading,submitSetIsLoading]=useState(false)
    const {state}=useUser();
    const {state:bookingstate,dispatch}=useBooking()
    const submitorder=async(promo)=>{
        try{
            setSubmitError(null)
            submitSetIsLoading(true)
            if(!bookingstate || !state){
                setSubmitError("please login and select a movie and a ticket")
                return ;
              }
                    const response=await fetch("/payment",{
                        method:"POST",
                        headers:{
                            "Content-Type":"application/json",
                            "authorization":`Bearer ${state.login.token}`
                        },
                        body:JSON.stringify({
                            "showId": bookingstate.currentMovie.id, 
                            "cardId": bookingstate.currentCard.id,
                            "tickets":bookingstate.currentTickets,
                            "Promo":promo
                        })
                    })
                    const success=await response.json()
                    if(response.ok){
                        return success;
                    }
                    else{
                        setSubmitError(success.message)
                    }
        }
        catch(error){
            setSubmitError("server is not working")
        }
        submitSetIsLoading(false)

    }

    return [submitError,submitIsloading,submitorder]
}

export default useSubmitOrder