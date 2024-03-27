import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import './MovieTime.css';

export const MovieTime = ({ movies }) => {
  const { title } = useParams(); // Access route parameters
  const navigate = useNavigate();

  // Find the movie by its title
  const movie = movies && movies.find(movie => movie.title === title);

  const [selectedDate, setSelectedDate] = useState(''); // State to store selected date
  const [selectedScreen, setSelectedScreen] = useState(''); // State to store selected screen
  const [selectedTime, setSelectedTime] = useState(''); // State to store selected time

  const handleDateChange = (e) => {
    setSelectedDate(e.target.value);
    setSelectedScreen(''); // Reset selected screen when date changes
    setSelectedTime(''); // Reset selected time when date changes
  };

  const handleScreenChange = (e) => {
    setSelectedScreen(e.target.value);
    setSelectedTime(''); // Reset selected time when screen changes
  };

  const handleTimeChange = (e) => {
    setSelectedTime(e.target.value);
  };

  if (!movie) {
    return <div className="movie-time">Movie not found</div>; // Display message if movie with given title is not found
  }

  // Sample data for demonstration
  const screens = ['Screen 1', 'Screen 2', 'Screen 3'];
  const dates = ['2024-03-01', '2024-03-02', '2024-03-03'];
  const showtimes = ['10:00 AM', '1:00 PM', '4:00 PM', '7:00 PM', '10:00 PM'];

  return (
    <>
    <h3 id="movie-time-title">Movie Show Details </h3>
    
    <div className="movie-time">
        
      
        <div className="movie-info">
          <div className='movie-time-image-box'>
          <img className="movie-time-image" src={movie.trailer_picture} alt={movie.title} />
          </div>
          <div className="showtime-selection">
        
      <div className="movie-details-time">
        <h2 className="movie-time-title">{movie.title}</h2>
            <h3 className="select-label">Select Show Date</h3>
            <select className="date-select" value={selectedDate} onChange={handleDateChange}>
              <option value="">Select Date</option>
              {dates.map((date, index) => (
                <option key={index} value={date}>
                  {date}
                </option>
              ))}
            </select>

            {selectedDate && (
              <>
              <h3 className="select-label">Select Screen</h3>
                <select className="screen-select" value={selectedScreen} onChange={handleScreenChange}>
                  <option value="">Select Screen</option>
                  {screens.map((screen, index) => (
                    <option key={index} value={screen}>
                      {screen}
                    </option>
                  ))}
                </select>
              </>
            )}

            {selectedScreen && (
              <>
              <h3 className="select-label">Select ShowTime</h3>
                <select className="time-select" value={selectedTime} onChange={handleTimeChange}>
                  <option value="">Select Time</option>
                  {showtimes.map((time, index) => (
                    <option key={index} value={time}>
                      {time}
                    </option>
                  ))}
                </select>
              </>
            )}

            <button className="proceed-button" disabled={!selectedDate || !selectedScreen || !selectedTime} onClick={() => { navigate("/seatselection") }}>
              Proceed to Seat Selection
            </button>
          </div>
        </div>
      </div>
    </div>
    </>
  );
};