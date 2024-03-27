import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieDetails.css';
import Navbar from './Navbar';

const MovieDetails = ({ movies }) => {
  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const navigate = useNavigate();
  const { title } = useParams(); // Access route parameters

  // Find the movie by its title
  const movie = movies && movies.find((movie) => movie.title === title);

  if (!movie) {
    return <div className="movie-not-found">Movie not found</div>; // Display message if movie with given title is not found
  }

  // Extract video ID from YouTube URL
  const videoId = movie.trailer_video.split('v=')[1];

  const handlePlayTrailer = () => {
    setIsTrailerOpen(true);
  };

  const handleCloseTrailer = () => {
    setIsTrailerOpen(false);
  };

  return (
    <div className="movie-details-container">
      <Navbar />
      <h1 style={{ color: "white" }}>Movie Details</h1>

      <div className="movie-info">
        <div className="movie-image-box">
          <img className="movie-image" src={movie.trailer_picture} alt={movie.title} />
        </div>
        <div className="movie-details">
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
          <button className="book-tickets" onClick={() => navigate("/movietime/" + title)}>Book Tickets</button>
          <button className="play-trailer" onClick={handlePlayTrailer}>Play Trailer</button>
        </div>
      </div>

      {isTrailerOpen && (
        <div className="trailer-overlay">
          <div className="trailer-container">
            <iframe
              title={`Trailer for ${movie.title}`}
              src={`https://www.youtube.com/embed/${videoId}`}
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              className="trailer-video"
            ></iframe>
            <button className="close-trailer" onClick={handleCloseTrailer}>Close Trailer</button>
          </div>
        </div>
      )}
    </div>
  );
};

export default MovieDetails;
