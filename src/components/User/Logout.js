import React from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Logout = ({ isLoggedOut }) => {
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get('http://localhost:8000/api/v1/logout');
      document.cookie = 'token=response.data.token; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';

      isLoggedOut(); // Call the function passed from App component to update the loggedin state
      navigate('/login'); // Redirect to the login page after logout
    } catch (error) {
      console.error('Logout failed:', error);
    }
  };

  return (
    <button onClick={handleLogout}>Logout</button>
  );
};

export default Logout;
