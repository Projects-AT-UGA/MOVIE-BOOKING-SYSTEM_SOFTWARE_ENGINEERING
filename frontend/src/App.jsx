import './App.css';
// import UserRegistrationForm from './components/Registration';
import {Routes,Route,Navigate} from 'react-router-dom'
import Login from './components/Registration/Login';
import LoginForm from './components/Registration/LoginForm';
import {Home} from './components/MainPage/Home'
import MovieDetails from './components/MainPage/MovieDetails';
import { useState,useEffect } from 'react';
import { SeatSelection } from './components/BookingPage/SeatSelection';
import {MovieTime} from './components/MainPage/MovieTime'
import {EditProfile} from './components/Registration/EditProfile'
import  {Confirmation} from './components/CheckoutPage/Confirmation'
import PaymentInfo from './components/CheckoutPage/PaymentInfo'
import {OrderSummary} from './components/CheckoutPage/OrderSummary'
import OTPPage from './components/Registration/Otp'
import axios from 'axios';
import useUser from './User/useUser';

import ForgotPassword from './components/Registration/ForgotPassword';
import NewPassword from './components/Registration/NewPassword';
import SetNewPassword from './components/Registration/SetNewPassword';

import AdminHome from './components/AdminView/AdminHome';
import AdminUser from './components/AdminView/AdminUser';

import AdminMovies from './components/AdminView/AdminMovies'
import AdminPromotions from './components/AdminView/AdminPromotions'
import AdminLogin from './components/AdminView/AdminLogin'
import useAdmin from './components/AdminView/Admin/useAdmin';
import AdminShowDetails from './components/AdminView/AdminShowDetails'

import useBooking from './booking/useBooking';
import OrderHistory from './components/CheckoutPage/OrderHistory';
import RegistrationSuccess from './components/Registration/RegistrationSuccess';
function App() {
  const [movies,setMovies]=useState([]);
  const {state}=useUser()
  const {state:adminuser}=useAdmin()
  const {state:bookingstate}=useBooking()
  useEffect(() => {
    axios.get('/api/movies/').then(response => {setMovies(response.data);}).catch(error => {console.error('Error:', error);});
  }, []);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home movies={movies}></Home>}></Route>
        
        {/* <Route path="/register" element={<UserRegistrationForm />}></Route> */}
        <Route exact path="/register" element={ !state.login.email ? <Login></Login> : <Navigate to="/"></Navigate>}></Route>
        <Route exact path="/otp" element={<OTPPage></OTPPage>}></Route>
        <Route exact path="/registrationsuccessful" element={<RegistrationSuccess></RegistrationSuccess>}></Route>
        <Route exact path="/editprofile" element={state.login.email ? <EditProfile></EditProfile>: <Navigate to="/"></Navigate>}></Route>
        <Route exact path="/login" element={ !state.login.email ?<LoginForm></LoginForm> : <Navigate to="/"></Navigate>}></Route>
        <Route exact path="/forgotpassword" element={<ForgotPassword></ForgotPassword>}></Route>
        <Route exact path="/newpassword/:email" element={<NewPassword></NewPassword>}></Route>
        <Route exact path="/setnewpassword/:email/:otp" element={<SetNewPassword></SetNewPassword>}></Route>
        {/* <Route exact path='/selecttime' element={<TimeSelection></TimeSelection>}></Route> */}

        <Route exact path="/movie/:title" element={<MovieDetails movies={movies}></MovieDetails>} />
        <Route exact path="/seatselection/:title" element={bookingstate.currentMovie ?<SeatSelection></SeatSelection> : <Navigate to="/"></Navigate>}></Route>
        <Route exact path="/movietime/:title/:id" element={<MovieTime movies={movies}></MovieTime>}></Route>
        
        <Route exact path="/confirmation" element={<Confirmation></Confirmation>}></Route>
        <Route exact path="/paymentinfo" element={<PaymentInfo></PaymentInfo>}></Route>
        {/* <Route exact path="/ordersummary" element={(bookingstate.currentMovie && bookingstate.currentTickets) ? <OrderSummary></OrderSummary> : <Navigate to="/"></Navigate>}></Route> */}
        <Route exact path="/ordersummary/:title" element={ <OrderSummary></OrderSummary> }></Route>
        <Route exact path="/orderhistory" element={ <OrderHistory></OrderHistory> }></Route>


        <Route exact path="/frontendadmin/login" element={!adminuser ? <AdminLogin></AdminLogin> : <Navigate  to="/frontendadmin"></Navigate>}></Route>
        <Route exact path="/frontendadmin" element={adminuser ?<AdminHome></AdminHome> : <Navigate to="/frontendadmin/login"></Navigate>}></Route>
        <Route exact path="/frontendadmin/user" element={adminuser ? <AdminUser></AdminUser> : <Navigate to="/frontendadmin/login"></Navigate>}></Route>
        <Route exact path="/frontendadmin/movies" element={adminuser ? <AdminMovies></AdminMovies> : <Navigate to="/frontendadmin/login"></Navigate>}></Route>
        
        <Route exact path="/frontendadmin/promotions" element={adminuser ? <AdminPromotions></AdminPromotions>:  <Navigate to="/frontendadmin/login"></Navigate>}></Route>
        <Route exact path="/frontendadmin/showdetails" element={adminuser ? <AdminShowDetails></AdminShowDetails>:  <Navigate to="/frontendadmin/login"></Navigate>}></Route>
       
      </Routes>
    </div>
  );
}

export default App;





