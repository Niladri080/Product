import {React, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';

const AdminLogin = ({loading,setloading}) => {
  
  const email = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
    try {
      setloading(true);
      e.preventDefault();
      setError("");
      axios.post("http://localhost:4000/api/admin/login",{email:email.current.value,password:password.current.value},{withCredentials:true})
      .then(res=> {
        if (res.data.success === true) {
          setTimeout(() => {
            setloading(false);
            navigate("/admin/dashboard");
          }, 2000);
        } else {
          setloading(false);
          setError(res.data.message || "Login failed.");
        }   
      }).catch(err=>{
        setloading(false);
        setError("Something went wrong.Try again")})
    } catch (error) {
      setloading(false);
      setError("Network error.Try again later");
    }
  }
  return (
        <form className="signup-form" onSubmit={handleSubmit}>
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
            placeholder="Password"
            ref={password}
            required
            className="signup-input"
          />
          {!loading  && <button type="submit" className={`signup-btn`}>
            Login as Admin
          </button>}
          {loading && <span type="submit" className={`signup-btn ${'bg-gray-300'}`}>
            Logging in....
          </span>}
          <div className="signup-link">
            New to Product Admin?{" "}
            <Link to="/signup" className="signup-login-link">
              Sign up
            </Link>
          </div>
          {error && <div className="signup-error">{error}</div>}
        </form>
  );
};

export default AdminLogin;
