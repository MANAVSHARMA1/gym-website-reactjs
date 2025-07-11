import React, { useEffect, useState } from "react";
import axios from "axios";
import "../assets/css/UserHome.css";
import { Link } from "react-router-dom";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const Home = () => {
  const [plans, setPlans] = useState([]);
  const [testimonials, setTestimonials] = useState([]);
  const [gallery, setGallery] = useState([]);

  useEffect(() => {
    fetchPlans();
    fetchTestimonials();
    fetchGallery();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.post("http://localhost/gym_website_api/common/get_plans.php");
      if (res.data.status === "success") {
        setPlans(res.data.plans.slice(0, 3));
      }
    } catch (err) {
      console.log("Error fetching plans");
    }
  };

  const fetchTestimonials = async () => {
    try {
      const res = await axios.post("http://localhost/gym_website_api/user/testimonials.php");
      if (res.data.status === "success") {
        setTestimonials(res.data.testimonials.slice(0, 3));
      }
    } catch (err) {
      console.log("Error fetching testimonials");
    }
  };

  const fetchGallery = async () => {
    try {
      const res = await axios.post("http://localhost/gym_website_api/user/gallery.php");
      if (res.data.status === "success") {
        setGallery(res.data.images);  
      }
    } catch (err) {
      console.log("Error fetching gallery");
    }
  };
  

  return (
    <>
      <UserHeader />

      {/* Hero Section */}
      <header className="home-hero d-flex align-items-center justify-content-center text-center text-white">
        <div>
          <h1 className="display-4 animate__animated animate__fadeInDown">Welcome to FitFlex Gym</h1>
          <p className="lead animate__animated animate__fadeInUp mt-3">
            Transform your body, boost your energy, and reach your goals with us.
          </p>
          <Link to="/plans" className="btn btn-lg btn-warning mt-4 animate__animated animate__fadeInUp">
            View Membership Plans
          </Link>
        </div>
      </header>

      {/* About Section */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="mb-4">About FitFlex Gym</h2>
          <p className="lead">
            FitFlex Gym is your ultimate fitness destination for strength training, cardio workouts,
            group classes, and personal training. Whether you’re a beginner or a pro, we’ve got
            everything you need to succeed.
          </p>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-5 bg-light">
        <div className="container text-center">
          <h2 className="mb-4">💪 Why Choose Us?</h2>
          <div className="row">
            <div className="col-md-4">
              <h5>🏋️ Modern Equipment</h5>
              <p>Access state-of-the-art fitness machines and workout zones.</p>
            </div>
            <div className="col-md-4">
              <h5>👨‍🏫 Expert Trainers</h5>
              <p>Personal training from certified professionals tailored to you.</p>
            </div>
            <div className="col-md-4">
              <h5>🎯 Goal-Oriented Plans</h5>
              <p>Programs for weight loss, muscle gain, and lifestyle fitness.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Top 3 Plans */}
      <section className="py-5 text-center bg-white">
        <div className="container">
          <h2 className="mb-4">🔥 Top Membership Plans</h2>
          <div className="row">
            {plans.map((plan) => (
              <div className="col-md-4 mb-4" key={plan.id}>
                <div className="card h-100 shadow-sm">
                  <img
                    src={`http://localhost/gym_website_api/uploads/plans/${plan.image}`}
                    alt={plan.title}
                    className="card-img-top"
                    style={{ height: "200px", objectFit: "cover" }}
                  />
                  <div className="card-body">
                    <h5 className="card-title">{plan.title}</h5>
                    <p className="card-text">{plan.description}</p>
                    <p><b>₹{plan.price}</b> for {plan.duration}</p>
                    <Link to="/plans" className="btn btn-outline-dark btn-sm">Explore</Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Top 3 Testimonials */}
<section className="py-5 bg-light text-center">
  <div className="container">
    <h2 className="mb-4">💬 What Our Members Say</h2>
    <div className="row">
      {testimonials.map((t) => (
        <div className="col-md-4 mb-4" key={t.id}>
          <div className="card p-4 h-100 shadow-sm">
            <img
              src={`http://localhost/gym_website_api/uploads/testimonials/${t.image}`}
              className="rounded-circle mx-auto mb-3"
              style={{ width: "120px", height: "120px", objectFit: "cover", border: "3px solid #ffc107" }}
              alt={t.name}
            />
            <h5 className="mt-2">{t.name}</h5>
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
  </div>
</section>


      {/* Gallery */}
      <section className="py-5 bg-white text-center">
        <div className="container">
          <h2 className="mb-4">🏋️‍♂️ Our Gym in Action</h2>
          <div className="row g-3">
            {gallery.map((img) => (
              <div className="col-md-4" key={img.id}>
                <img
                  src={`http://localhost/gym_website_api/uploads/gallery/${img.image}`}
                  alt={img.caption}
                  className="img-fluid rounded shadow-sm"
                  style={{ height: "250px", objectFit: "cover", width: "100%" }}
                />
                <p className="mt-2 text-muted">{img.caption}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Call to Action */}
      <section className="py-5 text-center bg-dark text-white">
        <div className="container">
          <h2 className="mb-3">🔥 Ready to Join?</h2>
          <p className="mb-4">Choose your plan and get started on your fitness journey today!</p>
          <Link to="/register" className="btn btn-warning btn-lg">Get Started Now</Link>
        </div>
      </section>

      <UserFooter />
    </>
  );
};

export default Home;
