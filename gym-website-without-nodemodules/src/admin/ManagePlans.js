import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminProtected from "./AdminProtected";  // ✅ Protect Admin Pages
import AdminSidebar from "./AdminSidebar";      // ✅ Sidebar for Admin
import "../assets/css/ManagePlans.css";

const ManagePlans = () => {
  const [plans, setPlans] = useState([]);
  const [formData, setFormData] = useState({
    title: "", description: "", duration: "", price: "", status: "Active", image: null
  });
  const [editMode, setEditMode] = useState(false);
  const [editingPlan, setEditingPlan] = useState(null);
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    const data = new FormData();
    data.append("action", "get");
    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_plans.php", data);
      if (res.data.status === "success") {
        setPlans(res.data.plans);
      }
    } catch (err) {
      console.error("Failed to fetch plans", err);
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

    if (editMode) {
      data.append("action", "update");
      data.append("id", editingPlan.id);
      data.append("existingImage", editingPlan.image);
    } else {
      data.append("action", "add");
    }

    for (let key in formData) {
      if (formData[key] !== null) {
        data.append(key, formData[key]);
      }
    }

    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_plans.php", data);
      if (res.data.status === "success") {
        setMessage("✅ " + res.data.message);
        fetchPlans();
        setEditMode(false);
        setEditingPlan(null);
        document.getElementById("addPlanForm").reset();
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setMessage("❌ Server Error");
    }
  };

  const deletePlan = async (id) => {
    if (!window.confirm("Are you sure you want to delete this plan?")) return;

    const data = new FormData();
    data.append("action", "delete");
    data.append("id", id);
    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_plans.php", data);
      if (res.data.status === "success") {
        fetchPlans();
      }
    } catch (err) {
      alert("Error deleting plan.");
    }
  };

  const openEditModal = (plan) => {
    setEditMode(true);
    setEditingPlan(plan);
    setFormData({
      title: plan.title,
      description: plan.description,
      duration: plan.duration,
      price: plan.price,
      status: plan.status,
      image: null, // will be replaced if user uploads a new image
    });
    const modal = new window.bootstrap.Modal(document.getElementById("addPlanModal"));
    modal.show();
  };

  return (
    <AdminProtected>
      <div className="admin-dashboard d-flex">
        <AdminSidebar />

        <div className="content flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>📋 Manage Membership Plans</h3>
            <button
              className="btn btn-primary"
              data-bs-toggle="modal"
              data-bs-target="#addPlanModal"
              onClick={() => {
                setEditMode(false);
                setFormData({ title: "", description: "", duration: "", price: "", status: "Active", image: null });
                document.getElementById("addPlanForm").reset();
              }}
            >
              ➕ Add Plan
            </button>
          </div>

          <div className="row">
            {plans.map((plan) => (
              <div className="col-md-4 mb-4" key={plan.id}>
                <div className="card shadow-sm h-100">
                  <img
                    src={`http://localhost/gym_website_api/uploads/plans/${plan.image}`}
                    className="card-img-top"
                    alt={plan.title}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{plan.title}</h5>
                    <p className="card-text">{plan.description}</p>
                    <p><b>Duration:</b> {plan.duration}</p>
                    <p><b>Price:</b> ₹{plan.price}</p>
                    <p>
                      <span className={`badge ${plan.status === "Active" ? "bg-success" : "bg-secondary"}`}>
                        {plan.status}
                      </span>
                    </p>
                    <div className="d-flex justify-content-center gap-2">
                      <button onClick={() => openEditModal(plan)} className="btn btn-sm btn-warning">✏️ Edit</button>
                      <button onClick={() => deletePlan(plan.id)} className="btn btn-sm btn-danger">🗑 Delete</button>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Add/Edit Plan */}
          <div className="modal fade" id="addPlanModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit} id="addPlanForm">
                  <div className="modal-header">
                    <h5 className="modal-title">{editMode ? "Edit Plan" : "Add New Plan"}</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                    <input type="text" name="title" className="form-control mb-2" placeholder="Title" value={formData.title} onChange={handleChange} required />
                    <textarea name="description" className="form-control mb-2" placeholder="Description" value={formData.description} onChange={handleChange} required></textarea>
                    <input type="text" name="duration" className="form-control mb-2" placeholder="Duration (e.g., 1 Month)" value={formData.duration} onChange={handleChange} required />
                    <input type="number" name="price" className="form-control mb-2" placeholder="Price" value={formData.price} onChange={handleChange} required />
                    <select name="status" className="form-select mb-2" value={formData.status} onChange={handleChange}>
                      <option value="Active">Active</option>
                      <option value="Inactive">Inactive</option>
                    </select>
                    <input type="file" name="image" className="form-control mb-2" onChange={handleChange} />
                    {message && <div className="alert alert-info text-center">{message}</div>}
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">{editMode ? "Update" : "Save"}</button>
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

export default ManagePlans;
