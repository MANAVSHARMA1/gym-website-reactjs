import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminProtected from "./AdminProtected";  // ✅ Protected Page
import AdminSidebar from "./AdminSidebar";      // ✅ Sidebar

const ManagePayments = () => {
  const [payments, setPayments] = useState([]);

  useEffect(() => {
    fetchPayments();
  }, []);

  const fetchPayments = async () => {
    try {
      const data = new FormData();
      data.append("action", "get");
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_payments.php", data);
      if (res.data.status === "success") {
        setPayments(res.data.payments);
      }
    } catch (error) {
      console.error("Error fetching payments:", error);
    }
  };

  return (
    <AdminProtected>
      <div className="admin-dashboard d-flex">
        <AdminSidebar />

        <div className="content flex-grow-1 p-4">
          <h3 className="mb-4">💳 Manage Payments</h3>

          {payments.length === 0 ? (
            <div className="alert alert-info">No payments found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>User Name</th>
                    <th>Plan Title</th>
                    <th>Amount Paid</th>
                    <th>Payment Mode</th>
                    <th>Payment Date</th>
                  </tr>
                </thead>
                <tbody>
                  {payments.map((p, index) => (
                    <tr key={p.id}>
                      <td>{index + 1}</td>
                      <td>{p.user_name}</td>
                      <td>{p.plan_title}</td>
                      <td>₹{p.amount_paid}</td>
                      <td>{p.payment_mode}</td>
                      <td>{new Date(p.payment_date).toLocaleString()}</td>
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

export default ManagePayments;
