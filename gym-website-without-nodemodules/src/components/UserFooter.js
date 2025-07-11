import React from "react";

const UserFooter = () => {
  return (
    <footer className="bg-dark text-white text-center py-3 mt-5">
      <p className="mb-0">© {new Date().getFullYear()} FitFlex Gym. All rights reserved.</p>
    </footer>
  );
};

export default UserFooter;
