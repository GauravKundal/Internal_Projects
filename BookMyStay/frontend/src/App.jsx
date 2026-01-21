import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
  useLocation,
} from "react-router-dom";
import React from "react";
import useAuth from "./hooks/useAuth";

import NavigationBar from "./component/Navbar";
import Home from "./component/Home";
import Footer from "./component/Footer";
import Login from "./component/Login";
import Register from "./component/Register";
import Hotels from "./component/Hotels";
import Rooms from "./component/Rooms";
import Booking from "./component/BookingForm";
import AboutUs from "./component/AboutUs";
import ContactUs from "./component/ContactUs";
import MyBookings from "./component/MyBookings";
import RoomMaster from "./Master/Rooms";
import CityMaster from "./Master/Cities";
import UserMaster from "./Master/Users";
import HotelMaster from "./Master/Hotels";
import { ToastContainer } from "react-toastify";

function AppContent() {
  const auth = useAuth();
  const token = localStorage.getItem("token");
  const location = useLocation();

  const hideLayout =
    location.pathname === "/login" || location.pathname === "/register";

  return (
    <>
    <ToastContainer />
      {!hideLayout && token && <NavigationBar />}

      <div style={{ marginTop: !hideLayout && token ? "90px" : "0px" }}>
        <Routes>
          <Route
            path="/"
            element={token ? <Navigate to="/home" /> : <Navigate to="/login" />}
          />

          {/* Public Routes */}
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />

          <Route path="/about" element={<AboutUs />} />
          <Route path="/contact" element={<ContactUs />} />
          <Route path="/my-bookings" element={<MyBookings />} />

          {/* Protected Routes */}
          <Route
            path="/home"
            element={token ? <Home /> : <Navigate to="/login" />}
          />
          <Route
            path="/hotels"
            element={token ? <Hotels /> : <Navigate to="/login" />}
          />
          <Route
            path="/rooms/:hotelId"
            element={token ? <Rooms /> : <Navigate to="/login" />}
          />

          {/* ✅ NEW Booking Route */}
          <Route
            path="/book/:hotelId/:roomId"
            element={token ? <Booking /> : <Navigate to="/login" />}
          />

          <Route
            path="/experiences"
            element={
              token ? (
                <div className="text-center mt-5">
                  Experiences Page Coming Soon...
                </div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
          <Route
            path="/about"
            element={
              token ? (
                <div className="text-center mt-5">About Page Coming Soon...</div>
              ) : (
                <Navigate to="/login" />
              )
            }
          />
        
        <Route 
          path="/master/rooms"
          element={
            token 
              ? <RoomMaster /> 
              : <Navigate to="/home" />
            }
        />
        <Route 
          path="/master/users"
          element={
            token 
              ? <UserMaster auth={auth}/> 
              : <Navigate to="/home" />
            }
        />
        <Route 
          path="/master/cities"
          element={
            token 
              ? <CityMaster /> 
              : <Navigate to="/home" />
            }
        />
        <Route 
          path="/master/hotels"
          element={
            token 
              ? <HotelMaster /> 
              : <Navigate to="/home" />
            }
        />
        </Routes>
      </div>

      {!hideLayout && token && <Footer />}
    </>
  );
}

export default function App() {
  return (
    <Router>
      <AppContent />
    </Router>
  );
}
