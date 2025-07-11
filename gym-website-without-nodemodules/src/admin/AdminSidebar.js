import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminSidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path ? "nav-link active text-warning" : "nav-link text-white";

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <div className="sidebar bg-dark text-white p-3 vh-100" style={{ width: "250px" }}>
      <h5>🏋️ Admin Panel</h5>
      <hr />
      <ul className="nav flex-column">
        <li className="nav-item">
          <Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>Dashboard</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-users" className={isActive("/admin/manage-users")}>Manage Users</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-plans" className={isActive("/admin/manage-plans")}>Manage Plans</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-bookings" className={isActive("/admin/manage-bookings")}>Manage Bookings</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-payments" className={isActive("/admin/manage-payments")}>Manage Payments</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-testimonials" className={isActive("/admin/manage-testimonials")}>Manage Testimonials</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-gallery" className={isActive("/admin/manage-gallery")}>Manage Gallery</Link>
        </li>
        <li className="nav-item">
          <Link to="/admin/manage-contacts" className={isActive("/admin/manage-contacts")}>Manage Contacts</Link>
        </li>
      </ul>

      <button className="btn btn-outline-warning w-100 mt-4" onClick={handleLogout}>
        🚪 Logout
      </button>
    </div>
  );
};

export default AdminSidebar;
