import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminProtected from "./AdminProtected";   // ✅ Protect Page
import AdminSidebar from "./AdminSidebar";       // ✅ Sidebar

const ManageUsers = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    try {
      const data = new FormData();
      data.append("action", "get");
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_users.php", data);
      if (res.data.status === "success") {
        setUsers(res.data.users);
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    try {
      const data = new FormData();
      data.append("action", "delete");
      data.append("id", id);

      const res = await axios.post("http://localhost/gym_website_api/admin/manage_users.php", data);
      if (res.data.status === "success") {
        fetchUsers(); // Refresh after delete
      }
    } catch (error) {
      alert("Error deleting user");
    }
  };

  return (
    <AdminProtected>
      <div className="admin-dashboard d-flex">
        <AdminSidebar />

        <div className="content flex-grow-1 p-4">
          <h3 className="mb-4">👥 Manage Users</h3>

          {users.length === 0 ? (
            <div className="alert alert-info">No registered users found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-striped table-hover text-center align-middle">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Full Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Gender</th>
                    <th>DOB</th>
                    <th>Registered On</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {users.map((user, index) => (
                    <tr key={user.id}>
                      <td>{index + 1}</td>
                      <td>{user.full_name}</td>
                      <td>{user.email}</td>
                      <td>{user.phone || "-"}</td>
                      <td>{user.gender || "-"}</td>
                      <td>{user.dob || "-"}</td>
                      <td>{new Date(user.created_at).toLocaleString()}</td>
                      <td>
                        <button className="btn btn-sm btn-danger" onClick={() => deleteUser(user.id)}>
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

export default ManageUsers;
