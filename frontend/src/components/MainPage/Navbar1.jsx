import React from 'react'
import './Navbar1.css'
export const Navbar1 = ({genre, setSelectedGenre}) => {
  return (
    <div className='navbar1-container'>
        <button className={genre === "All" ? "selected1" : ""} onClick={() => { setSelectedGenre("") }} id="navbar1-b1">All</button>
      <button className={genre === "Drama" ? "selected1" : ""} onClick={() => { setSelectedGenre("Drama") }} id="navbar1-b2">Drama</button>
      <button className={genre === "Crime" ? "selected1" : ""} onClick={() => { setSelectedGenre("Crime") }} id="navbar1-b3">Crime</button>
      <button className={genre === "Action" ? "selected1" : ""} onClick={() => { setSelectedGenre("Action") }} id="navbar1-b4">Action</button>
    </div>
  )
}
