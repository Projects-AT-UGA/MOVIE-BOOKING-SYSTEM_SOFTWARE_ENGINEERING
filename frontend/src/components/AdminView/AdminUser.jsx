import React, { useState, useEffect } from 'react';
import AdminNavbar from './AdminNavbar';
import useAdmin from './Admin/useAdmin';
import './AdminUser.css';
const AdminUser = () => {
  const [users, setUsers] = useState([]);
  const [updateerror, setUpdateError] = useState(null);
  const [createerror, setCreateError] = useState(null);
  const {state}=useAdmin()

  
  const [formData, setFormData] = useState({
    id: null,
    country: '',
    username: '',
    email: '',
    dob: '',
    phoneNumber: '',
    password: '',
    address: '',
    subscribeForPromotions: false,
    issuspended:false,
  });
  
  const [formData1, setFormData1] = useState({
    id: null,
    country: '',
    username: '',
    email: '',
    dob: '',
    phoneNumber: '',
    password: '',
    address: '',
    subscribeForPromotions: false,
    issuspended:false,
  });
  // Fetch all users
  const fetchUsers = async () => {
    
    try {
      if(state){
        const response = await fetch('/admin/',{
          headers:{
            authorization:`Bearer ${state.adminuser.token}`
          }
        });
        const data = await response.json();
        if(response.ok){
          setUsers(data);
        }
       else{
        console.error('Error fetching users:', data,state.adminuser.token);
       }
      }
      
    } catch (error) {
      console.error('Error fetching users:', error);
    }
  };

  // Create a new user
  const createUser = async () => {
    try {
      setCreateError(null);
      if(state){
      const response = await fetch('/admin/', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          authorization:`Bearer ${state.adminuser.token}`
        },
        body: JSON.stringify(formData1)
      });
      const data = await response.json();
      console.log(':', data);
      if(response.ok){
        setCreateError("New user created");
      }
      else{
        setCreateError(data.message);
      }
      fetchUsers(); // Refresh the user list after creating a new user
    }
      
    } catch (error) {
      console.error('Error creating user:', error);
      setCreateError(error);
    }
  };

  // Delete a user by ID
  const deleteUser = async (userId) => {
    try {
      if(state){
      const response = await fetch(`/admin/${userId}`, {
        method: 'DELETE',
        headers:{
          authorization:`Bearer ${state.adminuser.token}`
        }
      });
      const data = await response.json();
      console.log('User deleted:', data.message);
      fetchUsers(); // Refresh the user list after deleting a user
    }
    } catch (error) {
      console.error('Error deleting user:', error);
    }
  };

  // Update a user by ID
  const updateUser = async () => {
    try {
      if(state){
      setUpdateError(null)
      const response = await fetch(`/admin/${formData.id}`, {
        method: 'PATCH',
        headers: {
          'Content-Type': 'application/json',
          authorization:`Bearer ${state.adminuser.token}`
        },
        body: JSON.stringify(formData)
      });
      const data = await response.json();
      if(response.ok){
        setUpdateError("User Information updated Successfully")
      }
      else{
        setUpdateError(data.message)
      }
      console.log(':', data);
      fetchUsers(); // Refresh the user list after updating a user
    }
    } catch (error) {
      setUpdateError(error)
      console.error('Error updating user:', error);
    }
  };

  // Function to handle user selection for editing
  const handleUserSelect = (user) => {
    setFormData(user);
  };

  useEffect(() => {
    fetchUsers(); // Fetch users on component mount
  }, []);

  return (
    <div>
      <AdminNavbar />
      <div id="admin-user-heading">Admin User</div>
      <div style={{ display: 'flex' }}>
        <div className='userLeft' style={{ width: '30%', marginRight: '10px' }}>
          {/* Display users */}
          
           <ul>
           { users.map((user) => (
            <li key={user.id} onClick={() => handleUserSelect(user)}>
              {user.username} - {user.email}
              
              <button onClick={() => deleteUser(user.id)}>Delete</button>
            </li>
          ))} 
        </ul>
        
         
        </div>
        <div className='userMiddle'  style={{ width: '30%', marginRight: '10px' }}>
          {/* Edit form */}
          <div>
            <input
              type="text"
              placeholder="Country"
              value={formData.country}
              onChange={(e) => setFormData({ ...formData, country: e.target.value })}
              disabled={true}
            />
            <input
              type="text"
              placeholder="Username"
              value={formData.username}
              onChange={(e) => setFormData({ ...formData, username: e.target.value })}
              disabled={true}
            />
            <input
              type="email"
              placeholder="Email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              disabled={true}
            />
            <input
              type="date"
              placeholder="Date of Birth"
              value={formData.dob}
              onChange={(e) => setFormData({ ...formData, dob: e.target.value })}
              disabled={true}
            />
            <input
              type="tel"
              placeholder="Phone Number"
              value={formData.phoneNumber}
              onChange={(e) => setFormData({ ...formData, phoneNumber: e.target.value })}
              disabled={true}
            />
            <input
              type="password"
              placeholder="Password"
              value={formData.password}
              onChange={(e) => setFormData({ ...formData, password: e.target.value })}
              disabled={true}
            />
            <input
              type="text"
              placeholder="Address"
              value={formData.address}
              onChange={(e) => setFormData({ ...formData, address: e.target.value })}
              disabled={true}
            />
            <label id="promotion-label">
             
              Subscribe for Promotions
              <input
                type="checkbox"
                checked={formData.subscribeForPromotions}
                onChange={(e) => setFormData({ ...formData, subscribeForPromotions: e.target.checked })}
                disabled={true}
              />
            </label>
            <label id="suspended-label">
             
              suspended
              <input
                type="checkbox"
                checked={formData.issuspended}
                onChange={(e) => setFormData({ ...formData, issuspended: e.target.checked })}
              />
            </label>
            {updateerror ? <div id="update-error">{updateerror}</div> : <></>}
            <button onClick={updateUser}>Update User</button>
          </div>
          
        </div>




        <div className='userRight' style={{ width: '30%' }}>
  {/* Create user form */}
  <div id="input-forms">
    <input
      type="text"
      placeholder="Country"
      value={formData1.country}
      onChange={(e) => setFormData1({ ...formData1, country: e.target.value })}
    />
    <input
      type="text"
      placeholder="Username"
      value={formData1.username}
      onChange={(e) => setFormData1({ ...formData1, username: e.target.value })}
    />
    <input
      type="email"
      placeholder="Email"
      value={formData1.email}
      onChange={(e) => setFormData1({ ...formData1, email: e.target.value })}
    />
    <input
      type="date"
      placeholder="Date of Birth"
      value={formData1.dob}
      onChange={(e) => setFormData1({ ...formData1, dob: e.target.value })}
    />
    <input
      type="tel"
      placeholder="Phone Number"
      value={formData1.phoneNumber}
      onChange={(e) => setFormData1({ ...formData1, phoneNumber: e.target.value })}
    />
    <input
      type="password"
      placeholder="Password"
      value={formData1.password}
      onChange={(e) => setFormData1({ ...formData1, password: e.target.value })}
    />
    <input
      type="text"
      placeholder="Address"
      value={formData1.address}
      onChange={(e) => setFormData1({ ...formData1, address: e.target.value })}
    />
    
      
      <label id="promotion-label">
      Subscribe for Promotions
      <input
        type="checkbox"
        checked={formData1.subscribeForPromotions}
        onChange={(e) => setFormData1({ ...formData1, subscribeForPromotions: e.target.checked })}
      />
    </label>
   
       
               <label id="suspended-label">

              suspended
              <input
                type="checkbox"
                checked={formData1.issuspended}
                onChange={(e) => setFormData({ ...formData1, issuspended: e.target.checked })}
              />
    
    </label>
    {createerror ? <div id="update-error">{createerror}</div> : <></>}
    <button onClick={createUser}>Create User</button>
  </div>
</div>

      </div>
    </div>
  );
};

export default AdminUser;
