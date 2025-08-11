import { Link, useNavigate } from "react-router-dom";
import { useRef, useState } from "react";

const UserLogin=({loading,setloading})=>{
  const email = useRef(null);
  const password = useRef(null);
  const [error, setError] = useState("");
  const navigate=useNavigate();
  const handleSubmit = (e) => {
    e.preventDefault();
    setloading(true);
    setError("");
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
          setTimeout(() => {
            setloading(false);
            navigate('/user/dashboard')
          }, 2000);
        } else {
          setloading(false);
          setError(data.message);
        }
      })
      .catch((err) => {
        setloading(false);
        console.log(err.message);
        setError("Network Error. Please try again.");
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
              {error && <div className="signup-error">{error}</div>}
            </form>
  </>)
}
export default UserLogin