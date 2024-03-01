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
      <NavLink to="/editprofile"><button>edit profile</button></NavLink>
       <NavLink to="/login"><button>Login</button></NavLink>
    </div>
  );
};
