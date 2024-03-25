import React, { useContext } from 'react'
import {UserContext} from './UserContextProvider'
const useUser = () => {
    const context=useContext(UserContext);
    
    if(!context){
        throw Error("use hook inside the context")
    }
    return context
}

export default useUser