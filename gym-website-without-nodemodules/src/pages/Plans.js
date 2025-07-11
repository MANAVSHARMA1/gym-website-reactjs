import React, { useEffect, useState } from "react";
import {Link} from 'react-router-dom';
import axios from "axios";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const Plans = () => {
  const [plans, setPlans] = useState([]);

  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const res = await axios.post("http://localhost/gym_website_api/user/plans.php");
      if (res.data.status === "success") {
        setPlans(res.data.plans);
      }
    } catch (err) {
      console.log("Failed to fetch plans", err);
    }
  };

  return (
    <>
      <UserHeader />
      <div className="container py-5">
        <h3 className="mb-4 text-center">📋 Membership Plans</h3>
        <div className="row">
          {plans.map((plan) => (
            <div className="col-md-4 mb-4" key={plan.id}>
              <div className="card h-100 shadow-sm">
                <img
                  src={`http://localhost/gym_website_api/uploads/plans/${plan.image}`}
                  className="card-img-top"
                  alt={plan.title}
                  style={{ height: "200px", objectFit: "cover" }}
                />
                <div className="card-body">
                  <h5 className="card-title">{plan.title}</h5>
                  <p className="card-text">{plan.description}</p>
                  <p><b>Duration:</b> {plan.duration}</p>
                  <p><b>Price:</b> ₹{plan.price}</p>
                  <Link to={`/plan/${plan.id}`} className="btn btn-outline-dark btn-sm">View Details</Link>

                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      <UserFooter />
    </>
  );
};

export default Plans;
