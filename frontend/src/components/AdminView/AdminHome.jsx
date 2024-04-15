import React from 'react';
import AdminNavbar from './AdminNavbar';
import { Link } from 'react-router-dom';
import './AdminHome.css'; // Import the Admin CSS file

const AdminHome = () => {
  return (
    <div className="admin-container">
      <AdminNavbar />
      <div className="admin-links">
        <Link to="/frontendadmin/user" className="admin-link">USER</Link>
        <Link to="/frontendadmin/movies" className="admin-link">Movies</Link>
        <Link to="/frontendadmin/promotions" className="admin-link">Promotions</Link>
        <Link to="/frontendadmin/showdetails" className="admin-link">Show Details</Link>
      </div>
    </div>
  );
};

export default AdminHome;
