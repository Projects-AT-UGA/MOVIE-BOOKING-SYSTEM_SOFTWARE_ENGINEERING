import React, { useState } from "react";
import "./PaymentInfo.css";
import FormInput from "./FormInput";
import {useNavigate} from 'react-router-dom'
const PaymentInfo = () => {
    const navigate=useNavigate();
    const [values, setValues] = useState({
        cardNum: "",
        name: "",
        expDate: "",
        cvv: "",
        zipCode: "",
    });

    const inputs = [
        {
            id: 1,
            name: "cardNum",
            type: "text",
            placeholder: "Card Number",
            errorMessage: "It should be a valid credit card number.",
            label: "Card Number",
            pattern: "[0-9]",
            required: true,
        },
        {
            id: 2,
            name: "name",
            type: "text",
            placeholder: "Name",
            label: "Name",
            required: true,
        },
        {
            id: 3,
            name: "expDate",
            type: "date",
            placeholder: "Expiration Date",
            errorMessage: "The expiration date should be in the future.",
            label: "Expiration Date",
            //pattern: "[0-9]",
            required: true,
        },
        {
            id: 4,
            name: "cvv",
            type: "text",
            placeholder: "CVV",
            errorMessage: "It should be a valid CVV.",
            label: "CVV",
            pattern: "[0-9]{3}",
            required: true,
        },
        {
            id: 5,
            name: "zipCode",
            type: "text",
            placeholder: "Zip Code",
            errorMessage: "It should be a valid zip code.",
            label: "Zip Code",
            pattern: "[0-9]{5}",
            required: true,
        },
    ];

    const handleSubmit = (e) => {
        e.preventDefault();
    };

    const onChange = (e) => {
        setValues({ ...values, [e.target.name]: e.target.value });
    };

    return (
        <div className="payment-info-container">
            <form onSubmit={handleSubmit} className="payment-form">
                <h2 className="payment-heading">Payment Info</h2>
                {inputs.map((input) => (
                    <FormInput
                        key={input.id}
                        {...input}
                        value={values[input.name]}
                        onChange={onChange}
                        className={`input-${input.name}`} // Unique class name based on input name
                    />
                ))}
                <button className="submit-button" onClick={()=>{navigate("/confirmation")}}>Submit Order</button>
                <br></br>
                <button className="cancel-button" onClick={()=>{navigate("/")}}>Cancel Order</button>
            </form>
        </div>
    );
};

export default PaymentInfo;