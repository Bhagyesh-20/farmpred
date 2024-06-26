import React, { useContext } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Link } from 'react-router-dom';
import AuthContext from '../context/AuthContext';

function Loginpage() {
  const { loginUser } = useContext(AuthContext);

  const handleSubmit = (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;
    if (email.length > 0) {
      loginUser(email, password);
    }
  };

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
                <h1 className="h3 mb-3 fw-normal">Please Log in</h1>

                <div className="form-floating mb-3">
                  <input
                    type="email"
                    className="form-control"
                    name="email"
                    id="floatingInput"
                    placeholder="name@example.com"
                  />
                  <label htmlFor="floatingInput">Email address</label>
                </div>
                <div className="form-floating mb-3">
                  <input
                    type="password"
                    className="form-control"
                    id="floatingPassword"
                    placeholder="Password"
                    name="password"
                  />
                  <label htmlFor="floatingPassword">Password</label>
                </div>

                <button className="btn btn-primary w-100 py-2" type="submit">
                  Log in
                </button>

                <p className="mt-3">
                  Not a Member? <Link to="/register">Register</Link>
                </p>
              </form>
            </main>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Loginpage;
