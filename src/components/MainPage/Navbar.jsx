import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';

export const Navbar = ({ handleSearch, searchQuery, genre, setSelectedGenre }) => {
  return (

    <div className="search-bar">
      <button className={genre === "" ? "selected" : ""} onClick={() => { setSelectedGenre("") }}>All</button>
      <button className={genre === "Drama" ? "selected" : ""} onClick={() => { setSelectedGenre("Drama") }}>Drama</button>
      <button className={genre === "Crime" ? "selected" : ""} onClick={() => { setSelectedGenre("Crime") }}>Crime</button>
      <button className={genre === "Action" ? "selected" : ""} onClick={() => { setSelectedGenre("Action") }}>Action</button>
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
