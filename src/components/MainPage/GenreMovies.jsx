import React from 'react';
import { NavLink,Link } from 'react-router-dom'; // Import NavLink instead of Link
import './GenreMovie.css';



export const GenreMovies = ({ movies, genre, searchQuery }) => {
  // Filter movies based on genre and search query
  const filteredMovies = movies.filter((movie) =>{
  console.log(genre);
  console.log(movie.genre);
  return (movie.genre.includes(genre) &&
  movie.title && typeof movie.title === 'string' &&
  movie.title.toLowerCase().includes(searchQuery.toLowerCase()))
}
);



  return (
    
        <div>
  <h1 className="movie-booking-home-title">Movie Booking Home Page</h1>
  <div className="movie-container">
    {filteredMovies.map((movie, key) => (
      <NavLink to={`/movie/${movie.title}`}>
      <div key={key} className="movie-box">
        <h2 className="movie-title">{movie.title}</h2>
        <p className="movie-description">{movie.description}</p>
        <img className="movie-image" src={movie.trailer_picture} alt={movie.title} />
        <p>
          Watch Trailer: <a className="trailer-link" href={movie.trailer_video}>Link</a>
        </p>
        <p className="movie-rating">Ratings: {movie.ratings}</p>
        <p className="movie-genre">Genre: {movie.genre}</p>
      </div>
      </NavLink>
    ))}
  </div>
</div>

    

  );
};
