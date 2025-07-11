import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminProtected from "./AdminProtected";  // ✅ Secure page
import AdminSidebar from "./AdminSidebar";      // ✅ Sidebar
import "../assets/css/ManagePlans.css";          // (or another CSS if needed)

const ManageTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    feedback: "",
    image: null
  });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    const data = new FormData();
    data.append("action", "get");
    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_testimonials.php", data);
      if (res.data.status === "success") {
        setTestimonials(res.data.testimonials);
      }
    } catch (err) {
      console.error("Error fetching testimonials", err);
    }
  };

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setFormData({ ...formData, image: e.target.files[0] });
    } else {
      setFormData({ ...formData, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = new FormData();
    data.append("action", "add");
    for (let key in formData) {
      data.append(key, formData[key]);
    }

    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_testimonials.php", data);
      if (res.data.status === "success") {
        setMessage("✅ Testimonial added successfully!");
        fetchTestimonials();
        document.getElementById("addTestimonialForm").reset();
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setMessage("❌ Server error");
    }
  };

  const deleteTestimonial = async (id) => {
    if (!window.confirm("Are you sure you want to delete this testimonial?")) return;

    const data = new FormData();
    data.append("action", "delete");
    data.append("id", id);

    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_testimonials.php", data);
      if (res.data.status === "success") {
        fetchTestimonials();
      }
    } catch (err) {
      alert("Error deleting testimonial");
    }
  };

  const approveTestimonial = async (id) => {
    const data = new FormData();
    data.append("action", "approve");
    data.append("id", id);

    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_testimonials.php", data);
      if (res.data.status === "success") {
        fetchTestimonials();
      }
    } catch (err) {
      alert("Error approving testimonial");
    }
  };

  return (
    <AdminProtected>
      <div className="admin-dashboard d-flex">
        <AdminSidebar />

        <div className="content flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>💬 Manage Testimonials</h3>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addTestimonialModal">
              ➕ Add Testimonial
            </button>
          </div>

          {testimonials.length === 0 ? (
            <div className="alert alert-info">No testimonials found.</div>
          ) : (
            <div className="row">
              {testimonials.map((t) => (
                <div className="col-md-4 mb-4" key={t.id}>
                  <div className="card p-3 shadow-sm h-100 text-center">
                    <img
                      src={`http://localhost/gym_website_api/uploads/testimonials/${t.image}`}
                      className="rounded-circle mx-auto mb-3"
                      style={{ width: "100px", height: "100px", objectFit: "cover" }}
                      alt={t.name}
                    />
                    <h5>{t.name}</h5>
                    <p className="text-muted">{t.feedback}</p>
                    <p>
                      <span className={`badge ${t.status === "Approved" ? "bg-success" : "bg-warning text-dark"}`}>
                        {t.status}
                      </span>
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                      {t.status !== "Approved" && (
                        <button className="btn btn-sm btn-success" onClick={() => approveTestimonial(t.id)}>✅ Approve</button>
                      )}
                      <button className="btn btn-sm btn-danger" onClick={() => deleteTestimonial(t.id)}>🗑 Delete</button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}

          {/* Modal for Adding Testimonial */}
          <div className="modal fade" id="addTestimonialModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit} id="addTestimonialForm">
                  <div className="modal-header">
                    <h5 className="modal-title">Add New Testimonial</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      name="name"
                      className="form-control mb-2"
                      placeholder="Name"
                      onChange={handleChange}
                      required
                    />
                    <textarea
                      name="feedback"
                      className="form-control mb-2"
                      placeholder="Feedback"
                      onChange={handleChange}
                      required
                    ></textarea>
                    <input
                      type="file"
                      name="image"
                      className="form-control mb-2"
                      onChange={handleChange}
                      required
                    />
                    {message && <div className="alert alert-info mt-2">{message}</div>}
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">Save</button>
                    <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </AdminProtected>
  );
};

export default ManageTestimonials;
