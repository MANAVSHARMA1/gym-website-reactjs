import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import AdminLogin from "./admin/AdminLogin";
import Dashboard from "./admin/Dashboard";
import ManagePlans from "./admin/ManagePlans";
import ManageGallery from "./admin/ManageGallery";
import ManageContacts from "./admin/ManageContacts";
import ManageTestimonials from "./admin/ManageTestimonials";
import ManageUsers from "./admin/ManageUsers";
import ManageBookings from "./admin/ManageBookings";   
import ManagePayments from "./admin/ManagePayments";   

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";
import UserDashboard from "./pages/UserDashboard";
import Contact from "./pages/Contact";
import Plans from "./pages/Plans";
import PlanDetails from "./pages/PlanDetails";
import Payment from "./pages/Payment";
import Gallery from "./pages/Gallery";
import Testimonials from "./pages/Testimonials";

function App() {
  return (
    <Router>
      <Routes>

        {/* User Area */}
        <Route path="/" element={<Home />} />
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<UserDashboard />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/plans" element={<Plans />} />
        <Route path="/plan/:id" element={<PlanDetails />} />
        <Route path="/payment/:id" element={<Payment />} />
        <Route path="/gallery" element={<Gallery />} />
        <Route path="/testimonials" element={<Testimonials />} />

        {/* Admin Area */}
        <Route path="/admin/" element={<AdminLogin />} />
        <Route path="/admin/login" element={<AdminLogin />} />
        <Route path="/admin/dashboard" element={<Dashboard />} />
        <Route path="/admin/manage-plans" element={<ManagePlans />} />
        <Route path="/admin/manage-gallery" element={<ManageGallery />} />
        <Route path="/admin/manage-contacts" element={<ManageContacts />} />
        <Route path="/admin/manage-testimonials" element={<ManageTestimonials />} />
        <Route path="/admin/manage-users" element={<ManageUsers />} />
        <Route path="/admin/manage-bookings" element={<ManageBookings />} /> 
        <Route path="/admin/manage-payments" element={<ManagePayments />} /> 

      </Routes>
    </Router>
  );
}

export default App;
