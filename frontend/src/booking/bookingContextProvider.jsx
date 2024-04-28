import { createContext, useEffect,useReducer } from "react";
import useUser from "../User/useUser";

const bookinReducer=(state,action)=>{
switch(action.type){
case "SET_CURRENT_MOVIE":
    return {...state,currentMovie:action.payload}
case "RESET":
    return {}
default:
    return state;
}
}


export const BookingContext=createContext();


const BookingContextProvider=({children})=>{
    const [state,dispatch]=useReducer(bookinReducer,{})
    const {state:userstate,dispatch:usedispatch}=useUser();
    
    useEffect(()=>{
        dispatch({type:"RESET"})
    },[userstate])

    return <BookingContext.Provider value={{state,dispatch}}>
        {children}
    </BookingContext.Provider>
}

export default BookingContextProvider;