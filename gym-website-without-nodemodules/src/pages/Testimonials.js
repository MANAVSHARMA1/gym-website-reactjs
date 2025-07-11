import React, { useEffect, useState } from "react";
import axios from "axios";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const Testimonials = () => {
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials();
  }, []);

  const fetchTestimonials = async () => {
    try {
      const res = await axios.post("http://localhost/gym_website_api/user/all_testimonials.php");
      if (res.data.status === "success") {
        setTestimonials(res.data.testimonials);
      }
    } catch (err) {
      console.error("Error fetching testimonials", err);
    }
  };

  return (
    <>
      <UserHeader />
      <div className="container py-5">
        <h3 className="mb-4 text-center">💬 What Our Members Say</h3>

        {testimonials.length === 0 ? (
          <div className="alert alert-info text-center">No testimonials found.</div>
        ) : (
          <div className="row">
            {testimonials.map((t) => (
              <div className="col-md-4 mb-4" key={t.id}>
                <div className="card p-4 h-100 shadow-sm text-center">
                  <img
                    src={`http://localhost/gym_website_api/uploads/testimonials/${t.image}`}
                    className="rounded-circle mx-auto mb-3"
                    style={{
                      width: "120px",
                      height: "120px",
                      objectFit: "cover",
                      border: "3px solid #ffc107"
                    }}
                    alt={t.name}
                  />
                  <h5>{t.name}</h5>
                  <small className="text-muted">
                    {new Date(t.submitted_at).toLocaleDateString('en-IN', {
                      day: '2-digit', month: 'short', year: 'numeric'
                    })}
                  </small>
                  <p className="text-muted mt-3">{t.feedback}</p>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
      <UserFooter />
    </>
  );
};

export default Testimonials;
