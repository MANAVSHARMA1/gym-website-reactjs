import React from "react";

const AdminFooter = () => {
  return (
    <footer className="bg-dark text-white text-center py-3">
      <p className="mb-0">© {new Date().getFullYear()} Gym Admin Panel. All rights reserved.</p>
    </footer>
  );
};

export default AdminFooter;
