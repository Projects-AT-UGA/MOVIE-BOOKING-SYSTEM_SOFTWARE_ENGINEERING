import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

const MovieDetails = ({ movies }) => {
  const { title } = useParams(); // Access route parameters

  // Find the movie by its title
  const movie = movies && movies.find(movie => movie.title === title);

  if (!movie) {
    return <div>Movie not found</div>; // Display message if movie with given title is not found
  }

  // Extract video ID from YouTube URL
  const videoId = movie.trailer_video.split('v=')[1];

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);

  const handlePlayTrailer = () => {
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  return (
    <div>
      <h1>Movie Details</h1>

      <div className='movie-info'>
        <img  className="movie-image" src={movie.trailer_picture} alt={movie.title} />
        <div className='movie-details'>
          <h2>{movie.title}</h2>
          <p>Director: {movie.director}</p>
          <p>Producer: {movie.producer}</p>
          <p>Cast: {movie.cast}</p>
          <p>Genre: {movie.genre}</p>
          <p>Duration: {movie.duration}</p>
          <p>Release Date: {movie.release_date}</p>
          <p>Certificate: {movie.certificate}</p>
          <p>Ratings: {movie.ratings}</p>
          <p>Synopsis: {movie.synopsis}</p>
          <button className="book-tickets">Book Tickets</button>
          &nbsp;  &nbsp;  &nbsp;
          <button className="play-trailer" onClick={handlePlayTrailer}>Play Trailer</button>
        </div>
      </div>

      {movie.playing_now ? <p>Now Playing</p> : null}

      {isTrailerOpen && (
        <div className="trailer-overlay">
          <button className="close-trailer" onClick={handleCloseTrailer}>Close Trailer</button>
          <div className="trailer-container">
            <iframe
              title={`Trailer for ${movie.title}`}
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
            ></iframe>
          </div>
        </div>
      )}

    </div>
  );
};

export default MovieDetails;
