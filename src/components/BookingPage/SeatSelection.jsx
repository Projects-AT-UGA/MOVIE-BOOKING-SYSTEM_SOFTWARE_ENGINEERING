import React, { useState, useEffect } from 'react';
import './SeatSelection.css';

export function SeatSelection() {
  const [selectedSeats, setSelectedSeats] = useState([]);
  const [ticketPrice, setTicketPrice] = useState(15);
  const [total, setTotal] = useState(0);
  const [bookedSeats] = useState(['A5', 'B7', 'C8']); // Example of booked seats

  const rows = ['A', 'B', 'C', 'D', 'E', 'F', 'G', 'H', 'I', 'J'];
  const columns = 20;

  const Seat = ({ label, isBooked, isSelected }) => {
    const seatClass = isBooked ? 'booked' : isSelected ? 'selected' : 'available';

    const toggleSeatSelection = () => {
      if (!isBooked) {
        const updatedSelectedSeats = isSelected ? selectedSeats.filter(seat => seat !== label) : [...selectedSeats, label];
        setSelectedSeats(updatedSelectedSeats);
      }
    };

    return (
      <div className={`seat ${seatClass}`} onClick={toggleSeatSelection}>
        {label}
      </div>
    );
  };

  const updateSelectedCount = () => {
    const selectedSeatsCount = selectedSeats.length;
    setTotal(selectedSeatsCount * ticketPrice);
  };

  useEffect(() => {
    updateSelectedCount();
  }, [selectedSeats, ticketPrice]);

  return (
    <div className="container">
      <h2>Seat Selection</h2>
      <div className="screen">Screen This Way</div>
      <div className="seat-container">
        {rows.map((row, rowIndex) => (
          <div className="row" key={rowIndex}>
            {Array.from({ length: columns }, (_, columnIndex) => (
              <>
                {columnIndex === Math.floor(columns / 2) && <div className="gap"></div>}
                <Seat
                  key={`${row}${columnIndex}`}
                  label={`${row}${columnIndex + 1}`}
                  isBooked={bookedSeats.includes(`${row}${columnIndex + 1}`)}
                  isSelected={selectedSeats.includes(`${row}${columnIndex + 1}`)}
                />
              </>
            ))}
          </div>
        ))}
      </div>
      <ul className="showcase">
        <li>
          <div className="seat available"></div>
          <small>Available</small>
        </li>
        <li>
          <div className="seat selected"></div>
          <small>Selected</small>
        </li>
        <li>
          <div className="seat booked"></div>
          <small>Booked</small>
        </li>
      </ul>
      <div className="text">
        <p>
          You have selected <span id="count">{selectedSeats.length}</span> seat(s) for a total price of $<span id="total">{total}</span>
        </p>
        <button className="proceed-button" onClick={() => console.log('Proceed to payment')}>Proceed</button>
      </div>
    </div>
  );
}
