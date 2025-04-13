import axios from "axios";
import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import "./register.css";

const Register = () => {
  const [inputs, setInputs] = useState({
    firstName: "",
    secondName: "",
    email: "",
    contact: "",
    password: "",
    location: ""
  });

  const [errors, setErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setInputs((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" }));

    // Password validation
    if (name === "password") {
      if (value.length < 4) {
        setErrors((prev) => ({ ...prev, password: "Password is too short" }));
      } else if (value.length > 17) {
        setErrors((prev) => ({ ...prev, password: "Password must not exceed 17 characters" }));
      }
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    // Reset previous errors
    setErrors({});

    // Frontend validation
    if (inputs.password.length < 4) {
      setErrors((prev) => ({ ...prev, password: "Password is too short" }));
      return;
    }

    if (inputs.password.length > 17) {
      setErrors((prev) => ({ ...prev, password: "Password must not exceed 17 characters" }));
      return;
    }

    if (!/^\d{10}$/.test(inputs.contact)) {
      setErrors((prev) => ({ ...prev, contact: "Phone number must be exactly 10 digits" }));
      return;
    }

    try {
      await axios.post("http://localhost:8800/server/users/register", inputs);
      navigate("/login");
    } catch (err) {
      if (err.response?.data?.field) {
        setErrors((prev) => ({
          ...prev,
          [err.response.data.field]: err.response.data.message
        }));
      } else {
        setErrors((prev) => ({
          ...prev,
          location: "Something went wrong. Please try again."
        }));
      }
    }
  };

  return (
    <section className="h-100 d-flex justify-content-center align-items-center bg-transparent">
      <div className="container py-5 h-100">
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-xl-8">
            <div className="card card-registration my-4" style={{ maxWidth: "900px" }}>
              <div className="row g-0">
                <div className="col-xl-6 d-none d-xl-block">
                  <img src="/Agriconnect.jpg" alt="Sample" className="img-fluid" style={{ borderRadius: ".25rem", height: "100%" }} />
                </div>
                <div className="col-xl-6">
                  <div className="card-body p-md-5 text-black">
                    <h3 className="mb-5 text-uppercase">Registration Form</h3>
                    <form onSubmit={handleSubmit}>
                      <div className="row">
                        <div className="col-md-6 mb-4">
                          <input type="text" name="firstName" className="form-control form-control-lg" onChange={handleChange} placeholder="First name" />
                          {errors.firstName && <small className="text-danger">{errors.firstName}</small>}
                        </div>

                        <div className="col-md-6 mb-4">
                          <input type="text" name="secondName" className="form-control form-control-lg" onChange={handleChange} placeholder="Last name" />
                          {errors.secondName && <small className="text-danger">{errors.secondName}</small>}
                        </div>
                      </div>

                      <input type="email" name="email" className="form-control form-control-lg mb-2" onChange={handleChange} placeholder="Email" />
                      {errors.email && <small className="text-danger">{errors.email}</small>}

                      <input type="text" name="contact" className="form-control form-control-lg mb-2" onChange={handleChange} placeholder="Phone Number" />
                      {errors.contact && <small className="text-danger">{errors.contact}</small>}

                      <input type="text" name="location" className="form-control form-control-lg mb-2" onChange={handleChange} placeholder="Location" />
                      {errors.location && <small className="text-danger">{errors.location}</small>}

                      <input type="password" name="password" className="form-control form-control-lg mb-4" onChange={handleChange} placeholder="Password" />
                      {errors.password && <small className="text-danger">{errors.password}</small>}<br />

                      <button className="btn btn-primary btn-block fa-lg gradient-custom-2 mb-3" type="submit">Sign up</button>
                    </form>

                    <div className="d-flex align-items-center justify-content-center mt-4">
                      <p className="mb-0 me-2 text-muted">Have an account?</p>
                      <Link to="/login">
                        <button className="btn btn-outline-danger btn-sm">Sign in</button>
                      </Link>
                    </div>

                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
