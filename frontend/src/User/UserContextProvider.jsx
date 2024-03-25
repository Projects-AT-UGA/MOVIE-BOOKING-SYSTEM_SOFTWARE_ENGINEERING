import React, { createContext, useEffect, useReducer } from 'react'

const userReducer=(state,action)=>{
    switch(action.type){
        case "SIGNUP":
            return action.payload
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            localStorage.removeItem("user")
            return {signup:{},login:{}}
        default:
            return state;
    }
}


export const UserContext=createContext()
const UserContextProvider = ({children}) => {
    const [state,dispatch]=useReducer(userReducer,{signup:{},login:{}})
    useEffect(()=>{
        try{
           const user=localStorage.getItem("user")
           if(user){
            dispatch({type:"LOGIN",payload:{signup:{},login:JSON.parse(user)}})
           }
        }
        catch(error){
            console.log(error.msg)
        }
    },[])
    return (<UserContext.Provider value={{state,dispatch}}>
        {children}
    </UserContext.Provider>)
}

export default UserContextProvider