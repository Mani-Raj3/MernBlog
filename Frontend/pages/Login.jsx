// import React from 'react'
// import {Link} from 'react-router-dom'
// export const Login = () => {
//   return (
//     <>

//      <section className="bg-light">
//                 <div className="container d-flex flex-column align-items-center justify-content-center min-vh-100 py-4">
//                     <a href="#" className="mb-4 text-dark text-decoration-none d-flex align-items-center">
//                         <img className="me-2" src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg" alt="logo" width="32" height="32" />
//                         <Link to={'/'}> <span className="h4 mb-0 fw-bold">CodeByZahid</span></Link>
//                     </a>
//                     <div className="card shadow-sm w-100" style={{ maxWidth: '400px' }}>
//                         <div className="card-body p-4">
//                             <h1 className="h5 mb-4 fw-bold text-dark">Sign in to your account</h1>
//                             <form onSubmit={handleSubmit}>
//                                 <div className="mb-3">
//                                     <label htmlFor="email" className="form-label">Your email</label>
//                                     <input
//                                         type="email"
//                                         name='email'
//                                         onChange={handleChange}
//                                         className="form-control"
//                                         id="email"
//                                         placeholder="name@company.com"
//                                         required
//                                         value={value.email}
//                                     />
//                                 </div>
//                                 <div className="mb-3">
//                                     <label htmlFor="password" className="form-label">Password</label>
//                                     <input
//                                         type="password"
//                                         onChange={handleChange}
//                                         value={value.password}
//                                         name='password'
//                                         className="form-control"
//                                         id="password"
//                                         placeholder="••••••••"
//                                         required
//                                     />
//                                 </div>
//                                 <div className="d-flex justify-content-between align-items-center mb-3">
//                                     {/* Optional content can be added here */}
//                                 </div>
//                                 <button type="submit" className="btn btn-primary w-100">Sign in</button>
//                             </form>
//                             <p className="mt-3 mb-0 text-muted">
//                                 Don’t have an account yet? <Link to="/register" className="text-primary">Sign up</Link>
//                             </p>
//                         </div>
//                     </div>
//                 </div>
//             </section>


//     </>
//   )
// }


import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Login = () => {

  const [value, setValue] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(value);

    // API call here later
  };

  return (
    <>
      <section className="bg-light min-vh-100">
        <div className="container d-flex flex-column justify-content-center align-items-center min-vh-100 py-4">

          <Link
            to="/"
            className="mb-4 text-decoration-none d-flex align-items-center"
          >
            <img
              className="me-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
              width="32"
              height="32"
            />
            <span className="h4 mb-0 fw-bold text-primary">
              CodeByMani 
            </span>
          </Link>

          <div
            className="card shadow"
            style={{ maxWidth: "420px", width: "100%" }}
          >
            <div className="card-body p-4">

              <h2 className="fw-bold mb-4">
                Sign in to your account
              </h2>

              <form onSubmit={handleSubmit}>

                <div className="mb-3">
                  <label className="form-label">
                    Your email
                  </label>

                  <input
                    type="email"
                    name="email"
                    className="form-control"
                    placeholder="name@company.com"
                    value={value.email}
                    onChange={handleChange}
                    required
                  />
                </div>

                <div className="mb-4">
                  <label className="form-label">
                    Password
                  </label>

                  <input
                    type="password"
                    name="password"
                    className="form-control"
                    placeholder="••••••••"
                    value={value.password}
                    onChange={handleChange}
                    required
                  />
                </div>

                <button
                  type="submit"
                  className="btn btn-primary w-100"
                >
                  Sign In
                </button>

              </form>

              <p className="mt-3 text-center">
                Don't have an account?{" "}
                <Link to="/register">
                  Sign Up
                </Link>
              </p>

            </div>
          </div>

        </div>
      </section>
    </>
  );
};