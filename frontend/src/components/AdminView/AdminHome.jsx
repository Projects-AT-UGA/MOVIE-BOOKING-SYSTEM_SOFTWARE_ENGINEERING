import React from 'react'
import AdminNavbar from './AdminNavbar'
import { Link } from 'react-router-dom'
const AdminHome = () => {
  return (
    <div>
        <AdminNavbar></AdminNavbar>
        <Link to="/frontendadmin/user">USER</Link>
       
    </div>
  )
}

export default AdminHome