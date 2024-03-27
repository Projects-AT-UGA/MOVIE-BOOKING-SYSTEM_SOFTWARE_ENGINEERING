import React from 'react'
import { Link } from 'react-router-dom'
import useAdmin from './Admin/useAdmin'
const AdminNavbar = () => {
  const {dispatch}=useAdmin()
  const logout=()=>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
      
      <Link to="/frontendadmin">Admin</Link>
      <div onClick={logout}>Logout</div>
    </div>
  )
}

export default AdminNavbar