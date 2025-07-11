import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import AdminHeader from "./AdminHeader";
import AdminFooter from "./AdminFooter";
import "../assets/css/AdminLogin.css";

const AdminLogin = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ username: "", password: "" });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/login.php", formData);
      if (res.data.status === "success") {
        localStorage.setItem("admin", JSON.stringify(res.data.admin));
        navigate("/admin/dashboard");  // ✅ Correct way to navigate
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setMessage("❌ Server error. Please try again.");
    }
  };

  return (
    <>
      <AdminHeader />
      <div className="login-page d-flex align-items-center justify-content-center" style={{ minHeight: "90vh" }}>
        <div className="login-box shadow p-4 rounded bg-white animate__animated animate__fadeInDown" style={{ width: "350px" }}>
          <h3 className="text-center mb-4">🔐 Admin Login</h3>
          <form onSubmit={handleLogin}>
            <div className="mb-3">
              <label className="form-label">Username</label>
              <input
                type="text"
                name="username"
                className="form-control"
                onChange={handleChange}
                required
                placeholder="Enter admin username"
              />
            </div>
            <div className="mb-3">
              <label className="form-label">Password</label>
              <input
                type="password"
                name="password"
                className="form-control"
                onChange={handleChange}
                required
                placeholder="Enter your password"
              />
            </div>
            <button type="submit" className="btn btn-dark w-100">Login</button>
            {message && (
              <div className="alert alert-warning mt-3 text-center">{message}</div>
            )}
          </form>
        </div>
      </div>
      <AdminFooter />
    </>
  );
};

export default AdminLogin;
