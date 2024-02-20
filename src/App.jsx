import './App.css';
// import UserRegistrationForm from './components/Registration';
import {Routes,Route} from 'react-router-dom'
import Login from './components/Registration/Login';
import LoginForm from './components/Registration/LoginForm';
import { TimeSelection } from './components/BookingPage/TimeSelection';
import {Home} from './components/MainPage/Home'
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<Home></Home>}></Route>
        {/* <Route path="/register" element={<UserRegistrationForm />}></Route> */}
        <Route path="/register" element={<Login></Login>}></Route>
        <Route path="/login" element={<LoginForm></LoginForm>}></Route>
        <Route path='/selecttime' element={<TimeSelection></TimeSelection>}></Route>
      </Routes>
       
            
            
    </div>
  );
}

export default App;