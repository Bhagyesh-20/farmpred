import './App.css';
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import PrivateRoute from './utils/PrivateRoute'; 
import { AuthProvider } from './context/AuthContext';
import Homepage from './views/Homepage';
import Registerpage from './views/Registerpage'; //done
import Loginpage from './views/Loginpage'; // done
import Navbar from './views/Navbar'; // done
import CropDisease from './views/CropDisease'; //done
import Weather from './views/WeatherPrediction'; // done
import MarketPlace from './views/MarketPlace';
function App() {
  return (
    <div className="App">
        <Router>
      <AuthProvider>
        <Navbar /> 
        <Routes>
          <Route path="/login" element={<Loginpage />} />
          <Route path="/register" element={<Registerpage />} />
          <Route path="/cropdisease" element={<CropDisease />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/" element={<Homepage />} />
          <Route path="/marketplace" element = {<MarketPlace/>}/>
        </Routes>
      </AuthProvider>
    </Router>
    </div>
  );
}

export default App;
