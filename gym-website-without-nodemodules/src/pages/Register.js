import React, { useState } from "react";
import axios from "axios";
import "../assets/css/UserForm.css";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const Register = () => {
  const [formData, setFormData] = useState({
    full_name: "",
    email: "",
    password: "",
    phone: "",
    gender: "",
    dob: "",
    address: ""
  });
  const [message, setMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/gym_website_api/user/register.php", formData);
      if (res.data.status === "success") {
        setMessage("✅ " + res.data.message);
        setFormData({
          full_name: "", email: "", password: "", phone: "", gender: "", dob: "", address: ""
        });
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  return (
    <>
      <UserHeader />
      <div className="container py-5">
        <h3 className="mb-4 text-center">📝 Register as a New Member</h3>
        <form onSubmit={handleSubmit} className="w-75 mx-auto shadow p-4 bg-light rounded">
          <div className="mb-3">
            <input type="text" name="full_name" className="form-control" placeholder="Full Name" onChange={handleChange} value={formData.full_name} required />
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Email" onChange={handleChange} value={formData.email} required />
          </div>
          <div className="mb-3">
            <input type="password" name="password" className="form-control" placeholder="Password" onChange={handleChange} value={formData.password} required />
          </div>
          <div className="mb-3">
            <input type="text" name="phone" className="form-control" placeholder="Phone" onChange={handleChange} value={formData.phone} />
          </div>
          <div className="mb-3">
            <select name="gender" className="form-select" onChange={handleChange} value={formData.gender}>
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
              <option value="Other">Other</option>
            </select>
          </div>
          <div className="mb-3">
            <input type="date" name="dob" className="form-control" onChange={handleChange} value={formData.dob} />
          </div>
          <div className="mb-3">
            <textarea name="address" className="form-control" placeholder="Address" onChange={handleChange} value={formData.address}></textarea>
          </div>
          <button type="submit" className="btn btn-success w-100">Register</button>
          {message && <div className="alert alert-info mt-3 text-center">{message}</div>}
        </form>
      </div>
      <UserFooter />
    </>
  );
};

export default Register;
