import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './AdminHome.css';
import AdminNavbar from './AdminNavbar';

const AdminHome = () => {
  const [selectedOption, setSelectedOption] = useState('user');
  const logout=()=>{
    dispatch({type:"LOGOUT"})
  }

  const renderOptions = () => {
    switch (selectedOption) {
      case 'user':
        return (
          <div className="admin-options">
           
            {/* User Options */}
            <h2>Welcome to Admin page!...</h2>
            {/* <button  id="admin-logout"> <a href="/frontendadmin/login"></a> Logout</button> */}
            <AdminNavbar/>
            <div className="admin-container">
              {/* Cards */}
              <div className="card-container">
                {/* Card 1 */}
                <Link to="/frontendadmin/user" className="card">
                  <img src="https://img.freepik.com/free-vector/hand-drawn-flat-profile-icon_23-2149070174.jpg?t=st=1714355938~exp=1714359538~hmac=2ea12a6e360fa266cc7f99947e26df9dd1b4e258820bc36386988e79b812c7dc&w=1380" alt="users" />
                  <div className="card-links">
                    <p>User</p>
                  </div>
                </Link>
                {/* Card 2 */}
                <Link to="/frontendadmin/movies" className="card">
                  <img src="https://img.freepik.com/free-photo/view-3d-cinema-elements_23-2150720820.jpg?t=st=1714355649~exp=1714359249~hmac=41db8874c3348e6933b952eaf36c417d6816589e932fd1f2312a1f8e47183c2d&w=2000" alt="Movies" />
                  <div className="card-links">
                    <p>Movies</p>
                  </div>
                </Link>
                {/* Card 3 */}
                <Link to="/frontendadmin/promotions" className="card">
                  <img src="https://img.freepik.com/premium-vector/special-offers-promo-vouchers-templates-set_91128-1668.jpg?w=1800" alt="Promotions" />
                  <div className="card-links">
                    <p>Promotions</p>
                  </div>
                </Link>
                {/* Card 4 */}
                <Link to="/frontendadmin/showdetails" className="card">
                  <img src="https://img.freepik.com/free-photo/cinema-still-life_23-2148017284.jpg?t=st=1714355767~exp=1714359367~hmac=8dabc98c91fe6d58dace1bf746d3d5567dd350ba523e5e412eaf5a26c9111df6&w=2000" alt="Show Details" />
                  <div className="card-links">
                    <p>Show Details</p>
                  </div>
                </Link>
              </div>
            </div>
          </div>
        );

      case 'movies':
        return (
          <div className="admin-options">
            {/* Movies Options */}
            <h2>Movies Options</h2>
            {/* Add your movies-related options here */}
          </div>
        );

      case 'promotions':
        return (
          <div className="admin-options">
            {/* Promotions Options */}
            <h2>Promotions Options</h2>
            {/* Add your promotions-related options here */}
          </div>
        );

      case 'showdetails':
        return (
          <div className="admin-options">
            {/* Show Details Options */}
            <h2>Show Details Options</h2>
            {/* Add your show details-related options here */}
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <div className="admin-container">
      {/* Navbar */}
      <div className="admin-navbar">
        <img id="admin-logo" src="https://img.freepik.com/free-psd/3d-illustration-person-with-sunglasses_23-2149436188.jpg?w=1380&t=st=1714352995~exp=1714353595~hmac=164ddb2f14e23f4047298133333f91340b861908e3d0182a548e3c00100a8f84" alt="Admin Logo" />
      </div>

      {/* Options */}
      <div className="admin-content">
        {renderOptions()}
      </div>
    </div>
  );
};

export default AdminHome;
