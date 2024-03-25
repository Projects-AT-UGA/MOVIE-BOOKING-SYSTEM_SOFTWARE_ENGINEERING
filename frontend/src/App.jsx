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

function App() {
  const [movies,setMovies]=useState([]);
  const {state}=useUser()
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
        <Route exact path="/editprofile" element={state.login.email ? <EditProfile></EditProfile>: <Navigate to="/"></Navigate>}></Route>
        <Route exact path="/login" element={ !state.login.email ?<LoginForm></LoginForm> : <Navigate to="/"></Navigate>}></Route>
        {/* <Route exact path='/selecttime' element={<TimeSelection></TimeSelection>}></Route> */}
        <Route exact path="/movie/:title" element={<MovieDetails movies={movies}></MovieDetails>} />
        <Route exact path="/seatselection" element={<SeatSelection></SeatSelection>}></Route>
        <Route exact path="/movietime/:title" element={<MovieTime movies={movies}></MovieTime>}></Route>
        
        <Route exact path="/confirmation" element={<Confirmation></Confirmation>}></Route>
        <Route exact path="/paymentinfo" element={<PaymentInfo></PaymentInfo>}></Route>
        <Route exact path="/ordersummary" element={<OrderSummary></OrderSummary>}></Route>
      </Routes>
    </div>
  );
}

export default App;





