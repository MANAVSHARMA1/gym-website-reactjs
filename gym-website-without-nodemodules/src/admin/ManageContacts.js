import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminProtected from "./AdminProtected";   // ✅ Protect the page
import AdminSidebar from "./AdminSidebar";       // ✅ Use Sidebar

const ManageContacts = () => {
  const [messages, setMessages] = useState([]);

  useEffect(() => {
    fetchMessages();
  }, []);

  const fetchMessages = async () => {
    const data = new FormData();
    data.append("action", "get");
    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_contacts.php", data);
      if (res.data.status === "success") {
        setMessages(res.data.messages);
      }
    } catch (err) {
      console.error("Error fetching messages", err);
    }
  };

  const deleteMessage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this message?")) return;
    const data = new FormData();
    data.append("action", "delete");
    data.append("id", id);
    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_contacts.php", data);
      if (res.data.status === "success") {
        fetchMessages();
      }
    } catch (err) {
      alert("Failed to delete message.");
    }
  };

  return (
    <AdminProtected>
      <div className="admin-dashboard d-flex">
        <AdminSidebar />

        <div className="content flex-grow-1 p-4">
          <h3 className="mb-4">📨 Manage Contact Messages</h3>

          {messages.length === 0 ? (
            <div className="alert alert-info">No messages found.</div>
          ) : (
            <div className="table-responsive">
              <table className="table table-bordered table-hover align-middle text-center">
                <thead className="table-dark">
                  <tr>
                    <th>#</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Phone</th>
                    <th>Message</th>
                    <th>Date</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  {messages.map((msg, index) => (
                    <tr key={msg.id}>
                      <td>{index + 1}</td>
                      <td>{msg.name}</td>
                      <td>{msg.email}</td>
                      <td>{msg.phone}</td>
                      <td>{msg.message}</td>
                      <td>{new Date(msg.submitted_at).toLocaleString()}</td>
                      <td>
                        <button
                          onClick={() => deleteMessage(msg.id)}
                          className="btn btn-sm btn-danger"
                        >
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

export default ManageContacts;
