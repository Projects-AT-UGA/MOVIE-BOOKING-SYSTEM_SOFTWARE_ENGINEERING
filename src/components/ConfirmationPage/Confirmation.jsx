import React from "react";
import "./Confirmation.css";

export const Confirmation = () => {


    return (
        <div className="container">
            <h1>Confirmation</h1>
            <h2>Order information</h2>
            <p><span className="left">Adult</span><span className="right">x1</span></p>
            <p><span className="left">Child</span><span className="right">x2</span></p>
            <p><span className="left">Total</span><span className="right">$33.09</span></p>

            <p>Check your email for the tickets and other information.</p>

            <button className="home">Home</button>
        </div>
    )
};