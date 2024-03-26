import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Link } from 'react-router-dom'
const AdminHome = () => {
  return (
    <div>
        <AdminNavbar></AdminNavbar>
        <Link to="/frontendadmin/user">USER</Link>
        <br/>
        <Link to="/frontendadmin/movies">Movies</Link>
        <br/>
        <Link to="/frontendadmin/promotions">Promotions</Link>
        
    </div>
  )
}

export default AdminHome