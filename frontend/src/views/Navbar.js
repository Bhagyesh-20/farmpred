import React, { useContext } from 'react';
import {jwtDecode} from 'jwt-decode';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';
import './Navbar.css'
function Navbar() {
  const { user, logoutUser } = useContext(AuthContext);
  const token = localStorage.getItem("authTokens");

  if (token) {
    const decoded = jwtDecode(token);
    var user_id = decoded.user_id;
  }

  return (
    <nav className="navbar sticky-top navbar-expand-lg  color" >      <div className="container-fluid">
        <Link className="navbar-brand text " id ="heading" to="/">Farmpre</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarNavDropdown" aria-controls="navbarNavDropdown" aria-expanded="false" aria-label="Toggle navigation">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="navbarNavDropdown">
          <ul className="navbar-nav">
            <li className="nav-item">
              <Link className="nav-link " aria-current="page" to="/">Home</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/marketplace">Market Place</Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/cropdisease">Crop Disease</Link>
            </li> 
            <li className="nav-item">
              <Link className="nav-link" to="/weather">Weather Forecast</Link>
            </li> 
          </ul>
        </div>
      </div>
      {token === null && <>
        <Link to="/login"> 
          <button type="button" className="btn btn-info mx-2 btn-sm">Login</button>
        </Link>
        <Link to="/register"> 
          <button type="button" className="btn btn-light mx-2 btn-sm">Register</button>
        </Link>
      </>}
      {token !== null && 
        <>
         <Link to = "/dashboard">
            <button type="button" className="btn btn-info mx-2 btn-sm">Dashboard</button>
          </Link>

          <Link to ="/logout"> 
            <button className="btn btn-light mx-2 btn-sm" onClick={logoutUser} style={{cursor:"pointer"}}>Logout</button>
          </Link>
        </>
      }   
    </nav>
  );
}

export default Navbar;
