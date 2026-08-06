import React, { useState } from "react";
import { Link } from "react-router-dom";

export const Register = () => {
  const [value, setValue] = useState({
    FullName: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log(value);
    console.log(image);

    // API Call Here
  };

  return (
    <section className="bg-light min-vh-100 d-flex align-items-center">
      <div className="container">
        <div className="row justify-content-center">

          <div className="col-md-5">

            <div className="text-center mb-4">
              <Link
                to="/"
                className="text-decoration-none d-inline-flex align-items-center"
              >
                <img
                  src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
                  width="35"
                  alt=""
                  className="me-2"
                />
                <span className="fw-bold fs-2 text-primary">
                  CodeByMani
                </span>
              </Link>
            </div>

            <div className="card shadow">

              <div className="card-body p-4">

                <h2 className="fw-bold mb-4">
                  Create an account
                </h2>

                <form
                  onSubmit={handleSubmit}
                  encType="multipart/form-data"
                >

                  <div className="text-center mb-4">

                    <label
                      htmlFor="profileImage"
                      className="position-relative d-inline-block"
                      style={{ cursor: "pointer" }}
                    >
                      <img
                        src={
                          image
                            ? URL.createObjectURL(image)
                            : "https://cdn-icons-png.flaticon.com/512/3135/3135715.png"
                        }
                        alt=""
                        className="rounded-circle border border-3 border-primary shadow"
                        style={{
                          width: "130px",
                          height: "130px",
                          objectFit: "cover",
                        }}
                      />

                      <span
                        className="position-absolute bottom-0 end-0 bg-primary text-white rounded-circle d-flex justify-content-center align-items-center"
                        style={{
                          width: "35px",
                          height: "35px",
                          fontSize: "20px",
                        }}
                      >
                        +
                      </span>
                    </label>

                    <input
                      type="file"
                      hidden
                      id="profileImage"
                      accept="image/*"
                      onChange={(e) => setImage(e.target.files[0])}
                    />

                    <p className="text-muted mt-2 mb-0">
                      Upload Profile Picture
                    </p>

                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Full Name
                    </label>

                    <input
                      type="text"
                      className="form-control"
                      placeholder="John Doe"
                      name="FullName"
                      value={value.FullName}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">
                      Email
                    </label>

                    <input
                      type="email"
                      className="form-control"
                      placeholder="name@company.com"
                      name="email"
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
                      className="form-control"
                      placeholder="••••••••"
                      name="password"
                      value={value.password}
                      onChange={handleChange}
                      required
                    />
                  </div>

                  <button
                    type="submit"
                    className="btn btn-primary w-100"
                  >
                    Sign Up
                  </button>

                  <p className="text-center mt-3 mb-0">
                    Already have an account?{" "}
                    <Link to="/login">
                      Sign In
                    </Link>
                  </p>

                </form>

              </div>

            </div>

          </div>

        </div>
      </div>
    </section>
  );
};