import React, { useState, useEffect } from "react";
import { useNavigate, useParams } from 'react-router-dom';
import "./OrderSummary.css";
import PaymentInfo from './PaymentInfo';
import useBooking from '../../booking/useBooking.jsx';
import CardContainerForCheckout from '../Registration/CardContainerForCheckout.jsx';
import useUser from "../../User/useUser.jsx";
import useSubmitOrder from "../../booking/useSubmitOrder.jsx";

export const OrderSummary = () => {
    const { state, dispatch } = useBooking();
    const {state:userstate,dispatch:userdispatch}=useUser()
    const { title } = useParams();
    const navigate = useNavigate();
    const [code,setCode]=useState("")
    const [promoerror,setPromoError]=useState(null)
    
    const [promoisloading,promosetIsLoading]=useState(false)
    const [fees,setFees] = useState(0);
    const [total, setTotal] = useState(0);
    const [showPayment, setShowPayment] = useState(false);
    const [useExistingCard, setUseExistingCard] = useState(false);

    const [submitError,submitIsloading,submitorder]=useSubmitOrder()
    useEffect(() => {
        console.log(state.currentTickets);
        if(state && state.currentTickets && state.currentTickets.length===0){
            navigate("/seatselection/" + title)
        }
    }, [state]);

    const ticketPrices = {
        'Adult': 50.00,
        'Child': 20.00,
        'Senior': 30.00
    };
    const handlepromo=async()=>{
        setPromoError(null)
        setFees(0)
        promosetIsLoading(true)
        try{
            const response=await fetch("/payment/promotions",{
                method:"POST",
                headers:{
                    authorization:`Bearer ${userstate.login.token}`,
                    "Content-Type":"application/json"
                },
                body:JSON.stringify({code:code})
            });
            const Promo=await response.json();
            if(response.ok){
                setFees(-1*Promo.Promo)
                setPromoError(Promo.message)
            }
            else{
                setPromoError(Promo.message)
            }
        }
        catch(error){
            setPromoError("server is not working")
        }
        promosetIsLoading(false)
    }

    

    useEffect(() => {
        let totalPrice = 0;
        state.currentTickets.forEach(ticket => {
            // Look up the price based on the ticket type
            const price = ticketPrices[ticket.type];
            if (price) {
                // Add the price to the total
                totalPrice += price;
            }
        });
        // Add fees if needed
        totalPrice = totalPrice+(totalPrice*fees/100);
        setTotal(totalPrice);
    }, [state.currentTickets, ticketPrices, fees]);

    const handleDeleteTicket = (seatNumber) => {
        const updatedTickets = state.currentTickets.filter(ticket => ticket.seatNumber !== seatNumber);
        dispatch({ type: "SET_CURRENT_TICKETS", payload: updatedTickets });
    };

    const handleSubmitOrder = async() => {
        let success;
        if(code && code.length>0){
            success=await submitorder(code)
        }
        else{
            success=await submitorder('')
        }
        if(success){
            navigate("/confirmation",{state:{success:success}});
        }
    };

    return (
        <div className="app1">
            <div className="container1">
                <h2 className="header">Ticket Details</h2>
                {state.currentTickets.map(ticket => (
                    <div key={ticket.seatNumber} className="ticket">
                        <div className="ticket-info">
                            <div className="ticket-name"><strong>Seat Number:</strong> {ticket.seatNumber}</div>
                            <div className="ticket-type"><strong>Type:</strong> {ticket.type}</div>
                        </div>
                        <button className="delete-btn" onClick={() => handleDeleteTicket(ticket.seatNumber)}>Delete</button>
                    </div>
                ))}
                <div id="promo-buttons">
                    <label>Promo:</label>
                    <input type="text" value={code} onChange={(e)=>{setCode(e.target.value)}}></input>
                    <button onClick={()=>{handlepromo()}} disabled={promoisloading}> apply promo</button>
                    {promoerror ? <div>{promoerror}</div> : <></>}
                </div>
                <div className="total-info">
                    <span className="total-label">Total:</span>
                    <span className="total-value">${total.toFixed(2)}</span>
                </div>

                <button className="update-btn" onClick={() => { navigate("/seatselection/" + title) }}>Update Order</button>
-
                <div className="radio-buttons">
                    <label>
                        <input type="radio" name="payment" onClick={() => { setShowPayment(true); setUseExistingCard(false); }} />Add new card
                    </label> &nbsp;&nbsp;&nbsp;&nbsp;
                    <label>
                        <input type="radio" name="payment" onClick={() => { setShowPayment(false); setUseExistingCard(true); }} defaultChecked />Use Existing Credit card
                    </label>
                </div>
                {submitError ? <div>{submitError}</div>: <></>}
                
                <button className="submit-order-btn" onClick={handleSubmitOrder} disabled={submitIsloading}>Submit Order</button>
                
            </div>
            <CardContainerForCheckout showPayment={showPayment}></CardContainerForCheckout>
        </div>
    );
};
