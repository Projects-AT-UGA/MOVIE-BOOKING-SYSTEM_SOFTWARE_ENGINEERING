import React from 'react'
import { Link } from 'react-router-dom'
import './RegistrationSucces.css'
const RegistrationSuccess = () => {
  return (
    <div className='Reg-container'>
        <h1 className='Reg-container-h1'>RegistrationSuccess</h1>
        <Link to="/">Go Back to Home</Link>
    </div>
  )
}

export default RegistrationSuccess