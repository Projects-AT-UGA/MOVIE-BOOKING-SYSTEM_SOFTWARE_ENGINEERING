import React, { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
import "./OrderSummary.css";
import PaymentInfo from './PaymentInfo';
import useBooking from '../../booking/useBooking.jsx'
export const OrderSummary = () => {
    const [tickets, setTickets] = useState([
        { id: 1, name: "Ticket A", price: 9.00, quantity: 1 },
        { id: 2, name: "Ticket B", price: 6.00, quantity: 1 },
        { id: 3, name: "Ticket C", price: 6.00, quantity: 1 }
    ]);
    const {state,dispatch}=useBooking()
    useEffect(()=>{
        console.log(state)
    },[state])

    const [fees] = useState(3.00);
    const [total, setTotal] = useState(0);
    const [showPayment, setShowPayment] = useState(false);
    const [useExistingCard, setUseExistingCard] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        let totalPrice = 0;
        tickets.forEach((ticket) => {
            totalPrice += ticket.price * ticket.quantity;
        });
        setTotal(totalPrice);
    }, [tickets, fees]);

    const handleDeleteTicket = (id) => {
        const updatedTickets = tickets.filter(ticket => ticket.id !== id);
        setTickets(updatedTickets);
    };

    const handleConfirmOrder = () => {
        console.log("Order confirmed. Proceed to checkout.");
    };

    const handleTogglePayment = () => {
        setShowPayment(!showPayment);
    };

    const handleSubmitOrder = () => {
        navigate("/confirmation")
        console.log("Submit Order with existing credit card");
    };

    return (
        <div className="app1">
            <div className="container1">
                <h2 className="header">Ticket Details</h2>
                {tickets.map(ticket => (
                    <div key={ticket.id} className="ticket">
                        <div className="ticket-info">
                            <div className="ticket-name"><strong>Name:</strong> {ticket.name}</div>
                            <div className="ticket-price"><strong>Price:</strong> ${ticket.price * ticket.quantity}</div>
                            <div className="ticket-quantity"><strong>Quantity:</strong> {ticket.quantity}</div>
                        </div>
                        <button className="delete-btn" onClick={() => handleDeleteTicket(ticket.id)}>Delete</button>
                    </div>
                ))}
                <div className="total-info">
                    <span className="total-label">Total:</span>
                    <span className="total-value">${total}</span>
                </div>
                
                <button className="update-btn" onClick={() => { navigate("/seatselection") }}>Update Order</button>
                    
              
                <div className="radio-buttons">
                    <label>
                        <input type="radio" name="payment" onClick={() => { setShowPayment(true); setUseExistingCard(false); }} />Add new card 
                    </label> &nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="payment" onClick={() => { setShowPayment(false); setUseExistingCard(true); }} defaultChecked/>Use Existing Credit card
                    </label>
                </div>
                
                {!showPayment && useExistingCard && (
                    <button className="submit-order-btn" onClick={handleSubmitOrder}>Submit Order</button>
                )}
            </div>
            {showPayment && <PaymentInfo />}
        </div>
    );
};