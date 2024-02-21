import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import './GenreMovie.css';



export const GenreMovies = ({ movies, genre, searchQuery }) => {
  // Filter movies based on genre and search query
  const filteredMovies = movies.filter((movie) =>
  movie.Genre.includes(genre) &&
  movie.Series_Title && typeof movie.Series_Title === 'string' &&
  movie.Series_Title.toLowerCase().includes(searchQuery.toLowerCase())
);



  return (
    <div>
      <h1>{genre} Movies</h1>
      <div className="movies-container">
        {filteredMovies.map((movie, index) => (
          <NavLink key={index} to={`/movie/${movie.Series_Title}`} className="movie-card" activeclassname="active">
            <img src={movie.Poster_Link} alt={movie.Series_Title} />
            <h2>{movie.Series_Title}</h2>
        </NavLink>
        ))}
      </div>
    </div>
  );
};
