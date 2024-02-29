import React, { useState, useEffect } from 'react';
import './SeatSelection.css'; 

export function SeatSelection() {
    const [selectedSeats, setSelectedSeats] = useState([]);
    const [ticketPrice] = useState(15);
    const [totalPrice, setTotalPrice] = useState(0);

    const getAvailableSeats = (rows, columns) => {
        const letters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const seatLabels = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 1; j <= columns; j++) {
                const seatLabel = letters[i] + j;
                seatLabels.push(seatLabel);
            }
        }
        return seatLabels;
    };

    const toggleSeatSelection = (seatLabel) => {
        const index = selectedSeats.indexOf(seatLabel);
        if (index > -1) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatLabel));
        } else {
            setSelectedSeats([...selectedSeats, seatLabel]);
        }
    };

    const isSeatBooked = (seatLabel) => {
        const bookedSeats = ['B13', 'D2', 'E20', 'H5', 'J18'];
        return bookedSeats.includes(seatLabel);
    };

    const renderSeatContainer = (rows, columns) => {
        const availableSeats = getAvailableSeats(rows, columns);
        let currentRow = 0;
        const seatContainer = [];
        for (let i = 0; i < rows; i++) {
            const row = [];
            for (let j = 0; j < columns; j++) {
                const seatLabel = availableSeats[currentRow * columns + j];
                if (j === 10) {
                    row.push(<div key={`gap-${i}`} className="gap"></div>);
                }
                row.push(
                    <div
                        key={seatLabel}
                        className={`seat ${selectedSeats.includes(seatLabel) ? 'selected' : ''} ${isSeatBooked(seatLabel) ? 'booked' : ''}`}
                        onClick={() => {
                            if (!isSeatBooked(seatLabel)) {
                                toggleSeatSelection(seatLabel);
                            }
                        }}
                    >
                        {seatLabel}
                    </div>
                );
            }
            seatContainer.push(<div key={i} className="row">{row}</div>);
            currentRow++;
        }
        return seatContainer;
    };

    useEffect(() => {
        setTotalPrice(selectedSeats.length * ticketPrice);
    }, [selectedSeats]);

    const handleProceedToPayment = () => {
        console.log("Proceed to checkout");
    };

    return (
        <div className="container">
            <h2>Seat Selection</h2>
            <div className="screen">Screen This Way</div>
            <div className="seat-container">
                {renderSeatContainer(10, 20)} 
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
                You have selected <div id="count">{selectedSeats.length}</div> seat(s) for a total price of $
                <div id="total">{totalPrice}</div>
            </div>
            <button className="proceed-btn" onClick={handleProceedToPayment}>Proceed to Payment</button>
        </div>
    );
}
