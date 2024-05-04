import React, { useState } from 'react';
import { NavLink ,Link} from 'react-router-dom';
import './GenreMovie.css';

export const GenreMovies = ({ movies, genre, searchQuery }) => {
  const [filter, setFilter] = useState('Now Playing');
  
  // Filter movies based on genre, search query, and filter option
  const filteredMovies = movies.filter((movie) => {
    // Check if the movie satisfies the conditions for inclusion
    const matchesGenre = movie.genre.includes(genre);
    const matchesSearchQuery =
      movie.title &&
      typeof movie.title === 'string' &&
      movie.title.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter =
      movie.visibility.toLowerCase() === filter.toLowerCase();

    // Return true only if all conditions are met
    return matchesGenre && matchesSearchQuery && matchesFilter;
  });

  // Deduplicate movies based on title
  const uniqueMovies = Array.from(new Set(filteredMovies.map((movie) => movie.title)))
    .map((title) => filteredMovies.find((movie) => movie.title === title));
  return (
    <div>
      <div className="filter-container">
        <button
          className={`filter-button ${filter === 'Now Playing' ? 'active' : ''}`}
          onClick={() => setFilter('Now Playing')}
        >
          Now Playing
        </button>
        <button
          className={`filter-button ${filter === 'Coming Soon' ? 'active' : ''}`}
          onClick={() => setFilter('Coming Soon')}
        >
          Coming Soon
        </button>
      </div>
      <h1 className="movie-booking-home-title">{filter}</h1>
      <div className="movie-container1">
        {uniqueMovies.length!==0 ? uniqueMovies.map((movie, index) => (
          <NavLink key={index} to={`/movie/${movie.title}`}>
            <div className="movie-box1">
              <img className="movie-image1" src={movie.trailer_picture} alt={movie.title} />
              <div className="movie-title1">{movie.title}</div>
              <p>
                Watch Trailer: <a className="trailer-link1" href={movie.trailer_video}>Link</a>
              </p>
              <p className="movie-rating1">Ratings: {movie.ratings}</p>
              <p className="movie-genre1">Genre: {movie.genre}</p>
              
              { movie.visibility.toLowerCase() === "Now Playing".toLowerCase()? <button id="movie-booking-info"> <Link to={`/movie/${movie.title}`}>Book Movie</Link> </button>  : <></>}
           
            </div>
          </NavLink> 
        )): <div style={{color:"white"}}>No Movies to watch</div>}
      </div>
    </div>
  );
};
