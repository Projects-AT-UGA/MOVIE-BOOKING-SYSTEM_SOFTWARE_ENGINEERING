import React from 'react'
import {useNavigate} from 'react-router-dom'
const Navbar3 = () => {
    const navigate=useNavigate()
  return (
    <div onClick={()=>{navigate("/")}} style={{cursor:"pointer",marginTop:'15px',fontSize:"2.8rem",color:'white', textAlign:'center'}}>Home Page</div>
  )
}

export default Navbar3