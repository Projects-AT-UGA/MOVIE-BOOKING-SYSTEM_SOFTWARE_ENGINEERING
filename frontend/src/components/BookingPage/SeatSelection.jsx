import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import './SeatSelection.css'; 
import FormInput from '../Registration/FormInput';
import useBooking from '../../booking/useBooking';
import useTickets from '../../booking/useTickets';

export function SeatSelection() {
    const [selectedSeats,setSelectedSeats]=useState([])
    const [ticketPrice] = useState(15);
    const [totalPrice, setTotalPrice] = useState(0);
    const [seatDetails, setSeatDetails] = useState({});
    const [paymentOption, setPaymentOption] = useState('');
    const navigate=useNavigate();
    const {state}=useBooking()
    const [bookedSeats,setBookedSeats,error,isloading,getTickets]=useTickets()
    useEffect(()=>{
        getTickets()
    },[state])

    
    const getAvailableSeats = (rows, columns) => {
        const seatLabels = [];
        for (let i = 0; i < rows; i++) {
            for (let j = 1; j <= columns; j++) {
                const seatLabel =  j;
                seatLabels.push(seatLabel);
            }
        }
        return seatLabels;
    };

    const toggleSeatSelection = (seatLabel) => {
        const index = selectedSeats.indexOf(seatLabel);
        if (index > -1) {
            setSelectedSeats(selectedSeats.filter(seat => seat !== seatLabel));
            const updatedSeatDetails = { ...seatDetails };
            delete updatedSeatDetails[seatLabel];
            setSeatDetails(updatedSeatDetails);
        } else {
            setSelectedSeats([...selectedSeats, seatLabel]);
            setSeatDetails({ ...seatDetails, [seatLabel]: 'adult' }); // Default to adult
        }
    };

    const isSeatBooked = (seatLabel) => {
        return bookedSeats.includes(seatLabel);
    };

    useEffect(() => {
        setTotalPrice(selectedSeats.length * ticketPrice);
    }, [selectedSeats, ticketPrice]);

    const handleProceedToPayment = () => {
        console.log("Proceed to checkout with payment option:", paymentOption);
    };

    const renderSelectedTickets = () => {
        return selectedSeats.map(seat => (
            <div key={seat}>
                Selected Seat: {seat} -  
                <select
                    value={seatDetails[seat] || ''}
                    onChange={(e) => {
                        setSeatDetails({ ...seatDetails, [seat]: e.target.value });
                    }}
                    className='op'>
                    <option value="adult" >Adult</option>
                    <option value="child" >Child</option>
                    <option value="senior" >Senior Citizen</option>
                </select>
            </div>
        ));
    };

   

    return (
        <div className="container2">
            <h2 className="seats">Seat Selection</h2>
            <div className="screen">Screen This Way</div>
            <div className="seat-container">
                {getAvailableSeats(1,50).map(seatLabel => (
                    <div 
                        key={seatLabel}
                        className={`seat ${selectedSeats.includes(seatLabel) ? 'selected' : ''} ${isSeatBooked(seatLabel) ? 'booked' : ''}`}
                        onClick={() => {
                            if (!isSeatBooked(seatLabel)) {
                                toggleSeatSelection(seatLabel);
                            }
                        }}
                        id="seating-book"
                    >
                        {seatLabel}
                        
                    </div>
                ))}
            </div>
            {error ? <div>{error}</div> : <></>}
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
            <div className="text1">
                You have selected {selectedSeats.length} seat(s) <br/>for a total price of ${totalPrice}</div>
            
            {selectedSeats.length > 0 && (
                <div className='text2'>
                    <h2 className='text2-h2'>Selected Tickets</h2>
                    {renderSelectedTickets()}
                </div>
            )}
           
            <button className="proceed-btn" onClick={()=>{navigate("/ordersummary")}}>Proceed to Payment</button>
            
        </div>
    );
}