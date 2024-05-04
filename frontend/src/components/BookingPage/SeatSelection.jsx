import React, { useState, useEffect } from 'react';
import {useNavigate, useParams} from 'react-router-dom'
import './SeatSelection.css'; 
import FormInput from '../Registration/FormInput';
import useBooking from '../../booking/useBooking';
import useTickets from '../../booking/useTickets';
import useUser from '../../User/useUser';

export function SeatSelection() {
    const [outputArray,setOutputArray]=useState([])
    const [selectedSeats,setSelectedSeats]=useState([])
    const [ticketPrice] = useState(15);
    const [totalPrice, setTotalPrice] = useState(0);
    const [seatDetails, setSeatDetails] = useState({});
    const [paymentOption, setPaymentOption] = useState('');
    const navigate=useNavigate();
    const {state,dispatch}=useBooking()
    const {title}=useParams()
    const {state:userstate}=useUser()
    const [bookedSeats,error,setError,isloading,getTickets]=useTickets()
    useEffect(()=>{
        getTickets()
    },[state])
    function calculateTotalPrice(inputArray) {
        // Define ticket prices
        const ticketPrices = {
            'Adult': 50.00,
            'Child': 20.00,
            'Senior': 30.00
        };
    
        // Initialize total price
        let totalPrice = 0;
    
        // Iterate over the input array
        inputArray.forEach(ticket => {
            // Check if the ticket type exists in ticketPrices
            if (ticket.type in ticketPrices) {
                // Add the price of the ticket type to the total price
                totalPrice += ticketPrices[ticket.type];
            }
        });
    
        return totalPrice;
    }
    
    const handleProceedToPayment=()=>{
        if(!userstate.login.email){
            alert("please login")
            navigate("/login")
            return;
        }
        if(outputArray.length==0){
            setError("please select tickets")
            return;
        }
        dispatch({type:"SET_CURRENT_TICKETS",payload:outputArray})
        navigate("/ordersummary/"+`${title}`);
    }
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
            setSeatDetails({ ...seatDetails, [seatLabel]: 'Adult' }); // Default to adult
        }
    };

    const isSeatBooked = (seatLabel) => {
        return bookedSeats.includes(seatLabel);
    };

    useEffect(() => {
        const temp = Object.entries(seatDetails).map(([seatNumber, type]) => ({
            seatNumber: parseInt(seatNumber),
            type
          }));   
          setOutputArray(temp)
        setTotalPrice(calculateTotalPrice(temp));
    }, [seatDetails]);

    

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
                    <option value="Adult" >Adult 50$</option>
                    <option value="Child" >Child 20$ </option>
                    <option value="Senior" >Senior 30$</option>
                </select>
            </div>
        ));
    };
    const options = {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric',
        hour: 'numeric',
        minute: 'numeric',
        second: 'numeric',
        timeZoneName: 'short'
      };
   

    return (
        <div className="container2">
            <h2 className="seats">Seat Selection</h2>
            <h3>{ title ?  `${title} Booking` : "No Booking"}</h3>
            <h3>{state.currentMovie ? `Booking Date: ${new Date(state.currentMovie.showDateTime).toLocaleString('en-US', options)}` : "no time" }</h3>
            <h3>{state.currentMovie ? `Screen ${state.currentMovie.screenid} ` : "no screen id" }</h3>
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
                        
                        <span class="material-symbols-outlined">
                        chair
                        </span>
                        <br/>
                        <br/>
                        {seatLabel}
                    </div>
                ))}
            </div>
            <div className='screen_shape'>

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
           
            <button className="proceed-btn" onClick={()=>{handleProceedToPayment()}}>Proceed to Payment</button>
            
        </div>
    );
}