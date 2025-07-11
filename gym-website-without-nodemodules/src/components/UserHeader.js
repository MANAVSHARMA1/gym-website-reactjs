import React from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";

const UserHeader = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const user = JSON.parse(localStorage.getItem("user"));

  const isActive = (path) => (location.pathname === path ? "nav-link active" : "nav-link");

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-4">
      <div className="container-fluid">
        <Link className="navbar-brand fw-bold" to="/">🏋️ FitFlex</Link>
        <button className="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#userNavbar">
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="userNavbar">
          <ul className="navbar-nav ms-auto mb-2 mb-lg-0">
            <li className="nav-item"><Link to="/" className={isActive("/")}>Home</Link></li>
            <li className="nav-item"><Link to="/plans" className={isActive("/plans")}>Plans</Link></li>
            <li className="nav-item"><Link to="/gallery" className={isActive("/gallery")}>Gallery</Link></li>
            <li className="nav-item"><Link to="/testimonials" className={isActive("/testimonials")}>Testimonials</Link></li>
            <li className="nav-item"><Link to="/contact" className={isActive("/contact")}>Contact</Link></li>
            
            {user ? (
              <>
                <li className="nav-item"><Link to="/dashboard" className={isActive("/dashboard")}>Dashboard</Link></li>
                <li className="nav-item">
                  <button className="btn btn-link nav-link text-danger" onClick={handleLogout}>Logout</button>
                </li>
              </>
            ) : (
              <>
                <li className="nav-item"><Link to="/register" className={isActive("/register")}>Register</Link></li>
                <li className="nav-item"><Link to="/login" className={isActive("/login")}>Login</Link></li>
              </>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
};

export default UserHeader;
