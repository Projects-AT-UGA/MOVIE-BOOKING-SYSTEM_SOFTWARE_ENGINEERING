import React, { useEffect, useState } from 'react'
import useUser from '../../User/useUser'
import './OrderHistory.css'
const OrderHistory = () => {
    const {state}=useUser()
    const [error,setError]=useState(null)
    const [isLoading,setIsLoading]=useState(false)
    const [orderhistory,setOrderHistory]=useState([])
    useEffect(()=>{
        getOrderHistory();
    },[])
    const getOrderHistory=async()=>{
        setIsLoading(true)
        setError(null)
        try{
            if(!state){
                setError("not logged in as user")
                return;
            }
            const response=await fetch("/payment/orderhistory",{
                method:"GET",
                headers:{
                    "Content-Type":"application/json",
                    "authorization":`Bearer ${state.login.token}`
                }
            })
            const orderhistory=await response.json();
            if(orderhistory){
                console.log(orderhistory)
                setOrderHistory(orderhistory)
            }
            else{
                setOrderHistory(orderhistory.message)
            }
        }
        catch(error){
            setError("server is not working")
        }
        setIsLoading(false)
    }
  return (
    <div style={{ color: "white" }}>
        <h1 style={{ color: "white" }}>Order History</h1>
            {isLoading ? <div>Loading...</div> :
                <>
                    {orderhistory.bookings && orderhistory.bookings.map(order => (
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
                        </div>
                    ))}
                </>
            }
            {error && <div>{error}</div>}
        </div>
  )
}

export default OrderHistory