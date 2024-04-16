import React, { useState,useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieTime.css';

export const MovieTime = ({ movies }) => {
  const { title,id } = useParams(); // Access route parameters
  const navigate = useNavigate();

  // Find the movie by its title
  const movie = movies && movies.find(movie => movie.title === title);
  const [showDetails, setShowDetails] = useState([]);
  // const screens = ['Screen 1', 'Screen 2', 'Screen 3'];
  // const dates = ['2024-03-01', '2024-03-02', '2024-03-03'];
  // const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];
  
  const [selectedDate, setSelectedDate] = useState(''); // State to store selected date
  const [selectedTime, setSelectedTime] = useState(''); // State to store selected time
  const [selectedScreen, setSelectedScreen] = useState(''); // State to store selected screen
  

  useEffect(() => {
    const fetchMovieShowDetails = async () => {
      try {
        const response = await fetch(`/booking/${id}`); // Adjust the endpoint based on your backend API
        if (response.ok) {
          const data = await response.json();
          setShowDetails(data);
          
          // console.log(data)
        } else {
          console.error('Failed to fetch movie show details:', response.statusText);
        }
      } catch (error) {
        console.error('Error fetching movie show details:', error);
      }
    };

    fetchMovieShowDetails();
  }, [id]);

  const handleDateChange = (e) => {
    console.log(new Date(e.target.value))
    setSelectedDate(e.target.value);
    setSelectedScreen(''); // Reset selected screen when date changes
    setSelectedTime(''); // Reset selected time when date changes
  };
  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
    setSelectedScreen(''); 
  };
  const handleScreenChange = (e) => {
    setSelectedScreen(e.target.value);
  };

  

  if (!movie) {
    return <div className="movie-time">Movie not found</div>; // Display message if movie with given title is not found
  }

  // Sample data for demonstration
  

  return (
    <>
    <h3 id="movie-time-title">Movie Show Details </h3>
    
    <div className="movie-time">
        
      
        <div className="movie-info">
          <div className='movie-time-image-box'>
          <img className="movie-time-image" src={movie.trailer_picture} alt={movie.title} />
          </div>
          { (showDetails && showDetails.length!=0) ?
              <div className="showtime-selection">
          
                <div className="movie-details-time">
                <h2 className="movie-time-title">{movie.title}</h2>
                    <h3 className="select-label">Select Show Date</h3>
                          <select className="date-select" value={selectedDate} onChange={handleDateChange}>
                            <option value="">Select Date</option>
                            {[...new Set(showDetails.map(detail => new Date(detail.showDateTime).toLocaleDateString()))].map((date, index) => (
                              <option key={index} value={date}>
                                {new Date(date).toLocaleString('en-US', {
                                  weekday: 'long',
                                  year: 'numeric',
                                  month: 'long',
                                  day: 'numeric',
                                })}
                              </option>
                            ))}
                          </select>


                                              
                          {selectedDate && (
                          <select className="time-select" value={selectedTime} onChange={handleTimeChange}>
                            <option value="">Select Time</option>
                            {[...new Set(showDetails
                              .filter(detail => new Date(detail.showDateTime).toLocaleDateString() === selectedDate)
                              .map(detail => new Date(detail.showDateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })))
                            ].map((time, index) => (
                              <option key={index} value={time}>
                                {time}
                              </option>
                            ))}
                          </select>
                        )}

                        {selectedDate && selectedTime && (
                          <select className="screen-select" value={selectedScreen} onChange={handleScreenChange}>
                            <option value="">Select Screen</option>
                            {[...new Set(showDetails
                              .filter(detail => new Date(detail.showDateTime).toLocaleDateString() === selectedDate && new Date(detail.showDateTime).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' }) === selectedTime)
                              .map(detail => detail.screenid))
                            ].map((screenId, index) => (
                              <option key={index} value={screenId}>
                                {`Screen ${screenId}`}
                              </option>
                            ))}
                          </select>
                        )}

                   
                    
                    <button className="proceed-button" disabled={!selectedDate || !selectedScreen || !selectedTime} onClick={() => { navigate("/seatselection") }}>
                      Proceed to Seat Selection
                    </button>
                </div>

              </div>

          :<div> no bookings available </div>}
      </div>
      
    </div>
    </>
  );
};