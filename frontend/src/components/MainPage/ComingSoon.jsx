import React from 'react';
import { NavLink } from 'react-router-dom'; // Import NavLink instead of Link
import './ComingSoon.css';



export const ComingSoon = ({ movies, genre, searchQuery }) => {
  
  // Filter movies based on genre and search query
  const filteredMovies = movies.filter((movie) =>{
 
  return (movie.genre.includes(genre) &&
  movie.title && typeof movie.title === 'string' &&
  movie.title.toLowerCase().includes(searchQuery.toLowerCase())) && movie.visibility.toLowerCase()==="Coming Soon".toLowerCase()
}
);



  return (
    
<div>

  

</div>

    

  );
};
