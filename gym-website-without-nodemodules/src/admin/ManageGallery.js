import React, { useEffect, useState } from "react";
import axios from "axios";
import AdminProtected from "./AdminProtected";  // ✅ Protect page
import AdminSidebar from "./AdminSidebar";      // ✅ Sidebar navigation
import "../assets/css/ManageGallery.css";

const ManageGallery = () => {
  const [gallery, setGallery] = useState([]);
  const [formData, setFormData] = useState({ caption: "", image: null });
  const [message, setMessage] = useState("");

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    const data = new FormData();
    data.append("action", "get");
    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_gallery.php", data);
      if (res.data.status === "success") {
        setGallery(res.data.gallery);
      }
    } catch (err) {
      console.error("Error fetching gallery", err);
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
    data.append("action", "add");
    data.append("caption", formData.caption);
    data.append("image", formData.image);

    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_gallery.php", data);
      if (res.data.status === "success") {
        setMessage("✅ Image added to gallery");
        fetchGallery();
        setFormData({ caption: "", image: null });
        document.getElementById("galleryForm").reset();
      } else {
        setMessage("❌ " + res.data.message);
      }
    } catch (err) {
      setMessage("❌ Server Error");
    }
  };

  const deleteImage = async (id) => {
    if (!window.confirm("Are you sure you want to delete this image?")) return;

    const data = new FormData();
    data.append("action", "delete");
    data.append("id", id);

    try {
      const res = await axios.post("http://localhost/gym_website_api/admin/manage_gallery.php", data);
      if (res.data.status === "success") {
        fetchGallery();
      }
    } catch (err) {
      alert("Failed to delete image");
    }
  };

  return (
    <AdminProtected>
      <div className="admin-dashboard d-flex">
        <AdminSidebar />

        <div className="content flex-grow-1 p-4">
          <div className="d-flex justify-content-between align-items-center mb-4">
            <h3>🖼️ Manage Gallery</h3>
            <button className="btn btn-primary" data-bs-toggle="modal" data-bs-target="#addGalleryModal">
              ➕ Upload Image
            </button>
          </div>

          <div className="row">
            {gallery.map((img) => (
              <div className="col-md-4 mb-4" key={img.id}>
                <div className="card shadow-sm h-100">
                  <img
                    src={`http://localhost/gym_website_api/uploads/gallery/${img.image}`}
                    className="card-img-top"
                    alt={img.caption}
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body text-center">
                    <p className="card-text">{img.caption}</p>
                    <button onClick={() => deleteImage(img.id)} className="btn btn-sm btn-danger">
                      🗑 Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Modal for Upload */}
          <div className="modal fade" id="addGalleryModal" tabIndex="-1">
            <div className="modal-dialog">
              <div className="modal-content">
                <form onSubmit={handleSubmit} id="galleryForm">
                  <div className="modal-header">
                    <h5 className="modal-title">Upload New Image</h5>
                    <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
                  </div>
                  <div className="modal-body">
                    <input
                      type="text"
                      name="caption"
                      className="form-control mb-2"
                      placeholder="Image Caption"
                      onChange={handleChange}
                      required
                    />
                    <input
                      type="file"
                      name="image"
                      className="form-control mb-2"
                      onChange={handleChange}
                      required
                    />
                    {message && <div className="alert alert-info text-center">{message}</div>}
                  </div>
                  <div className="modal-footer">
                    <button type="submit" className="btn btn-success">Save</button>
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

export default ManageGallery;
