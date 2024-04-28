import { useContext } from "react"
import {BookingContext} from '../booking/bookingContextProvider'

const useBooking = () => {
    const context=useContext(BookingContext)
    if(!context){
        throw Error("use booking inside booking context")
    }
    return context
}

export default useBooking