import React, { useEffect, useState } from 'react';
import './EditProfile.css';
import useUser from '../../User/useUser';
import useEditUser from '../../User/useEditUser';
export const EditProfile = () => {
  // Update initial state based on the provided JSON data
  const [data,setData]=useState({});
  const {state}=useUser()
  const [error,setError]=useState("")
  const {error:saveerror,isloading,edituser,success}=useEditUser()
  useEffect(()=>{
    const fetcheditprofiledate=async()=>{
      setError("")

      try{
        if(state.login.token){
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

  const handleSubmit = (e) => {
    e.preventDefault();
    edituser(formData)

  };

  return (
    <div className="edit-profile-container1">
      <h1 className="edit1-title">Edit Profile</h1>
      <form className="edit1-profile-form">
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
        {success ? <div>data update successfully</div> : <></>}
        <button type="submit" className="edit1-submit-btn" onClick={handleSubmit} disabled={isloading}>Save Changes</button>
      </form>
    </div>
  );
};
