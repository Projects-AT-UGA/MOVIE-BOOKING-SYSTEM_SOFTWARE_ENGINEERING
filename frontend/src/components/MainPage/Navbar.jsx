import React from 'react';
import './Navbar.css';
import { NavLink } from 'react-router-dom';
import useUser from '../../User/useUser'
export const Navbar = ({ handleSearch, searchQuery }) => {
  const {state,dispatch}=useUser();
  const logout=()=>{
    dispatch({type:"LOGOUT"})
  }
  return (

    <div className="search-bar">
      <input className="search"
        type="text"
        placeholder="Search movies..."
        value={searchQuery}
        onChange={(e) => handleSearch(e.target.value)}
      />
      

       {
       !state.login.email ? <NavLink to="/login"><button className='navbar-b2'>Login</button></NavLink> :
       <><NavLink to="/editprofile"><button className='navbar-b1'><span className="material-symbols-outlined">
       manage_accounts
       </span></button></NavLink> 
       <div className='user_info'><div>{state.login.email}</div><button className='order-history-button' style={{cursor:"pointer"}} onClick={logout}>logout</button>
       <NavLink to="/orderhistory"> <button className='order-history-button'>order history</button></NavLink>

       </div>
       </>
       }
      
    </div>
  );
};

export default Navbar;