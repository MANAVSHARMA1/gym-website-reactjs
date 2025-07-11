import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";
import UserHeader from "../components/UserHeader";
import UserFooter from "../components/UserFooter";
import { useNavigate } from "react-router-dom";

const PlanDetails = () => {
    const { id } = useParams();
    const [plan, setPlan] = useState(null);
    const [otherPlans, setOtherPlans] = useState([]);

    const navigate = useNavigate();
    
    useEffect(() => {
        fetchPlanDetails();
    }, [id]);

    const handleBookPlan = () => {
        const user = JSON.parse(localStorage.getItem("user"));
        if (!user) {
          alert("Please login to proceed with booking.");
          return;
        }
      
        navigate(`/payment/${plan.id}`);
      };


    const fetchPlanDetails = async () => {
        try {
            const res = await axios.post("http://localhost/gym_website_api/user/plan_details.php", { id });
            if (res.data.status === "success") {
                setPlan(res.data.plan);
                setOtherPlans(res.data.other_plans);
            }
        } catch (err) {
            console.log("Failed to load plan details");
        }
    };

    return (
        <>
            <UserHeader />
            <div className="container py-5">
                {plan ? (
                    <>
                        <h3 className="mb-4">📄 {plan.title}</h3>
                        <div className="row">
                            <div className="col-md-6">
                                <img
                                    src={`http://localhost/gym_website_api/uploads/plans/${plan.image}`}
                                    alt={plan.title}
                                    className="img-fluid rounded shadow"
                                />
                            </div>
                            <div className="col-md-6">
                                <h5>Description:</h5>
                                <p>{plan.description}</p>
                                <p><strong>Duration:</strong> {plan.duration}</p>
                                <p><strong>Price:</strong> ₹{plan.price}</p>
                                <button className="btn btn-success mt-3" onClick={handleBookPlan}>
                                    Book This Plan
                                </button>

                            </div>
                        </div>

                        <hr className="my-5" />

                        <h4 className="mb-4">🧾 Other Plans You Might Like</h4>
                        <div className="row">
                            {otherPlans.map((p) => (
                                <div className="col-md-4 mb-4" key={p.id}>
                                    <div className="card h-100 shadow-sm">
                                        <img
                                            src={`http://localhost/gym_website_api/uploads/plans/${p.image}`}
                                            className="card-img-top"
                                            alt={p.title}
                                            style={{ height: "200px", objectFit: "cover" }}
                                        />
                                        <div className="card-body">
                                            <h5>{p.title}</h5>
                                            <p>{p.description.substring(0, 100)}...</p>
                                            <p><strong>₹{p.price}</strong> / {p.duration}</p>
                                            <Link to={`/plan/${p.id}`} className="btn btn-outline-primary btn-sm">View Details</Link>
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </>
                ) : (
                    <div className="text-center py-5">Loading plan details...</div>
                )}
            </div>
            <UserFooter />
        </>
    );
};

export default PlanDetails;
