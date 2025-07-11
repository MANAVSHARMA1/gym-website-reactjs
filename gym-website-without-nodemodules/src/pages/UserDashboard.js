import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const UserDashboard = () => {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [bookings, setBookings] = useState([]);

  useEffect(() => {
    const userData = JSON.parse(localStorage.getItem("user"));
    if (!userData) {
      navigate("/login");
    } else {
      setUser(userData);
      fetchBookings(userData.id);
    }
  }, [navigate]);

  const fetchBookings = async (user_id) => {
    try {
      const res = await axios.post("http://localhost/gym_website_api/user/my_bookings.php", {
        user_id: user_id,
      });
      if (res.data.status === "success") {
        setBookings(res.data.bookings);
      }
    } catch (err) {
      console.error("Error fetching bookings:", err);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("user");
    navigate("/login");
  };

  return (
    <>
      <UserHeader />
      <div className="container py-5">
        <h3 className="mb-4">👋 Welcome to Your Dashboard</h3>
        {user ? (
          <div className="card p-4 shadow-sm bg-light">
            <h4 className="mb-3">Hello, {user.full_name}</h4>
            <p><strong>Email:</strong> {user.email}</p>
            {user.phone && <p><strong>Phone:</strong> {user.phone}</p>}
            {user.gender && <p><strong>Gender:</strong> {user.gender}</p>}
            {user.dob && <p><strong>Date of Birth:</strong> {user.dob}</p>}
            {user.address && <p><strong>Address:</strong> {user.address}</p>}
            <button onClick={handleLogout} className="btn btn-danger mt-3">🚪 Logout</button>
          </div>
        ) : (
          <p>Loading...</p>
        )}

        {/* My Bookings Section */}
        <div className="mt-5">
          <h4 className="mb-3">📋 My Bookings</h4>
          {bookings.length === 0 ? (
            <div className="alert alert-info">No bookings found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered text-center">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Plan</th>
                    <th>Duration</th>
                    <th>Price</th>
                    <th>Payment</th>
                    <th>Date</th>
                  </tr>
                </thead>
                <tbody>
                  {bookings.map((b, i) => (
                    <tr key={b.id}>
                      <td>{i + 1}</td>
                      <td>{b.title}</td>
                      <td>{b.duration}</td>
                      <td>₹{b.price}</td>
                      <td>
                        <span className={`badge ${b.payment_status === "Paid" ? "bg-success" : "bg-warning text-dark"}`}>
                          {b.payment_status}
                        </span>
                        <div>{b.payment_method}</div>
                      </td>
                      <td>{b.booking_date}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default UserDashboard;
