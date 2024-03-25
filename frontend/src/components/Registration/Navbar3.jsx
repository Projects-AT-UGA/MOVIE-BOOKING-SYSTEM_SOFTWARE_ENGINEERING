import React from 'react'
import {useNavigate} from 'react-router-dom'
const Navbar3 = () => {
    const navigate=useNavigate()
  return (
    <div onClick={()=>{navigate("/")}} style={{cursor:"pointer",fontSize:"2rem"}}>Movie</div>
  )
}

export default Navbar3