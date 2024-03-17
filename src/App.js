import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {BrowserRouter as Router,Route,Routes, Navigate} from 'react-router-dom'
import Header from './components/Header';
import Footer from './components/Footer';
import Home from './components/home';
import Register from './components/User/Register';
import Open from './components/User/Open';
import Login from './components/User/Login';
import Logout from './components/User/Logout';
import Profile from './components/User/Profile';
import UpdateProfile from './components/User/Updateprofile';



function App(){

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const handleLogin = () => {
    // Logic to handle user login, set isLoggedIn to true
    setIsLoggedIn(true);
  };

  // Function to handle user logout
  const handleLogout = () => {
    // Logic to handle user logout, set isLoggedIn to false
    setIsLoggedIn(false);
  };

// Function to retrieve the token from local storage or cookies
const getToken = () => {
  return localStorage.getItem('token'); // You can also use other methods to retrieve the token
};

// Axios request interceptor to add the token to the headers
axios.interceptors.request.use(
  (config) => {
    const token = getToken();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

  return (
      <Router>
        <div className="App">
        <Header isLoggedIn={isLoggedIn} handleLogout={handleLogout}/>
            <Routes>
              <Route path="/login" element={<Login handleLogin={handleLogin}/>} />
              <Route path="/" element={<Open/>} />
              <Route path="/home" element={isLoggedIn?<Home/> :  <Navigate to='/login' />} />
              <Route path="/register" element={<Register/>} />
              <Route path="/myprofile" element={<Profile/> }/>
              <Route path="/update-profile" element={<UpdateProfile/> }/>
              
              
              
              <Route path="/logout" element={<Logout/>} />
              
            </Routes>
          <Footer/>
        </div>
        
      </Router>
);
}
  

export default App;
