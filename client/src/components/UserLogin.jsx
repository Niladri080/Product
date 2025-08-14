import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";
import { toast } from "react-toastify";

const UserLogin=({loading,setloading})=>{
  const email = useRef(null);
  const password = useRef(null);
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    fetch("http://localhost:4000/api/user/login", {
      credentials: "include",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email: email.current.value,
        password: password.current.value,
      }),
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success === true) {
            toast.success(data.message);
            setTimeout(() => {
            setloading(false);
            navigate('/user/dashboard')
          }, 2000);
        } else {
          toast.error(data.message);
          setloading(false);
        }
      })
      .catch((err) => {
        toast.error("Network error. Please try again later");
        setloading(false);
        console.log(err.message);
      });
  };

  return (<>
  <form onSubmit={handleSubmit} className="signup-form">
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
            Login as User
          </button>}
          {loading && <span type="submit" className={`signup-btn ${'bg-gray-300'}`}>
            Logging in....
          </span>}
              <div className="signup-link">
                New to Products?{" "}
                <Link to="/signup" className="signup-login-link">
                  Sign up
                </Link>{" "}
                now.
              </div>
            </form>
  </>)
}
export default UserLogin