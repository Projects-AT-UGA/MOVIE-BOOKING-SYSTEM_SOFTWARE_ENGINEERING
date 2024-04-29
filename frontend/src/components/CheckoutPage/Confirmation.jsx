import React from "react";
import "./Confirmation.css";
import { useNavigate, useLocation } from 'react-router-dom';

export const Confirmation = () => {
    const navigate = useNavigate();
    const location = useLocation();
    const { booking, tickets } = location.state.success; // Destructure booking and tickets from location.state
    console.log(location.state);

    // Calculate total price based on the ticket prices
    const totalPrice = tickets.reduce((acc, ticket) => acc + ticket.price, 0);

    return (
        <div className="confirmation">
            <h1 id="confirmation">Confirmation</h1>
            <h2 id="order-information">Order information</h2>
            {/* Display ticket details */}
            {tickets.map(ticket => (
                <p key={ticket.id}><span className="left">{ticket.type}</span><span className="right">seat number {ticket.seatNumber}</span></p>
            ))}
            <p><span className="left">Total</span><span className="right">${booking.total}</span></p>

            <p>Check your email for the tickets and other information.</p>

            <button className="home" onClick={() => { navigate("/") }}>Home</button>
        </div>
    )
};
