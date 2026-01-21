import {
  fetchAllBookings,
  fetchBookingsByHotel,
  fetchBookingsByUser,
  insertBooking,
  modifyBooking,
  removeBooking,
  cancelBookingById,
  confirmBookingById
} from "../models/bookingModel.js";

//  GET all bookings
export async function getAllBookings(req, res) {
  try {
    const data = await fetchAllBookings();
    res.status(200).json(data);
  } catch (err) {
    console.error("getAllBookings error:", err);
    res.status(500).json({ message: "Server error fetching bookings" });
  }
}

//  GET bookings by hotel
export async function getBookingsByHotel(req, res) {
  try {
    const { hotel_id } = req.params;
    const data = await fetchBookingsByHotel(hotel_id);
    res.status(200).json(data);
  } catch (err) {
    console.error("getBookingsByHotel error:", err);
    res.status(500).json({ message: "Server error fetching bookings by hotel" });
  }
}

//  GET bookings by user
export async function getBookingsByUser(req, res) {
  try {
    const { user_id } = req.params;
    const data = await fetchBookingsByUser(user_id);
    res.status(200).json(data);
  } catch (err) {
    console.error("getBookingsByUser error:", err);
    res.status(500).json({ message: "Server error fetching bookings by user" });
  }
}

//  POST - book a room
export async function bookRoom(req, res) {
  try {
    const { user_id, hotel_id, room_id, check_in, check_out, total_price } = req.body;
    const result = await insertBooking({ user_id, hotel_id, room_id, check_in, check_out, total_price });
    res.status(201).json({ message: "Booking successful", booking_id: result.insertId });
  } catch (err) {
    console.error("bookRoom error:", err);
    res.status(500).json({ message: "Server error booking room" });
  }
}

//  PUT - update booking
export async function updateBooking(req, res) {
  try {
    const { booking_id } = req.params;
    const result = await modifyBooking(booking_id, req.body);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking updated successfully" });
  } catch (err) {
    console.error("updateBooking error:", err);
    res.status(500).json({ message: "Server error updating booking" });
  }
}

//  DELETE - delete booking
export async function deleteBooking(req, res) {
  try {
    const { booking_id } = req.params;
    const result = await removeBooking(booking_id);
    if (!result) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking deleted and room released" });
  } catch (err) {
    console.error("deleteBooking error:", err);
    res.status(500).json({ message: "Server error deleting booking" });
  }
}

//  PUT - cancel booking
export async function cancelBooking(req, res) {
  try {
    const { booking_id } = req.params;
    const result = await cancelBookingById(booking_id);
    if (!result) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking cancelled" });
  } catch (err) {
    console.error("cancelBooking error:", err);
    res.status(500).json({ message: "Server error cancelling booking" });
  }
}

//  PUT - confirm booking
export async function confirmBooking(req, res) {
  try {
    const { booking_id } = req.params;
    const result = await confirmBookingById(booking_id);
    if (result.affectedRows === 0) return res.status(404).json({ message: "Booking not found" });
    res.json({ message: "Booking confirmed" });
  } catch (err) {
    console.error("confirmBooking error:", err);
    res.status(500).json({ message: "Server error confirming booking" });
  }
}
