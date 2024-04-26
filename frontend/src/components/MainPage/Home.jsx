import React, { useState } from 'react';
import './Home.css';
import { GenreMovies } from './GenreMovies';
import { Navbar } from './Navbar';
import { Navbar1 } from './Navbar1';
import {ComingSoon} from './ComingSoon';
import logo from "./logo.png";
export const Home = ({movies}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [genre,setSelectedGenre]=useState("")
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div className='home-container'>
        <div className="logo-and-search">
        <img 
          src={logo}
          alt="Big Screen Baazar Logo"
          id="logo"
          onClick={() => { navigate("/") }}
          style={{ cursor: 'pointer' }} 
        />
      </div>
      <Navbar handleSearch={handleSearch} searchQuery={searchQuery} ></Navbar>
      <Navbar1 genre={genre} setSelectedGenre={setSelectedGenre}></Navbar1>
      <div className="genre-movies-container">
      <GenreMovies movies={movies} genre={genre} searchQuery={searchQuery} />
      <ComingSoon movies={movies} genre={genre} searchQuery={searchQuery}></ComingSoon>
        {/* <GenreMovies movies={movies} genre="Drama" searchQuery={searchQuery} /> */}
        {/* <GenreMovies movies={movies} genre="Crime" searchQuery={searchQuery} /> */}
        {/* <GenreMovies movies={movies} genre="Action" searchQuery={searchQuery} /> */}
        {/* Add more GenreMovies components for other genres */}
        {/* Example:
        <GenreMovies movies={movies} genre="Comedy" searchQuery={searchQuery} />
        <GenreMovies movies={movies} genre="Thriller" searchQuery={searchQuery} />
        */}
      </div>
      </div>
    
  );
};
