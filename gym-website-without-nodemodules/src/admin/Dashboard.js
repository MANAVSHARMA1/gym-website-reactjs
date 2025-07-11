import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../assets/css/Dashboard.css";
import axios from "axios";
import AdminProtected from "./AdminProtected";
import AdminSidebar from "./AdminSidebar";

const Dashboard = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ users: 0, bookings: 0, plans: 0, payments: 0 });

  useEffect(() => {
    fetchDashboardStats();
  }, []);

  const fetchDashboardStats = async () => {
    try {
      const res = await axios.get("http://localhost/gym_website_api/admin/dashboard_stats.php");
      if (res.data.status === "success") {
        setStats(res.data.stats);
      }
    } catch (error) {
      console.log("Error fetching stats", error);
    }
  };

  return (
    <AdminProtected>
      <div className="admin-dashboard d-flex">
        <AdminSidebar />

        {/* Main Content */}
        <div className="content flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h2>Dashboard</h2>
          </div>

          <div className="row g-4">
            <div className="col-md-3">
              <div className="card shadow bg-primary text-white p-4 text-center">
                <h5>Total Users</h5>
                <h2>{stats.users}</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow bg-success text-white p-4 text-center">
                <h5>Total Bookings</h5>
                <h2>{stats.bookings}</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow bg-info text-white p-4 text-center">
                <h5>Total Plans</h5>
                <h2>{stats.plans}</h2>
              </div>
            </div>
            <div className="col-md-3">
              <div className="card shadow bg-warning text-white p-4 text-center">
                <h5>Total Payments</h5>
                <h2>{stats.payments}</h2>
              </div>
            </div>
          </div>
        </div>
      </div>
    </AdminProtected>
  );
};

export default Dashboard;
