import express from "express";
import {
  getAllBookings,
  getBookingsByHotel,
  getBookingsByUser,
  bookRoom,
  updateBooking,
  deleteBooking,
  cancelBooking,
  confirmBooking
} from "../controllers/bookingController.js";

const router = express.Router();

//  Routes
router.get("/", getAllBookings);  //working
router.get("/hotel/:hotel_id", getBookingsByHotel); //working
router.get("/user/:user_id", getBookingsByUser); //working
router.post("/", bookRoom);   //working 
router.put("/:booking_id", updateBooking); 
router.delete("/:booking_id", deleteBooking);  // working
router.put("/:booking_id/cancel", cancelBooking);  //working
router.put("/:booking_id/confirm", confirmBooking);  //working

export default router;
