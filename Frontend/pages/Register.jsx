import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../src/services/Endpoint";

export const Register = () => {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    FullName: "",
    email: "",
    password: "",
  });

  const [image, setImage] = useState(null);
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError("");
    setIsSubmitting(true);

    const formData = new FormData();
    formData.append("FullName", value.FullName);
    formData.append("email", value.email);
    formData.append("password", value.password);

    if (image) {
      formData.append("profile", image);
    }

    try {
      await post("/auth/register", formData);
      navigate("/login", { replace: true });
    } catch (requestError) {
      setError(requestError.response?.data?.message || "Unable to create your account. Please try again.");
    } finally {
      setIsSubmitting(false);
    }
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

                {error && <div className="alert alert-danger" role="alert">{error}</div>}

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
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? "Creating account..." : "Sign Up"}
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
