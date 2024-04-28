import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import UserContextProvider from './User/UserContextProvider.jsx'
import AdminUserContextProvider from './components/AdminView/Admin/AdminUserContextProvider.jsx'
import BookingContextProvider from './booking/bookingContextProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <BrowserRouter>
        <AdminUserContextProvider>
          
              <UserContextProvider>
                <BookingContextProvider>
                  <App />
                  </BookingContextProvider>
              </UserContextProvider>
          
        </AdminUserContextProvider>
      </BrowserRouter>
    
  </React.StrictMode>,
)


