import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import './MovieDetails.css';

export const MovieTime = ({ movies }) => {
  const { title } = useParams(); // Access route parameters

  // Find the movie by its title
  const movie = movies && movies.find(movie => movie.title === title);

  if (!movie) {
    return <div>Movie not found</div>; // Display message if movie with given title is not found
  }

  // Extract video ID from YouTube URL
  const videoId = movie.trailer_video.split('v=')[1];

  const [isTrailerOpen, setIsTrailerOpen] = useState(false);
  const handleBookTickets=()=>{
    
  }
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
         <time>10:00pm</time>
        <input></input>
        </div>
      </div>


    </div>
  );
};

