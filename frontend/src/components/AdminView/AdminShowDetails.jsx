// AdminShowDetails.jsx
import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import useAdmin from './Admin/useAdmin';
import './AdminShowDetails.css';

const AdminShowDetails = () => {
  const [showDetails, setShowDetails] = useState([]);
  const [createError, setCreateError] = useState(null);
  const [updateError, setUpdateError] = useState(null);
  const { state } = useAdmin();
  const [movies, setMovies] = useState([]);
  const [formData, setFormData] = useState({
    MovieId: '',
    screenid: '',
    showDate: '',
    showTime: '08:00:00' // Default to first time option
  });
  const [formData1, setFormData1] = useState({
    MovieId: '',
    screenid: '',
    showDate: '',
    showTime: '08:00:00'
  });
  const [selectedShowDetail, setSelectedShowDetail] = useState(null);

  // Fetch all movies
  const fetchMovies = async () => {
    try {
      if (state) {
        const response = await fetch('/admin/movies', {
          headers: {
            authorization: `Bearer ${state.adminuser.token}`
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
          const estDate = new Date(gmtDate.getTime() - gmtDate.getTimezoneOffset() * 60000); // 5 hours difference for EST
          return { ...showDetail, showDateTime: estDate.toISOString() };
        });
        setShowDetails(updatedData);
      }
    } catch (error) {
      console.error('Error fetching show details:', error);
    }
  };

  useEffect(() => {
    fetchShowDetails(); // Fetch show details on component mount
  }, []);

  // Delete a show detail
  const deleteShowDetail = async (showDetailId) => {
    try {
      if (state) {
        const response = await fetch(`/admin/showdetails/${showDetailId}`, {
          method: 'DELETE',
          headers: {
            authorization: `Bearer ${state.adminuser.token}`
          }
        });
        if (response.ok) {
          fetchShowDetails(); // Refresh the show detail list after deleting a show detail
        } else {
          console.error('Error deleting show detail');
        }
      }
    } catch (error) {
      console.error('Error deleting show detail:', error);
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
          fetchShowDetails(); // Refresh the show detail list after creating a new show detail
        } else {
          setCreateError(data.message);
        }
      }
    } catch (error) {
      setCreateError(error);
      console.error('Error creating show detail:', error);
    }
  };

  // Update a show detail
  const updateShowDetail = async () => {
    try {
      if (state && selectedShowDetail) {
        const response = await fetch(`/admin/showdetails/${selectedShowDetail.id}`, {
          method: 'PATCH',
          headers: {
            'Content-Type': 'application/json',
            authorization: `Bearer ${state.adminuser.token}`
          },
          body: JSON.stringify({
            ...formData1,
            showDateTime: `${formData1.showDate}T${formData1.showTime}`
          })
        });
        if (response.ok) {
          setUpdateError("Show detail updated");
          fetchShowDetails(); // Refresh the show detail list after updating the show detail
        } else {
          setUpdateError("Error updating show detail");
        }
      }
    } catch (error) {
      console.error('Error updating show detail:', error);
      setUpdateError("Error updating show detail");
    }
  };

  // JSX for AdminShowDetails component
  return (
    <div>
      <AdminNavbar />
      <div>Admin Show Details</div>

      <div className='admin-show-details-container'>
        {/* Display show details */}
        <div className='show-details-left'>
          <ul>
            {showDetails.map((showDetail) => (
              <li key={showDetail.id} onClick={() => {
                setSelectedShowDetail(showDetail);
                setFormData1({...showDetail,showDate: new Date(showDetail.showDateTime).toISOString().substr(0, 10),showTime: '08:00:00'}); // Populate formData1 with the selected show detail
              }}>
                Movie: {showDetail.Movie.title} - Screen ID: {showDetail.screenid} - Show Date Time: {showDetail.showDateTime}
                <button onClick={() => deleteShowDetail(showDetail.id)}>Delete</button>
              </li>
            ))}
          </ul>
        </div>
        {/* Create or update show detail form */}
        <div className='show-details-right'>
          <div>
            <h2>Create New Show Detail</h2>
            {/* Form for creating new show detail */}
            <select id="select-movie"
              value={formData.MovieId}
              onChange={(e) => setFormData({ ...formData, MovieId: e.target.value })}
            >
              <option id="select-movie" value="">Select Movie</option>
              {movies.map((movie) => (
                <option key={movie.id} value={movie.id}>{movie.title}</option>
              ))}
            </select>
            {/* Other input fields for creating new show detail */}
            <input
              type="text"
              placeholder="Screen ID"
              value={formData.screenid}
              onChange={(e) => setFormData({ ...formData, screenid: e.target.value })}
            />
            <input
              type="date"
              placeholder="Show Date"
              value={formData.showDate}
              onChange={(e) => setFormData({ ...formData, showDate: e.target.value })}
              className='date-input-show'
              min={new Date().toISOString().split('T')[0]} 
            />
            <select id="select-time"
              value={formData.showTime}
              onChange={(e) => setFormData({ ...formData, showTime: e.target.value })}
            >
              <option value="08:00:00">08:00:00</option>
              <option value="12:00:00">12:00:00</option>
              <option value="16:00:00">16:00:00</option>
              <option value="20:00:00">20:00:00</option>
            </select>
            {createError && <div className='error-message'>{createError}</div>}
            <button onClick={createShowDetail}>Create Show Detail</button>
          </div>
          {selectedShowDetail && (
            <div id="update-show-details">
            <div>
              <h2>Update Show Detail</h2>
              <select id="update-movie-title"
                value={formData1.MovieId}
                onChange={(e) => setFormData1({ ...formData1, MovieId: e.target.value })}
                disabled={true}
              >
                <option value="">Select Movie</option>
                {movies.map((movie) => (
                  <option key={movie.id} value={movie.id}>{movie.title}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder="Screen ID"
                value={formData1.screenid}
                onChange={(e) => setFormData1({ ...formData1, screenid: e.target.value })}
              />
              <input
                type="date"
                placeholder="Show Date"
                value={formData1.showDate}
                onChange={(e) => setFormData1({ ...formData1, showDate: e.target.value })}
                min={new Date().toISOString().split('T')[0]} 
              />
              <select id="update-time-details"
                value={formData1.showTime}
                onChange={(e) => setFormData1({ ...formData1, showTime: e.target.value })}
              >
                <option value="08:00:00">08:00:00</option>
                <option value="12:00:00">12:00:00</option>
                <option value="16:00:00">16:00:00</option>
                <option value="20:00:00">20:00:00</option>
              </select>
              {updateError && <div className='error-message'>{updateError}</div>}
              <button onClick={updateShowDetail}>Update Show Detail</button>
            </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminShowDetails;
