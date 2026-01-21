import React, { useEffect, useState } from "react";
import axios from "axios";
import { Button, Table, Container, Spinner } from "react-bootstrap";
import { jwtDecode } from "jwt-decode";
import { getRole } from "../services/AuthService";
const MyBookings = () => {
  const [bookings, setBookings] = useState([]);
  const [loading, setLoading] = useState(true);
  // const [role,setRole]=useState(null);

  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  let userId = null;

  if (token) {
    try {
      const decoded = jwtDecode(token);
      userId =
        decoded?.id || decoded?.user_id || decoded?.user?.id || decoded?.data?.id;
    } catch (error) {
      console.error("Error decoding token:", error);
    }
  }

  // ✅ Fetch user bookings
  const fetchBookings = async () => {
    if (!userId) {
      console.warn("User ID not found!");
      setLoading(false);
      return;
    }
    try {
      let response=[];
      if(role==='admin' )
      {
        response= await axios.get(
        `http://localhost:2323/api/bookings`
      );

      }
      else{
         response = await axios.get(
        `http://localhost:2323/api/bookings/user/${userId}`
      );
      }
     
      setBookings(response.data || []);
    } catch (error) {
      console.error("Error fetching bookings:", error);
    } finally {
      setLoading(false);
    }
  };

  // ✅ Cancel booking
  const handleCancel = async (bookingId) => {
    if (!window.confirm("Are you sure you want to cancel this booking?")) return;
    try {
      await axios.put(`http://localhost:2323/api/bookings/${bookingId}/cancel`);
      alert("Booking cancelled successfully!");
      fetchBookings();
    } catch (error) {
      console.error("Error cancelling booking:", error);
      alert("Failed to cancel booking.");
    }
  };

  useEffect(() => {
    // setRole(getRole());
    fetchBookings();
  }, []);

  return (
    <Container className="mt-5">
      <h2 className="text-center mb-4">My Bookings</h2>

      {loading ? (
        <div className="text-center">
          <Spinner animation="border" variant="primary" />
        </div>
      ) : bookings.length === 0 ? (
        <p className="text-center text-muted">No bookings found.</p>
      ) : (
        <Table striped bordered hover responsive>
          <thead className="table-primary">
            <tr>
              <th>#</th>
              <th>Hotel</th>
              <th>Room Type</th>
              <th>Check-In</th>
              <th>Check-Out</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {bookings.map((booking, index) => (
              <tr key={booking.booking_id}>
                <td>{index + 1}</td>
                <td>{booking.hotel_name || "N/A"}</td>
                <td>{booking.room_type || "N/A"}</td>
                <td>{booking.check_in ? booking.check_in.split("T")[0] : "N/A"}</td>
                <td>{booking.check_out ? booking.check_out.split("T")[0] : "N/A"}</td>
                <td
                  style={{
                    color:
                      booking.status === "confirmed"
                        ? "green"
                        : booking.status === "cancelled"
                        ? "red"
                        : "orange",
                    fontWeight: "bold",
                    textTransform: "capitalize",
                  }}
                >
                  {booking.status || "N/A"}
                </td>
                <td className="text-center">
                  {booking.status === "confirmed" ? (
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleCancel(booking.booking_id)}
                    >
                      Cancel
                    </Button>
                  ) : (
                    <span className="text-muted">-</span>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </Container>
  );
};

export default MyBookings;
