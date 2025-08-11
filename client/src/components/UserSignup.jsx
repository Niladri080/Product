import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
const UserSignup=()=>{
  const navigate = useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password.current.value.length < 6) {
      return setError("Password must be at least 6 characters.");
    }
    fetch("http://localhost:4000/api/user/signup", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        name: name.current.value,
        email: email.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
          setSuccess("Account created successfully! Redirecting...");
          setTimeout(() => navigate("/login"), 1500);
        } else {
          setError(data.message);
        }
      })
      .catch(() => setError("Network error. Please try again."));
  };
  return (
    <form onSubmit={handleSubmit} className="signup-form">
          <input
            type="text"
            name="name"
            placeholder="Full Name"
            ref={name}
            required
            className="signup-input"
          />
          <input
            type="email"
            name="email"
            placeholder="Email Address"
            ref={email}
            required
            className="signup-input"
          />
          <input
            type="password"
            name="password"
            placeholder="Password (min 6 characters)"
            ref={password}
            required
            className="signup-input"
          />
          <button type="submit" className="signup-btn">
            Sign Up
          </button>
          <div className="signup-link">
            Already have an account?{" "}
            <Link to="/login" className="signup-login-link">
              Login
            </Link>
          </div>
          {error && <div className="signup-error">{error}</div>}
          {success && <div className="signup-success">{success}</div>}
        </form>
  )
} 
export default UserSignup;