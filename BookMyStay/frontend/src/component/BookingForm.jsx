import React, { useState } from "react";
import axios from "axios";
import { useLocation, useNavigate } from "react-router-dom";
import { Container, Form, Button, Card } from "react-bootstrap";
import NavigationBar from "../component/Navbar";
import { jwtDecode } from "jwt-decode";

const BookingForm = () => {
  const { state } = useLocation();
  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const decoded = token ? jwtDecode(token) : null;
  const userId = decoded?.id;

  const { hotelId, roomId, hotelName, roomType, price } = state || {};

  // ✅ Default today’s date in YYYY-MM-DD format
  const today = new Date().toISOString().split("T")[0];

  const [form, setForm] = useState({
    check_in: "",
    check_out: "",
    total_price: price || "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
  };

  const handleSubmit = async (e) => {debugger
    e.preventDefault();

    const { check_in, check_out } = form;

    // ✅ Validate check-in >= today
    if (new Date(check_in) < new Date(today)) {
      alert("❌ Check-in date cannot be in the past!");
      return;
    }

    // ✅ Validate check-out > check-in
    if (new Date(check_out) <= new Date(check_in)) {
      alert("❌ Check-out date must be after the check-in date!");
      return;
    }

    if (!hotelId || !roomId) {
      alert("❌ Missing hotel or room information!");
      return;
    }

    try {
      const bookingData = {
        user_id: userId,
        hotel_id: hotelId,
        room_id: roomId,
        check_in,
        check_out,
        total_price: form.total_price,
      };

      console.log("Booking Data:", bookingData);

      await axios.post("http://localhost:2323/api/bookings", bookingData);
      alert("✅ Booking successful!");
      navigate("/my-bookings");
    } catch (error) {
      console.error("Booking error:", error);
      alert("❌ Booking failed!");
    }
  };

  return (
    <>
      <Container className="my-5 pt-5 d-flex justify-content-center">
        <Card className="p-4 shadow-lg booking-card" style={{ width: "32rem" }}>
          <h3 className="text-center mb-4 text-primary">Book Your Room</h3>

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label>Room Type</Form.Label>
              <Form.Control type="text" value={roomType || ""} readOnly />
            </Form.Group>

            {/* ✅ Check-in Date */}
            <Form.Group className="mb-3">
              <Form.Label>Check-in Date</Form.Label>
              <Form.Control
                type="date"
                name="check_in"
                value={form.check_in}
                onChange={handleChange}
                required
                min={today} // disables past dates
              />
            </Form.Group>

            {/* ✅ Check-out Date */}
            <Form.Group className="mb-3">
              <Form.Label>Check-out Date</Form.Label>
              <Form.Control
                type="date"
                name="check_out"
                value={form.check_out}
                onChange={handleChange}
                required
                min={
                  form.check_in
                    ? new Date(new Date(form.check_in).getTime() + 86400000)
                        .toISOString()
                        .split("T")[0]
                    : today
                } // disables checkout before checkin
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label>Total Price (₹)</Form.Label>
              <Form.Control
                type="number"
                name="total_price"
                value={form.total_price}
                onChange={handleChange}
                required
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100 rounded-pill">
              Confirm Booking
            </Button>
          </Form>
        </Card>
      </Container>
    </>
  );
};

export default BookingForm;
