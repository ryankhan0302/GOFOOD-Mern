import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from './screens/Home';
import Login from './screens/Login';
import Signup from './screens/Signup';
import MyOrder from './screens/MyOrder';
import axios from 'axios';
import { CartProvider } from './components/ContextReducer';

const App = () => {
  useEffect(() => {
    // Trigger the Axios post request when the component mounts
    axios.defaults.withCredentials = true;
    axios.post('https://gofood-mern-api.vercel.app', { name: 'exampleName', email: 'example@example.com', password: 'examplePassword' })
      .then(response => {
        console.log('Post request successful:', response);
      })
      .catch(error => {
        console.error('Error sending post request:', error);
      });
  }, []); // Empty dependency array ensures this effect runs only once on component mount

  return (
    <CartProvider>
      <Router>
        <div>
          <Routes>
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/createuser" element={<Signup />} />
            <Route exact path="/myOrder" element={<MyOrder />} />
          </Routes>
        </div>
      </Router>
    </CartProvider>
  );
}

export default App;
