import React from 'react';
import { useParams } from 'react-router-dom';

const MovieDetails = ({ movies }) => {
    
    const { title } = useParams(); // Access route parameters
    console.log(title)
    // Find the movie by its title
    const movie = movies && movies.find(movie => movie.Series_Title === title);

    if (!movie) {
        return <div>Movie not found</div>; // Display message if movie with given title is not found
    }

    return (
        <div>
            <img src={movie.Poster_Link} alt={movie.Series_Title} />
            <h1>{movie.Series_Title}</h1>
            <p>Released Year: {movie.Released_Year}</p>
            <p>Certificate: {movie.Certificate}</p>
            <p>Runtime: {movie.Runtime}</p>
            <p>Genre: {movie.Genre}</p>
            <p>IMDB Rating: {movie.IMDB_Rating}</p>
            <p>Overview: {movie.Overview}</p>
            <p>Meta Score: {movie.Meta_score}</p>
            <p>Director: {movie.Director}</p>
            <p>Stars: {movie.Star1}, {movie.Star2}, {movie.Star3}, {movie.Star4}</p>
            <p>No of Votes: {movie.No_of_Votes}</p>
            <p>Gross: {movie.Gross}</p>
        </div>
    );
};

export default MovieDetails;
