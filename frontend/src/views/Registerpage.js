import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom'; // Import Link from React Router
import AuthContext from '../context/AuthContext'

function Registerpage() {
  const [email, setEmail] = useState("")
  const [username, setUsername] = useState("")
  const [password, setPassword] = useState("")
  const [password2, setPassword2] = useState("")

  const {registerUser} = useContext(AuthContext)



  const handleSubmit = async e => {
    e.preventDefault()
    registerUser(email, username, password, password2)
  }
  
  return (
      <div className="d-flex align-items-center py-4 bg-body-tertiary min-vh-100">
      <div className="container">
        <div className="row justify-content-center">
          <div className="col-md-4">
            <main className="form-signin w-100 m-auto">
              <form onSubmit={handleSubmit}>
                <img
                  className="mb-4"
                  src="https://getbootstrap.com/docs/5.3/assets/brand/bootstrap-logo.svg"
                  alt=""
                  width="72"
                  height="57"
                />
                <h1 className="h3 mb-3 fw-normal">Register Here</h1>
  
                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    id="floatingInput"
                    placeholder="name@example.com"
                    onChange={e => setEmail(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="text"
                    className="form-control"
                    id="floatingInput"
                    placeholder="username"
                    onChange={e => setUsername(e.target.value)}
                  />
                  <label htmlFor="floatingInput">Username</label>
                </div>

                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={e => setPassword(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    onChange={e => setPassword2(e.target.value)}
                  />
                  <label htmlFor="floatingPassword">Confirm Password</label>
                </div>
  
                
                <button className="btn btn-primary w-100 py-2" type="submit">
                  Register
                </button>

                <p>Already a Member? <Link to ="/login">Login</Link> </p>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
    
  )
}

export default Registerpage