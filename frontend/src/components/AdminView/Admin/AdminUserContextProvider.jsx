import React, { createContext, useEffect, useReducer } from 'react';
const adminuserReducer=(state,action)=>{
    switch(action.type){
        case "LOGIN":
            return action.payload;
        case "LOGOUT":
            localStorage.removeItem("adminuser");
            return null;
        default:
            return state;
    }
}
export const AdminUserContext=createContext()

const AdminUserContextProvider = ({children}) => {
    const [state,dispatch]=useReducer(adminuserReducer,null)
    useEffect(()=>{
      const adminuser=JSON.parse(localStorage.getItem("adminuser"))
      dispatch({type:"LOGIN",payload:adminuser})
    },[])
  return(<AdminUserContext.Provider value={{state,dispatch}}>
    {children}
  </AdminUserContext.Provider>)
}

export default AdminUserContextProvider