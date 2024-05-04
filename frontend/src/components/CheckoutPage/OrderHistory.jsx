import React, { useEffect, useState } from 'react';
import useUser from '../../User/useUser';
import './OrderHistory.css';

const OrderHistory = () => {
  const { state } = useUser();
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [orderHistory, setOrderHistory] = useState([]);

  useEffect(() => {
    getOrderHistory();
  }, []);

  const getOrderHistory = async () => {
    setIsLoading(true);
    setError(null);
    try {
      if (!state) {
        setError("Not logged in as user");
        return;
      }
      const response = await fetch("/payment/orderhistory", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${state.login.token}`
        }
      });
      const data = await response.json();
      if (data && data.bookings) {
        setOrderHistory(data.bookings);
      } else {
        setOrderHistory([]);
      }
    } catch (error) {
      setError("Server is not working");
    }
    setIsLoading(false);
  };

  return (
    <div style={{ color: "white" }}>
      <h1 style={{ color: "white" }}>Order History</h1>
      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <>
          {orderHistory.length > 0 ? (
            orderHistory.map(order => (
              <div key={order.id} className="order-container">
                <p>Order ID: {order.id}</p>
                <p>Total: {order.total}</p>
                <p>Date: {order.createdAt}</p>
                <p>Tickets:</p>
                <ul>
                  {order.Tickets.map(ticket => (
                    <li key={ticket.id}>
                      Type: {ticket.type}, Price: {ticket.price}, Seat Number: {ticket.seatNumber}
                    </li>
                  ))}
                </ul>
                <p>Card Details</p>
                <ul>
                  <li>{order.CardDetail.cardNumber}</li>
                  <li>{order.CardDetail.cardType}</li>
                </ul>
              </div>
            ))
          ) : (
            <div className="error-message">                         No orders</div>
          )}
        </>
      )}
      {error && <div>{error}</div>}
    </div>
  );
};

export default OrderHistory;
