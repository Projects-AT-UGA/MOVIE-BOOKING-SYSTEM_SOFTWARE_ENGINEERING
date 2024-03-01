import './App.css';
// import UserRegistrationForm from './components/Registration';
import {Routes,Route} from 'react-router-dom'
import Login from './components/Registration/Login';
import LoginForm from './components/Registration/LoginForm';
import { TimeSelection } from './components/BookingPage/TimeSelection';
import {Home} from './components/MainPage/Home'
import MovieDetails from './components/MainPage/MovieDetails';
import { useState,useEffect } from 'react';
import { SeatSelection } from './components/BookingPage/SeatSelection';
import {MovieTime} from './components/MainPage/MovieTime'
import {EditProfile} from './components/Registration/EditProfile'
import  {Confirmation} from './components/CheckoutPage/Confirmation'
import PaymentInfo from './components/CheckoutPage/PaymentInfo'
import {OrderSummary} from './components/CheckoutPage/OrderSummary'
import axios from 'axios';
function App() {
  const [movies,setMovies]=useState([]);

    useEffect(() => {
        axios.get('http://localhost:8000/api/movies/')
            .then(response => {
                setMovies(response.data);
                console.log(response.data)
            })
            .catch(error => {
                console.error('Error:', error);
            });
    }, []);
  return (
    <div>
      <Routes>
        <Route exact path="/" element={<Home movies={movies}></Home>}></Route>
        {/* <Route path="/register" element={<UserRegistrationForm />}></Route> */}
        <Route exact path="/register" element={<Login></Login>}></Route>
        <Route exact path="/login" element={<LoginForm></LoginForm>}></Route>
        <Route exact path='/selecttime' element={<TimeSelection></TimeSelection>}></Route>
        <Route exact path="/movie/:title" element={<MovieDetails movies={movies}></MovieDetails>} />
        <Route exact path="/seatselection" element={<SeatSelection></SeatSelection>}></Route>
        <Route exact path="/movietime/:title" element={<MovieTime movies={movies}></MovieTime>}></Route>
        <Route exact path="/editprofile" element={<EditProfile></EditProfile>}></Route>

        <Route exact path="/confirmation" element={<Confirmation></Confirmation>}></Route>
        <Route exact path="/paymentinfo" element={<PaymentInfo></PaymentInfo>}></Route>
        <Route exact path="/ordersummary" element={<OrderSummary></OrderSummary>}></Route>
        
      </Routes>
       
            
            
    </div>
  );
}

export default App;





