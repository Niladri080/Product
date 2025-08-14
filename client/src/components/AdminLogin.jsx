import {React, useContext, useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from 'axios';
import { toast } from "react-toastify";

const AdminLogin = ({loading,setloading}) => {
  
  const email = useRef(null);
  const password = useRef(null);
  const navigate=useNavigate();
  const handleSubmit=(e)=>{
    try {
      setloading(true);
      e.preventDefault();
      axios.post("http://localhost:4000/api/admin/login",{email:email.current.value,password:password.current.value},{withCredentials:true})
      .then(res=> {
        if (res.data.success === true) {
          toast.success(res.data.message);
          setTimeout(() => {
            setloading(false);
            navigate("/admin/dashboard");
          }, 2000);
        } else {
          toast.error(res.data.message);
          setloading(false);
        }   
      }).catch(err=>{
        toast.error("Error occurred while logging in");
        setloading(false);
        })
    } catch (error) {
      toast.error("Network error. Please try again");
      setloading(false);
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
        </form>
  );
};

export default AdminLogin;
