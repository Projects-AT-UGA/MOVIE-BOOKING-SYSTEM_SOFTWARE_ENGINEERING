import React, { useState } from 'react';
import './Home.css';
import { GenreMovies } from './GenreMovies';

export const Home = ({movies}) => {

  const [searchQuery, setSearchQuery] = useState('');

  const handleSearch = (query) => {
    setSearchQuery(query);
  };

  return (
    <div>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search movies..."
          value={searchQuery}
          onChange={(e) => handleSearch(e.target.value)}
        />
      </div>
      <div className="genre-movies-container">
        <GenreMovies movies={movies} genre="Drama" searchQuery={searchQuery} />
        <GenreMovies movies={movies} genre="Crime" searchQuery={searchQuery} />
        <GenreMovies movies={movies} genre="Action" searchQuery={searchQuery} />
        {/* Add more GenreMovies components for other genres */}
        {/* Example:
        <GenreMovies movies={movies} genre="Comedy" searchQuery={searchQuery} />
        <GenreMovies movies={movies} genre="Thriller" searchQuery={searchQuery} />
        */}
      </div>
    </div>
  );
};
