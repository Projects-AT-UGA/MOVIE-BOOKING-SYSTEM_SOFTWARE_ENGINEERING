import React from 'react'
import './Home.css'
import { GenreMovies } from './GenreMovies';

export const Home = ({movies}) => {
    

  return (
    <div>
        <GenreMovies movies={movies} genre={"Action"}></GenreMovies>
        <GenreMovies movies={movies} genre={"Drama"}></GenreMovies>
        <GenreMovies movies={movies} genre={"Crime"}></GenreMovies>
    </div>
  )
}



