import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AdminProtected = ({ children }) => {
  const navigate = useNavigate();

  useEffect(() => {
    const admin = JSON.parse(localStorage.getItem("admin"));
    if (!admin) {
      navigate("/admin/login");
    }
  }, [navigate]);

  return <>{children}</>;
};

export default AdminProtected;
