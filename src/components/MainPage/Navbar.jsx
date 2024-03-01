import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

export const Navbar = ({ handleSearch, searchQuery }) => {
  return (

    <div className="search-bar">
      <input className="search"
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      <NavLink to="/editprofile"><button className='navbar-b1'><span class="material-symbols-outlined">
manage_accounts
</span></button></NavLink>
       <NavLink to="/login"><button className='navbar-b2'>Login</button></NavLink>
    </div>
  );
};
