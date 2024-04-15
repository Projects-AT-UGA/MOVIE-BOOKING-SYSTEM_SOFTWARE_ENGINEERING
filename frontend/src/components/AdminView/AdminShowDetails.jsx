import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import useAdmin from './Admin/useAdmin';
import './AdminShowDetails.css';

const AdminShowDetails = () => {
  const [showDetails, setShowDetails] = useState([]);
  const [createError, setCreateError] = useState(null);
  const { state } = useAdmin();
  const [movies, setMovies] = useState([]);
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

  useEffect(() => {
    fetchMovies(); // Fetch movies on component mount
  }, []);

  const [formData, setFormData] = useState({
    MovieId: '',
    screenid: '',
    showDate: '',
    showTime: '08:00:00' // Default to first time option
  });

  // Fetch all show details
 // Fetch all show details
const fetchShowDetails = async () => {
  try {
    if (state) {
      const response = await fetch('/admin/showdetails', {
        headers: {
          authorization: `Bearer ${state.adminuser.token}`
        }
      });
      const data = await response.json();
      // Convert the date from GMT to Eastern Time
      const updatedData = data.map(showDetail => {
        const gmtDate = new Date(showDetail.showDateTime);
        const estDate = new Date(gmtDate.getTime() - gmtDate.getTimezoneOffset() * 60000 ); // 5 hours difference for EST
        return { ...showDetail, showDateTime: estDate.toISOString() };
      });
      setShowDetails(updatedData);
    }
  } catch (error) {
    console.error('Error fetching show details:', error);
  }
};

  // Create a new show detail
  const createShowDetail = async () => {
    try {
      if (state) {
        const response = await fetch('/admin/showdetails', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${state.adminuser.token}`
          },
          body: JSON.stringify({
            ...formData,
            showDateTime: `${formData.showDate}T${formData.showTime}`
          })
        });
        const data = await response.json();
        if (response.ok) {
          setCreateError("New show detail created");
        } else {
          setCreateError(data.message);
        }
        fetchShowDetails(); // Refresh the show detail list after creating a new show detail
      }
    } catch (error) {
      setCreateError(error);
      console.error('Error creating show detail:', error);
    }
  };

  useEffect(() => {
    fetchShowDetails(); // Fetch show details on component mount
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div>Admin Show Details</div>

      
      <div style={{ display: 'flex' }}>
        {/* Display show details */}
        <div className='showDetailsLeft' style={{ width: '30%', marginRight: '10px' }}>
          <ul>
            {showDetails.map((showDetail) => (
              <li key={showDetail.id}>
                Movie ID: {showDetail.MovieId} - Screen ID: {showDetail.screenid} - Show Date Time: {showDetail.showDateTime}
              </li>
            ))}
          </ul>
        </div>
        {/* Create show detail form */}
        <div className='showDetailsRight' style={{ width: '30%' }}>
          <div>
            <select
              value={formData.MovieId}
              onChange={(e) => setFormData({ ...formData, MovieId: e.target.value })}
            >
              <option value="">Select Movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>{movie.title}</option>
              ))}
            </select>
            <select
  value={formData.screenid}
  onChange={(e) => {
    const value = e.target.value;
    if (/^[1-3]$/.test(value) || value === '') {
      setFormData({ ...formData, screenid: value });
    }
  }}
>
  <option value="">Select Screen ID</option>
  <option value="1">1</option>
  <option value="2">2</option>
  <option value="3">3</option>
</select>


            <input
              type="date"
              placeholder="Show Date"
              value={formData.showDate}
              onChange={(e) => setFormData({ ...formData, showDate: e.target.value })}
            />
            <select
              value={formData.showTime}
              onChange={(e) => setFormData({ ...formData, showTime: e.target.value })}
            >
              <option value="08:00:00">08:00:00</option>
              <option value="12:00:00">12:00:00</option>
              <option value="16:00:00">16:00:00</option>
              <option value="20:00:00">20:00:00</option>
            </select>
            {createError ? <div>{createError}</div> : <></>}
            <button onClick={createShowDetail}>Create Show Detail</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AdminShowDetails;
