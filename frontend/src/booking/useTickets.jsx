import { useState } from "react"
import useBooking from "./useBooking"

const useTickets = () => {
  const [bookedSeats,setBookedSeats]=useState([])
  const [error,setError]=useState(null)
  const [isloading,setIsLoading]=useState(false)
  const {state}=useBooking()

  const getTickets=async()=>{
    setError(null)
    setIsLoading(true)
    try{
        if(state.currentMovie){
            const response=await fetch("/booking/tickets/"+`${state.currentMovie.id}`)
            const seats=await response.json();
            setBookedSeats(seats)
        }
        else{
            setError("please select a movie before coming to ticket booking page")
        }
    }
    catch(error){
        setError("server is not working")
    }
    setIsLoading(false)
  }
  return [bookedSeats,error,setError,isloading,getTickets]
}

export default useTickets