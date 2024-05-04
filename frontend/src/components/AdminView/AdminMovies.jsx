import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import useAdmin from './Admin/useAdmin';
import './AdminMovies.css';
const AdminMovies = () => {
  const [movies, setMovies] = useState([]);
  const [updateError, setUpdateError] = useState(null);
  const [createError, setCreateError] = useState(null);
  const {state}=useAdmin()
  const [formData, setFormData] = useState({
    id: null,
    title: '',
    ratings: '',
    cast: '',
    synopsis: '',
    rating: '',
    playing_now: false,
    trailer_picture: '',
    release_date: '',
    genre: '',
    trailer_video: '',
    director: '',
    producer: '',
    duration: '',
    visibility: '',
    certificate: '',
  }); 
  const [formData1, setFormData1] = useState({
    id: null,
    title: '',
    ratings: '',
    cast: '',
    synopsis: '',
    rating: '',
    playing_now: false,
    trailer_picture: '',
    release_date: '',
    genre: 'Drama',
    trailer_video: '',
    director: '',
    producer: '',
    duration: '',
    visibility: 'Now Playing',
    certificate: '',
  });

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      if(state){
      const response = await fetch('/admin/movies',{
        headers:{
          authorization:`Bearer ${state.adminuser.token}`
        }
      });
      const data = await response.json();
      setMovies(data);
      }
    } catch (error) {
      console.error('Error fetching movies:', error);
    }
  };

  // Create a new movie
  const createMovie = async () => {
    try {
      if(state){
        console.log(formData1)
      const response = await fetch('/admin/movies', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:`Bearer ${state.adminuser.token}`
        },
        body: JSON.stringify(formData1)
      });
      const data = await response.json();
      console.log('New movie created:', data);
      if(response.ok){
        setCreateError("New movie created")
      }
      else{
        setCreateError(data.message)
      }
      fetchMovies(); // Refresh the movie list after creating a new movie
    }
    } catch (error) {
      setCreateError(error)
      console.error('Error creating movie:', error);
    }
  };

  // Delete a movie by ID
  const deleteMovie = async (movieId) => {
    try {
      if(state){
       
      const response = await fetch(`/admin/movies/${movieId}`, {
        method: 'DELETE',
        headers:{
          authorization:`Bearer ${state.adminuser.token}`
        }
      });
      const data = await response.json();
      console.log('Movie deleted:', data.message);
      
      fetchMovies(); // Refresh the movie list after deleting a movie
    }
    } catch (error) {
      
      console.error('Error deleting movie:', error);
    }
  };

  // Update a movie by ID
  const updateMovie = async () => {
    try {
      if(state){
      const response = await fetch(`/admin/movies/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization:`Bearer ${state.adminuser.token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if(response.ok){
        setUpdateError("Movie updated")
      }
      else{
        setUpdateError(data.message)
      }
      console.log('Movie updated:', data);
      fetchMovies(); // Refresh the movie list after updating a movie
    }
    } catch (error) {
      setUpdateError(error)
      console.error('Error updating movie:', error);
    }
  };

  // Function to handle movie selection for editing
  const handleMovieSelect = (movie) => {
    setFormData(movie);
  };

  useEffect(() => {
    fetchMovies(); // Fetch movies on component mount
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div style={{ 'font-size': '30px',
  'color':'#fff',
  'padding-bottom': '20px'}}>Admin Movies</div>

      <div style={{ display: 'flex' }}>
        {/* Display movies */}
        <div className='movieLeft' style={{ width: '30%', marginRight: '10px' }}>
          <ul>
            {movies.map((movie) => (
              <li key={movie.id} onClick={() => handleMovieSelect(movie)}>
                {movie.title} - {movie.genre}
                <button onClick={() => deleteMovie(movie.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Edit form */}
        <div className='movieMiddle'  style={{ width: '30%', marginRight: '10px' }}>
  <div>
    <input
      type="text"
      placeholder="Title"
      value={formData.title}
      onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    />
    <input
      type="text"
      placeholder="Ratings"
      value={formData.ratings}
      onChange={(e) => setFormData({ ...formData, ratings: e.target.value })}
    />
    <input
      type="text"
      placeholder="Cast"
      value={formData.cast}
      onChange={(e) => setFormData({ ...formData, cast: e.target.value })}
    />
    <input
      type="text"
      placeholder="Synopsis"
      value={formData.synopsis}
      onChange={(e) => setFormData({ ...formData, synopsis: e.target.value })}
    />
    <input
      type="text"
      placeholder="Rating"
      value={formData.rating}
      onChange={(e) => setFormData({ ...formData, rating: e.target.value })}
    />
    <input
      type="text"
      placeholder="Trailer Picture"
      value={formData.trailer_picture}
      onChange={(e) => setFormData({ ...formData, trailer_picture: e.target.value })}
    />
    <input
      type="date"
      placeholder="Release Date"
      value={formData.release_date}
      onChange={(e) => setFormData({ ...formData, release_date: e.target.value })}
      
    />
    <select
      value={formData.genre}
      onChange={(e) => setFormData({ ...formData, genre: e.target.value })}
      id='genre-movie'
    >
      <option value="Drama">Drama</option>
      <option value="Action">Action</option>
      <option value="Crime">Crime</option>
    </select>

    <input
      type="text"
      placeholder="Trailer Video"
      value={formData.trailer_video}
      onChange={(e) => setFormData({ ...formData, trailer_video: e.target.value })}
    />
    <input
      type="text"
      placeholder="Director"
      value={formData.director}
      onChange={(e) => setFormData({ ...formData, director: e.target.value })}
    />
    <input
      type="text"
      placeholder="Producer"
      value={formData.producer}
      onChange={(e) => setFormData({ ...formData, producer: e.target.value })}
    />
    <input
      type="text"
      placeholder="Duration"
      value={formData.duration}
      onChange={(e) => setFormData({ ...formData, duration: e.target.value })}
    />
    <select
      value={formData.visibility}
      onChange={(e) => setFormData({ ...formData, visibility: e.target.value })}
      id="drop-down-movie"
    >
      <option value="Now Playing">Now Playing</option>
      <option value="Coming Soon">Coming Soon</option>
    </select>

    <input
      type="text"
      placeholder="Certificate"
      value={formData.certificate}
      onChange={(e) => setFormData({ ...formData, certificate: e.target.value })}
    />
    
    
    {updateError ? <div>{updateError}</div> : <></>}
    <button onClick={updateMovie}>Update Movie</button>
  </div>
</div>

        {/* Create movie form */}
        <div className='movieRight' style={{ width: '30%' }}>
  <div>
    <input
      type="text"
      placeholder="Title"
      value={formData1.title}
      onChange={(e) => setFormData1({ ...formData1, title: e.target.value })}
    />
    <input
      type="text"
      placeholder="Ratings"
      value={formData1.ratings}
      onChange={(e) => setFormData1({ ...formData1, ratings: e.target.value })}
    />
    <input
      type="text"
      placeholder="Cast"
      value={formData1.cast}
      onChange={(e) => setFormData1({ ...formData1, cast: e.target.value })}
    />
    <input
      type="text"
      placeholder="Synopsis"
      value={formData1.synopsis}
      onChange={(e) => setFormData1({ ...formData1, synopsis: e.target.value })}
    />
    <input
      type="text"
      placeholder="Rating"
      value={formData1.rating}
      onChange={(e) => setFormData1({ ...formData1, rating: e.target.value })}
    />
    <input
      type="text"
      placeholder="Trailer Picture"
      value={formData1.trailer_picture}
      onChange={(e) => setFormData1({ ...formData1, trailer_picture: e.target.value })}
    />
    <input
      type="date"
      placeholder="Release Date"
      value={formData1.release_date}
      onChange={(e) => setFormData1({ ...formData1, release_date: e.target.value })}
    />
    <select
      value={formData1.genre}
      onChange={(e) => setFormData1({ ...formData1, genre: e.target.value })}
      id="genre-movie"
    >
      <option value="Drama">Drama</option>
      <option value="Action">Action</option>
      <option value="Crime">Crime</option>
    </select>

    <input
      type="text"
      placeholder="Trailer Video"
      value={formData1.trailer_video}
      onChange={(e) => setFormData1({ ...formData1, trailer_video: e.target.value })}
    />
    <input
      type="text"
      placeholder="Director"
      value={formData1.director}
      onChange={(e) => setFormData1({ ...formData1, director: e.target.value })}
    />
    <input
      type="text"
      placeholder="Producer"
      value={formData1.producer}
      onChange={(e) => setFormData1({ ...formData1, producer: e.target.value })}
    />
    <input
      type="text"
      placeholder="Duration"
      value={formData1.duration}
      onChange={(e) => setFormData1({ ...formData1, duration: e.target.value })}
    />
    <select
      value={formData1.visibility}
      onChange={(e) => setFormData1({ ...formData1, visibility: e.target.value })}
    id="drop-down-movie"
    >
      <option value="Now Playing">Now Playing</option>
      <option value="Coming Soon">Coming Soon</option>
    </select>

    <input
      type="text"
      placeholder="Certificate"
      value={formData1.certificate}
      onChange={(e) => setFormData1({ ...formData1, certificate: e.target.value })}
    />
    
    {createError ? <div>{createError}</div> : <></>}
    <button onClick={createMovie}>Create Movie</button>
  </div>
</div>

      </div>


    </div>
  );
};

export default AdminMovies;
