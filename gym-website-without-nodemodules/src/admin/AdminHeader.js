import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const AdminHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => (location.pathname === path ? "nav-link active" : "nav-link");

  const handleLogout = () => {
    localStorage.removeItem("admin");
    navigate("/admin/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/admin/dashboard">🏋️ Gym Admin Panel</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#adminNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>

        <div className="collapse navbar-collapse" id="adminNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to="/admin/dashboard" className={isActive("/admin/dashboard")}>Dashboard</Link></li>
            <li className="nav-item"><Link to="/admin/manage-plans" className={isActive("/admin/manage-plans")}>Manage Plans</Link></li>
            <li className="nav-item"><Link to="/admin/manage-testimonials" className={isActive("/admin/manage-testimonials")}>Manage Testimonials</Link></li>
            <li className="nav-item"><Link to="/admin/manage-gallery" className={isActive("/admin/manage-gallery")}>Manage Gallery</Link></li>
            <li className="nav-item"><Link to="/admin/manage-contacts" className={isActive("/admin/manage-contacts")}>Manage Contacts</Link></li>

            {localStorage.getItem("admin") ? (
              <li className="nav-item">
                <button className="btn btn-outline-warning ms-3" onClick={handleLogout}>
                  Logout
                </button>
              </li>
            ) : (
              <li className="nav-item">
                <Link to="/admin/login" className="btn btn-outline-light ms-3">Login</Link>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default AdminHeader;
