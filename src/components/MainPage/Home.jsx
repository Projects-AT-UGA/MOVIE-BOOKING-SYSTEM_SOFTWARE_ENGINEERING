import React, { useState } from 'react';
import './Home.css';
import { GenreMovies } from './GenreMovies';
import { Navbar } from './Navbar';

export const Home = ({movies}) => {

  const [searchQuery, setSearchQuery] = useState('');
  const [genre,setSelectedGenre]=useState("")
  
  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <Navbar handleSearch={handleSearch} searchQuery={searchQuery} genre={genre} setSelectedGenre={setSelectedGenre}></Navbar>
      
      <div className="genre-movies-container">
      <GenreMovies movies={movies} genre={genre} searchQuery={searchQuery} />
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
