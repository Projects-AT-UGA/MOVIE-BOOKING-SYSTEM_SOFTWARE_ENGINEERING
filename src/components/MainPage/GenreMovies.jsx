import React from 'react'
import './GenreMovie.css'
export const GenreMovies = ({movies,genre}) => {
    console.log(movies)
    const actionMovies = movies.filter(movie => movie.genre.includes(genre));

  return (
    <div>
      <h1>{genre} Movies</h1>
      <div className="movies-container">
        {actionMovies.map(movie => (
          <div key={movie.id} className="movie-card">
            <img src={movie.Poster_Link} alt={movie.Series_Title} />
            <h2>{movie.Series_Title}</h2>
          </div>
        ))}
      </div>
    </div>
  );
  
}

