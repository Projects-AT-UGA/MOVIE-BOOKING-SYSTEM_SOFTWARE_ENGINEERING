import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import useUser from '../../User/useUser';
import useEditUser from '../../User/useEditUser';
import CardContainer from './CardContainer';
import Navbar3 from './Navbar3'
export const EditProfile = () => {
  // Update initial state based on the provided JSON data
  const [data,setData]=useState({});
  const {state}=useUser()
  const [error,setError]=useState("")
  const {error:saveerror,isloading,edituser,success}=useEditUser()
  const [passworderror,setPasswordError]=useState();
  const [passwordisloading,setPasswordIsLoading]=useState(false)
  const [passwordData, setPasswordData] = useState({
    password: '',
    newpassword: '',
    confirmnewpassword: '', // Added field for confirming new password
  });
  useEffect(()=>{
    const fetcheditprofiledate=async()=>{
      setError("")

      try{
        if(state){
          const response=await fetch("/user",{
            headers:{
              authorization:`Bearer ${state.login.token}`
            }
          });
          const tempdata=await response.json()
          if(response.ok){
            setFormData(tempdata)
          }
          else{
            setError(tempdata.message)
          }
        }
      }
     catch(error){
      setError("api not working")
     }
    } 
    fetcheditprofiledate()
  },[]);

  const [formData, setFormData] = useState({
    username: data.username || '',
    dob: data.dob || '',
    phoneNumber: data.phoneNumber || '',
    address: data.address || '',
    country: data.country || '',
    subscribeForPromotions: data.subscribeForPromotions || false,
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    const newValue = type === 'checkbox' ? checked : value;
    setFormData({ ...formData, [name]: newValue });
  };
  const handlePasswordChange = (e) => {
    const { name, value } = e.target;
    setPasswordData({ ...passwordData, [name]: value });
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    edituser(formData)

  };
  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    if (state) {
      if (passwordData.newpassword !== passwordData.confirmnewpassword) {
        setPasswordError("Passwords do not match");
        return;
      }
      editUserPassword(passwordData, state.login.token);
    }
  };
  
  
  const editUserPassword = async (passwordData, token) => {
    setPasswordIsLoading(true)
    try {
      setPasswordError(null)
      
      const response = await fetch('/user/edituserpassword', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({...passwordData, email: state.login.email})
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        setPasswordError(data.message || 'Failed to change password');
      }
      else{
        setPasswordError(data.message );
      }
      // Password updated successfully
     
      
    } catch (error) {
      setPasswordError('Error changing password:', error.message);
      
    }
    setPasswordIsLoading(false)
  };
  
  return (
    <div>
       <Navbar3></Navbar3>
    
    <div className="edit-profile-container1">
     
      
      
      <form className="edit1-profile-form">
      <h1 className="edit1-title">Edit Profile</h1>
      <div>email: {state.login.email}</div>
      <br/>
        <div className="edit1-form-group">
          <label htmlFor="edit1-username">Username:</label>
          <input
            type="text"
            id="edit1-username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Username"
            required
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-dob">Date of Birth:</label>
          <input
            type="date"
            id="edit1-dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Date of Birth"
            required
            max={new Date().toISOString().split('T')[0]} 
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-phoneNumber">Phone Number:</label>
          <input
            type="text"
            id="edit1-phoneNumber"
            name="phoneNumber"
            value={formData.phoneNumber}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Phone Number"
            required
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-address">Address:</label>
          <input
            type="text"
            id="edit1-address"
            name="address"
            value={formData.address}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Address"
            required
          />
        </div>
        <div className="edit1-form-group">
          <label htmlFor="edit1-country">Country:</label>
          <input
            type="text"
            id="edit1-country"
            name="country"
            value={formData.country}
            onChange={handleChange}
            className="edit1-form-control"
            placeholder="Country"
            required
          />
        </div>
        <div className="edit1-form-group">
          <input
            type="checkbox"
            id="edit1-subscribeForPromotions"
            name="subscribeForPromotions"
            checked={formData.subscribeForPromotions}
            onChange={handleChange}
          />
          <label htmlFor="edit1-subscribeForPromotions">Subscribe for Promotions</label>
        </div>
        <div>{error}</div>
        <div>{saveerror}</div>
        {success ? <div classname="error-message">data update successfully</div> : <></>}
        <button type="submit" className="edit1-submit-btn" onClick={handleSubmit} disabled={isloading}>Save Changes</button>
      </form>


      <div className="edit1-password-container">
        <h2>Change Password</h2>
        <form className="edit1-password-form" onSubmit={handlePasswordSubmit}>
          <div className="edit1-form-group">
            <label htmlFor="current-password">Current Password:</label>
            <input
              type="password"
              id="current-password"
              name="password"
              value={passwordData.password}
              onChange={handlePasswordChange}
              className="edit1-form-control"
              required
            />
          </div>
          <div className="edit1-form-group">
              <label htmlFor="new-password">New Password:</label>
              <input
                type="password"
                id="new-password"
                name="newpassword"
                value={passwordData.newpassword}
                onChange={handlePasswordChange}
                className="edit1-form-control"
                required
              />
          </div>
          <div className="edit1-form-group">
            <label htmlFor="confirm-new-password">Confirm New Password:</label>
            <input
              type="password"
              id="confirm-new-password"
              name="confirmnewpassword"
              value={passwordData.confirmnewpassword}
              onChange={handlePasswordChange}
              className="edit1-form-control"
              required
            />
          </div>
          {/* Inside the render method */}
        {passworderror && <div className="password-error">{passworderror}</div>}

          <button type="submit" className="edit1-submit-btn" disabled={passwordisloading}>
            Change Password
          </button>
        </form>
      </div>
      </div>
      <CardContainer></CardContainer>

    </div>
  );
};
