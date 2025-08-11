import axios from "axios";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router";
import Loader from "./Loader";
import { UserContext } from "../contexts/userContext";
import {useContext } from "react";

const PrivateAdminAuth = ({ children }) => {
  const {setuser}=useContext(UserContext);
  const navigate = useNavigate();
  const [authenticated, setAuthenticated] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:4000/api/admin/dashboard/home", {
        withCredentials: true,
      })
      .then((res) => {
        if (res.data.user.role==='admin'){
        setuser(res.data.user);
        localStorage.setItem("user",JSON.stringify(res.data.user));
        setAuthenticated(true);
        }
        else{
          setAuthenticated(false);
        }
      })
      .catch(() => setAuthenticated(false));
  }, []);

  useEffect(() => {
    if (authenticated === false) {
      navigate("/login");
    }
  }, [authenticated, navigate]);

  if (authenticated === null) {
    return <Loader />;
  }
  if (authenticated) {
    return children;
  }
  return null;
};

export default PrivateAdminAuth;
