import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import './GenreMovie.css';

export const GenreMovies = ({ movies, genre }) => {
    const actionMovies = movies.filter(movie => movie.Genre.includes(genre));

    return (
        <div>
            <h1>{genre} Movies</h1>
            <div className="movies-container">
                {actionMovies.map((movie, index) => (
                    <NavLink key={index} to={`/movie/${movie.Series_Title}`} className="movie-card" activeClassName="active">
                        <img src={movie.Poster_Link} alt={movie.Series_Title} />
                        <h2>{movie.Series_Title}</h2>
                    </NavLink>
                ))}
            </div>
        </div>
    );
};
