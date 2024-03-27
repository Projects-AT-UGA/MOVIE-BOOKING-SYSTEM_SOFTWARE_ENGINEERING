import React from 'react'
import ReactDOM from 'react-dom/client'
import App from './App.jsx'
import './index.css'
import {BrowserRouter} from 'react-router-dom'
import UserContextProvider from './User/UserContextProvider.jsx'
import AdminUserContextProvider from './components/AdminView/Admin/AdminUserContextProvider.jsx'
ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    
      <BrowserRouter>
        <AdminUserContextProvider>
            <UserContextProvider>
                <App />
            </UserContextProvider>
        </AdminUserContextProvider>
      </BrowserRouter>
    
  </React.StrictMode>,
)


