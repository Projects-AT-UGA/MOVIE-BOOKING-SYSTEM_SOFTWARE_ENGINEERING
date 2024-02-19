import './App.css';
// import UserRegistrationForm from './components/Registration';
import {Routes,Route} from 'react-router-dom'
import Login from './components/Registration/Login';
import LoginForm from './components/Registration/LoginForm';
function App() {
  return (
    <div>
      <Routes>
        <Route path="/" element={<h1>Movie list page</h1>}></Route>
        {/* <Route path="/register" element={<UserRegistrationForm />}></Route> */}
        <Route path="/register" element={<Login></Login>}></Route>
        <Route path="/login" element={<LoginForm></LoginForm>}></Route>
      </Routes>
       
            
            
    </div>
  );
}

export default App;