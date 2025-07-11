import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminProtected from "./AdminProtected";   // ✅ Protected Page
import AdminSidebar from "./AdminSidebar";       // ✅ Sidebar

const ManageBookings = () => {
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    fetchBookings();
  }, []);

  const fetchBookings = async () => {
    try {
      const data = new FormData();
      data.append("action", "get");
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_bookings.php", data);
      if (res.data.status === "success") {
        setBookings(res.data.bookings);
      }
    } catch (error) {
      console.error("Error fetching bookings:", error);
    }
  };

  const deleteBooking = async (id) => {
    if (!window.confirm("Are you sure you want to delete this booking?")) return;

    try {
      const data = new FormData();
      data.append("action", "delete");
      data.append("id", id);

      const res = await axios.post("http://localhost/gym_website_api/admin/manage_bookings.php", data);
      if (res.data.status === "success") {
        fetchBookings();
      }
    } catch (error) {
      alert("Error deleting booking");
    }
  };

  return (
    <AdminProtected>
      <div className="admin-dashboard d-flex">
        <AdminSidebar />

        <div className="content flex-grow-1 p-4">
          <h3 className="mb-4">📑 Manage Bookings</h3>

          {bookings.length === 0 ? (
            <div className="alert alert-info">No bookings found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>User</th>
                    <th>Plan</th>
                    <th>Booking Date</th>
                    <th>Payment Status</th>
                    <th>Payment Method</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, index) => (
                    <tr key={b.id}>
                      <td>{index + 1}</td>
                      <td>{b.user_name}</td>
                      <td>{b.plan_title}</td>
                      <td>{b.booking_date}</td>
                      <td>
                        <span className={`badge ${b.payment_status === "Paid" ? "bg-success" : "bg-warning text-dark"}`}>
                          {b.payment_status}
                        </span>
                      </td>
                      <td>{b.payment_method || "-"}</td>
                      <td>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteBooking(b.id)}>
                          🗑 Delete
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
    </AdminProtected>
  );
};

export default ManageBookings;
