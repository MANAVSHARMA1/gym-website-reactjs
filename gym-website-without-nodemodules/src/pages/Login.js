import React, { useState } from "react";
import axios from "axios";
import "../assets/css/UserForm.css";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const Login = () => {
  const [formData, setFormData] = useState({ email: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/gym_website_api/user/login.php", formData);
      if (res.data.status === "success") {
        localStorage.setItem("user", JSON.stringify(res.data.user));
        window.location.href = "/dashboard";
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <>
      <UserHeader />
      <div className="container py-5">
        <h3 className="mb-4 text-center">🔐 User Login</h3>
        <form onSubmit={handleLogin} className="w-50 mx-auto shadow p-4 bg-light rounded">
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} value={formData.email} required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} value={formData.password} required />
          </div>
          <button type="submit" className="btn btn-success w-100">Login</button>
          {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
        </form>
      </div>
      <UserFooter />
    </>
  );
};

export default Login;
