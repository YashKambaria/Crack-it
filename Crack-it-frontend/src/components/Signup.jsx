import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
import axios from "axios";

const Signup = () => {
  const navigate = useNavigate(); // Hook for navigation

  const [formData, setFormData] = useState({
    username: "", // Changed from name to username
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
  });

  const [errors, setErrors] = useState({});
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    console.log(userData);
  }, [userData]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    let newErrors = {};

    const phoneRegex = /^[6-9]\d{9}$/;
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    if (!formData.username.trim()) newErrors.username = "Username is required"; // Changed from name to username
    if (!emailRegex.test(formData.email)) newErrors.email = "Enter a valid email address";
    if (!phoneRegex.test(formData.phone)) newErrors.phone = "Enter a valid 10-digit phone number starting with 6-9";
    if (formData.password.length < 6) newErrors.password = "Password must be at least 6 characters";
    if (formData.password !== formData.confirmPassword) newErrors.confirmPassword = "Passwords do not match";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const validateUser = async (userData) => {
    try {
      const response = await axios.post(
        "http://localhost:8080/api/register", // Replace with your Spring Boot backend URL
        userData
      );
      console.log(response.data); // Handle success response from backend
      return true; // Return true if registration is successful
    } catch (error) {
      console.error("Error during registration", error);
      return false; // Return false if registration fails
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (validateForm()) {
      const newUser = {
        username: formData.username, // Changed from name to username
        email: formData.email,
        phone: formData.phone,
        password: formData.password,
      };

      setUserData((prevData) => [...prevData, newUser]);

      alert("Signup successful!");

      setFormData({
        username: "", // Changed from name to username
        email: "",
        phone: "",
        password: "",
        confirmPassword: "",
      });

      // Call validateUser (which sends data to backend)
      const userVerified = await validateUser(newUser); // Send newUser data to backend

      if (userVerified) {
        navigate("/dashboard"); // Redirect to home if validation passes
      } else {
        navigate("/signup"); // Stay on signup if validation fails
      }
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-6">
          <div className="card shadow-lg p-4">
            <h2 className="text-center mb-4">Sign Up</h2>
            <form onSubmit={handleSubmit}>
              <div className="mb-3">
                <label className="form-label">Username</label> {/* Changed label from Full Name to Username */}
                <input
                  type="text"
                  className={`form-control ${errors.username ? "is-invalid" : ""}`} // Changed from name to username
                  name="username" // Changed from name to username
                  value={formData.username} // Changed from name to username
                  onChange={handleChange}
                  placeholder="Enter your username" // Changed from Full Name to Username
                />
                {errors.username && <div className="invalid-feedback">{errors.username}</div>} {/* Changed from name to username */}
              </div>

              <div className="mb-3">
                <label className="form-label">Email Address</label>
                <input
                  type="email"
                  className={`form-control ${errors.email ? "is-invalid" : ""}`}
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  placeholder="Enter your email"
                />
                {errors.email && <div className="invalid-feedback">{errors.email}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Phone Number</label>
                <input
                  type="tel"
                  className={`form-control ${errors.phone ? "is-invalid" : ""}`}
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  placeholder="Enter your phone number"
                />
                {errors.phone && <div className="invalid-feedback">{errors.phone}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.password ? "is-invalid" : ""}`}
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  placeholder="Create a password"
                />
                {errors.password && <div className="invalid-feedback">{errors.password}</div>}
              </div>

              <div className="mb-3">
                <label className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className={`form-control ${errors.confirmPassword ? "is-invalid" : ""}`}
                  name="confirmPassword"
                  value={formData.confirmPassword}
                  onChange={handleChange}
                  placeholder="Re-enter your password"
                />
                {errors.confirmPassword && (
                  <div className="invalid-feedback">{errors.confirmPassword}</div>
                )}
              </div>

              <button type="submit" className="btn btn-primary w-100">
                Sign Up
              </button>
            </form>

            <p className="text-center mt-3">
              Already have an account? <Link to="/login">Log in</Link>
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;