import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { post } from "../src/services/Endpoint";

export const Login = () => {

  const navigate = useNavigate();

  const [value, setValue] = useState({
    email: "",
    password: "",
  });
  const [error, setError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    setValue({
      ...value,
      [e.target.name]: e.target.value,
    });
  };

const handleSubmit = async (e) => {
  e.preventDefault();
  setError("");
  setIsSubmitting(true);

  try {
    const response = await post("/auth/login", value);

    localStorage.setItem("token", response.data.token);

    // Optional: save user
    localStorage.setItem(
      "user",
      JSON.stringify(response.data.user)
    );

    // Go to All Posts
    navigate("/dashboard");

  } catch (error) {
    console.log("Login error:", error.response?.data || error);
    setError(error.response?.data?.message || "Unable to sign in. Please try again.");
  } finally {
    setIsSubmitting(false);
  }
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

              {error && <div className="alert alert-danger" role="alert">{error}</div>}

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
                  disabled={isSubmitting}
                >
                  {isSubmitting ? "Signing in..." : "Sign In"}
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
