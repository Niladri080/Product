import React, { useRef, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import UserSignup from "../components/UserSignup";
import AdminSignup from "../components/AdminSignup";

const SignupPage = () => {
 const [activePage,setactivePage]=useState('user');

  
  return (
    <div className="signup-bg">
      <div className="signup-card">
        <h2 className="signup-title">Register as {activePage==='user'?"User":"Admin"}</h2>
        <div
              style={{
                display: "flex",
                justifyContent: "center",
                marginBottom: "1rem",
              }}
            >
              <button
                type="button"
                onClick={() => setactivePage("user")}
                style={{
                  background: activePage === "user" ? "#bbb" : "transparent",
                  color: activePage === "user" ? "#222" : "#222",
                  border: "none",
                  borderRadius: "5px 0 0 5px",
                  padding: "0.5rem 1.5rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxShadow:
                    activePage === "user"
                      ? "0 4px 12px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.10)"
                      : "0 1px 2px rgba(0,0,0,0.06)",
                  zIndex: activePage === "user" ? 1 : 0,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.18)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow =
                    activePage === "user"
                      ? "0 4px 12px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.10)"
                      : "0 1px 2px rgba(0,0,0,0.06)")
                }
              >
                User
              </button>
              <button
                type="button"
                onClick={() => setactivePage("admin")}
                style={{
                  background: activePage === "admin" ? "#bbb" : "transparent",
                  color: activePage === "admin" ? "#222" : "#222",
                  border: "none",
                  borderRadius: "0 5px 5px 0",
                  padding: "0.5rem 1.5rem",
                  cursor: "pointer",
                  fontWeight: "bold",
                  transition: "background 0.2s, box-shadow 0.2s",
                  outline: "none",
                  boxShadow:
                    activePage === "admin"
                      ? "0 4px 12px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.10)"
                      : "0 1px 2px rgba(0,0,0,0.06)",
                  zIndex: activePage === "admin" ? 1 : 0,
                }}
                onMouseOver={(e) =>
                  (e.currentTarget.style.boxShadow =
                    "0 4px 16px rgba(0,0,0,0.18)")
                }
                onMouseOut={(e) =>
                  (e.currentTarget.style.boxShadow =
                    activePage === "admin"
                      ? "0 4px 12px rgba(0,0,0,0.12), 0 1.5px 4px rgba(0,0,0,0.10)"
                      : "0 1px 2px rgba(0,0,0,0.06)")
                }
              >
                Admin
              </button>
            </div>
        {activePage==='user' && <UserSignup/>}
        {activePage==='admin' && <AdminSignup/>}
      </div>
    </div>
  );
};

export default SignupPage;
