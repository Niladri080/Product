import axios from "axios";
import { useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const AdminSignup = () => {
  const navigate=useNavigate();
  const name = useRef(null);
  const email = useRef(null);
  const phone = useRef(null);
  const address = useRef(null);
  const password = useRef(null);
  const image = useRef(null);
  const handleSubmit =async (e) => {
    try {
      e.preventDefault();
      if (password.current.value.length < 6) {
        return toast.error("Password must be at least 6 characters.");
      }
      const imageFile = image.current.files[0];
      if (!imageFile.type.startsWith("image/")) {
        return toast.error("Selected file should be an image");
      }
      const formData = new FormData();
      formData.append("name", name.current.value);
      formData.append("email", email.current.value);
      formData.append("phone", phone.current.value);
      formData.append("address", address.current.value);
      formData.append("password", password.current.value);
      formData.append("image", imageFile);
      const res = await axios.post("http://localhost:4000/api/admin/signup", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });
  
      if (res.data.success === true) {
        toast.success(res.data.message);
        navigate('/login')
      } else {
        toast.error(res.data.message);
      }
    } catch (error) {
      toast.error("Failed to create account. Please try again later.");
      console.error(error.message);
    }
  };
  return (
    <form className="signup-form" onSubmit={handleSubmit}>
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
        type="tel"
        name="phone"
        placeholder="Phone Number"
        ref={phone}
        required
        className="signup-input"
      />
      <input
        type="text"
        name="address"
        placeholder="Address"
        ref={address}
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
      <input
        type="file"
        name="image"
        accept="image/*"
        ref={image}
        required
        className="signup-input"
        style={{ padding: "0.5rem 0.5rem" }}
      />
      <button type="submit" className="signup-btn">
        Register as Admin
      </button>
      <div className="signup-link">
        Already an admin?{" "}
        <Link to="/login" className="signup-login-link">
          Login
        </Link>
      </div>
    </form>
  );
};
export default AdminSignup;
