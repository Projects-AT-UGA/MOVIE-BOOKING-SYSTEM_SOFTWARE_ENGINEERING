import React from "react";
import "./Confirmation.css";
import { useNavigate } from 'react-router-dom';
export const Confirmation = () => {
    const navigate = useNavigate();

    return (
        <div className="confirmation">
            <h1 id="confirmation">Confirmation</h1>
            <h2 id="order-information">Order information</h2>
            <p><span className="left">Adult</span><span className="right">x1</span></p>
            <p><span className="left">Child</span><span className="right">x2</span></p>
            <p><span className="left">Total</span><span className="right">$33.09</span></p>

            <p>Check your email for the tickets and other information.</p>

            <button className="home" onClick={()=>{navigate("/")}}>Home</button>
        </div>
    )
};