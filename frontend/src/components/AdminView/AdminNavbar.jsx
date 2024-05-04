import React from 'react'
import { Link } from 'react-router-dom';
import useAdmin from './Admin/useAdmin';
import './AdminNavbar.css';
const AdminNavbar = () => {
  const {dispatch}=useAdmin()
  const logout=()=>{
    dispatch({type:"LOGOUT"})
  }
  return (
    <div style={{display:"flex",justifyContent:"space-between"}}>
      
      <Link id="Admin" to="/frontendadmin"></Link>
      <div id="logout" onClick={logout} style={{cursor:"pointer"}}>Logout</div>
    </div>
  )
}

export default AdminNavbar