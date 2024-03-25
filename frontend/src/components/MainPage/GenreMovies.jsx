import React from 'react';
import { NavLink,Link } from 'react-router-dom'; // Import NavLink instead of Link
import './GenreMovie.css';



export const GenreMovies = ({ movies, genre, searchQuery }) => {
  
  // Filter movies based on genre and search query
  const filteredMovies = movies.filter((movie) =>{

  return (movie.genre.includes(genre) &&
  movie.title && typeof movie.title === 'string' &&
  movie.title.toLowerCase().includes(searchQuery.toLowerCase())) && movie.visibility.toLowerCase()==="Now Playing".toLowerCase()
}
);
  return (
    
        <div>
  <h1 className="movie-booking-home-title">Now Playing</h1>
  <div className="movie-container1">
    {filteredMovies.map((movie, key) => (
      <div key={key}>
        <NavLink to={`/movie/${movie.title}`}>
              <div key={key} className="movie-box1">
                
                
                <img className="movie-image1" src={movie.trailer_picture} alt={movie.title} />
                <div className="movie-title1">{movie.title}</div>
                <p>
                  Watch Trailer: <a className="trailer-link1" href={movie.trailer_video}>Link</a>
                </p>
                <p className="movie-rating1">Ratings: {movie.ratings}</p>
                <p className="movie-genre1">Genre: {movie.genre}</p>
              </div>
              </NavLink>
      </div>
     
    ))}
  </div>
</div>

    

  );
};
