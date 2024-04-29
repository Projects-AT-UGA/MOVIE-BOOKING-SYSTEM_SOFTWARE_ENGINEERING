import { createContext, useEffect,useReducer } from "react";
import useUser from "../User/useUser";

const bookinReducer=(state,action)=>{
switch(action.type){
case "SET_CURRENT_MOVIE":
    localStorage.setItem("selectedmovie",JSON.stringify({...state,currentMovie:action.payload}))
    return {...state,currentMovie:action.payload}
case "SET_CURRENT_TICKETS":
    localStorage.setItem("selectedmovie",JSON.stringify({...state,currentTickets:action.payload}))
    return {...state,currentTickets:action.payload}
case "SET_CURRENT_CARD":
    localStorage.setItem("selectedmovie",JSON.stringify({...state,currentTickets:action.payload}))
    return  {...state,currentCard:action.payload}
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
        if(!userstate.login.email){
            dispatch({type:"RESET"})
        }
    },[userstate])

    return <BookingContext.Provider value={{state,dispatch}}>
        {children}
    </BookingContext.Provider>
}

export default BookingContextProvider;