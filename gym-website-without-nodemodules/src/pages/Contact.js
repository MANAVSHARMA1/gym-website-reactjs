import React, { useState } from "react";
import axios from "axios";
import "../assets/css/UserForm.css";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "", email: "", phone: "", message: ""
  });
  const [responseMessage, setResponseMessage] = useState("");

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post("http://localhost/gym_website_api/user/contact.php", formData);
      if (res.data.status === "success") {
        setResponseMessage("✅ " + res.data.message);
        setFormData({ name: "", email: "", phone: "", message: "" });
      } else {
        setResponseMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setResponseMessage("❌ Server error. Please try again later.");
    }
  };

  return (
    <>
      <UserHeader />
      <div className="container py-5">
        <h3 className="mb-4 text-center">📬 Contact Us</h3>
        <form onSubmit={handleSubmit} className="w-75 mx-auto shadow p-4 bg-light rounded">
          <div className="mb-3">
            <input type="text" name="name" className="form-control" placeholder="Your Name" onChange={handleChange} value={formData.name} required />
          </div>
          <div className="mb-3">
            <input type="email" name="email" className="form-control" placeholder="Your Email" onChange={handleChange} value={formData.email} required />
          </div>
          <div className="mb-3">
            <input type="text" name="phone" className="form-control" placeholder="Phone (optional)" onChange={handleChange} value={formData.phone} />
          </div>
          <div className="mb-3">
            <textarea name="message" className="form-control" rows="4" placeholder="Your Message" onChange={handleChange} value={formData.message} required></textarea>
          </div>
          <button type="submit" className="btn btn-success w-100">Send Message</button>
          {responseMessage && <div className="alert alert-info mt-3 text-center">{responseMessage}</div>}
        </form>
      </div>
      <UserFooter />
    </>
  );
};

export default Contact;
