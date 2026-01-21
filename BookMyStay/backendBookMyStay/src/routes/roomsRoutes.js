import express from "express";
import {
  addRoom,
  listRooms,
  listRoomsByHotel,
  removeRoom
} from "../controllers/roomsController.js";

const router = express.Router();

// Routes
router.post("/", addRoom);
router.get("/", listRooms);
router.get("/hotels/:hotel_id", listRoomsByHotel);
router.delete("/:id", removeRoom);

export default router;
