import React, { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const Gallery = () => {
  const [images, setImages] = useState([]);
  const [previewImage, setPreviewImage] = useState(null);

  useEffect(() => {
    fetchGallery();
  }, []);

  const fetchGallery = async () => {
    try {
      const res = await axios.post("http://localhost/gym_website_api/user/gallery.php");
      if (res.data.status === "success") {
        setImages(res.data.images);
      }
    } catch (err) {
      console.error("Error fetching gallery", err);
    }
  };

  const imageUrl = (img) => `http://localhost/gym_website_api/uploads/gallery/${img.image}`;

  return (
    <>
      <UserHeader />
      <div className="container py-5">
        <h3 className="mb-4 text-center">🏋️‍♀️ Our Gym Gallery</h3>
        {images.length === 0 ? (
          <div className="alert alert-info text-center">No images uploaded yet.</div>
        ) : (
          <div className="row g-4">
            {images.map((img) => (
              <div className="col-md-4" key={img.id}>
                <div className="card shadow-sm">
                  <img
                    src={imageUrl(img)}
                    className="card-img-top"
                    alt={img.caption}
                    style={{ height: "250px", objectFit: "cover", cursor: "pointer" }}
                    onClick={() => setPreviewImage(imageUrl(img))}
                  />
                  <div className="card-body text-center">
                    <p className="card-text">{img.caption}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Lightbox Modal */}
      {previewImage && (
        <div
          className="lightbox-overlay"
          onClick={() => setPreviewImage(null)}
          style={{
            position: "fixed",
            top: 0, left: 0, width: "100%", height: "100%",
            backgroundColor: "rgba(0,0,0,0.8)",
            display: "flex", justifyContent: "center", alignItems: "center",
            zIndex: 1050,
          }}
        >
          <img
            src={previewImage}
            alt="Preview"
            style={{ maxHeight: "90vh", maxWidth: "90vw", border: "5px solid white", borderRadius: "10px" }}
          />
          <button
            onClick={() => setPreviewImage(null)}
            style={{
              position: "absolute", top: 20, right: 30,
              background: "red", color: "white",
              border: "none", fontSize: "20px", padding: "5px 10px", cursor: "pointer"
            }}
          >
            ✖
          </button>
        </div>
      )}

      <UserFooter />
    </>
  );
};

export default Gallery;
