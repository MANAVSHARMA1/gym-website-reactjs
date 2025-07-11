import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";

const Payment = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const [plan, setPlan] = useState(null);
  const user = JSON.parse(localStorage.getItem("user"));

  useEffect(() => {
    if (!user) {
      navigate("/login");
    } else {
      fetchPlan();
    }
  }, [id]);

  const fetchPlan = async () => {
    const res = await axios.post("http://localhost/gym_website_api/user/plan_details.php", { id });
    if (res.data.status === "success") {
      setPlan(res.data.plan);
    }
  };

  const handlePay = async () => {
    try {
      
      const res = await axios.post("http://localhost/gym_website_api/user/book_plan.php", {
        user_id: user.id,
        plan_id: plan.id,
        payment_method: "Credit Card"
      });

      if (res.data.status === "success") {
        alert("✅ Payment successful! Plan booked.");
        navigate("/dashboard");
      } else {
        alert("❌ " + res.data.message);
      }
    } catch {
      alert("❌ Payment failed.");
    }
  };

  return (
    <>
      <UserHeader />
      <div className="container py-5">
        {plan ? (
          <div className="card shadow p-4">
            <h3>💳 Payment for: {plan.title}</h3>
            <p><b>Duration:</b> {plan.duration}</p>
            <p><b>Price:</b> ₹{plan.price}</p>
            <p><b>Mock Payment Method:</b> Credit Card</p>
            <button onClick={handlePay} className="btn btn-success mt-3">Pay Now</button>
          </div>
        ) : (
          <div className="text-center">Loading...</div>
        )}
      </div>
      <UserFooter />
    </>
  );
};

export default Payment;
