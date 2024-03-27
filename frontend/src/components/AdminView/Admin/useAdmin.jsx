import React, { useContext } from 'react'
import {AdminUserContext} from './AdminUserContextProvider'
const useAdmin = () => {
 const context=useContext(AdminUserContext)
 if(!context){
    throw Error("use admin hook inside the admin user context only")
 }
 return context
}

export default useAdmin