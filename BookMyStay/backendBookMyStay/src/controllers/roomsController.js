import {
  createRoom,
  getAllRooms,
  getRoomsByHotel,
  deleteRoom
} from "../models/roomsModel.js";

//  POST /api/rooms
export async function addRoom(req, res) {
  try {
    const { hotel_id, room_type, price, status } = req.body;

    if (!hotel_id || !room_type) {
      return res.status(400).json({ message: "hotel_id and room_type are required" });
    }

    const result = await createRoom({ hotel_id, room_type, price, status });

    res.status(201).json({ message: "Room added successfully", room_id: result.insertId });
  } catch (err) {
    console.error("addRoom error:", err);
    res.status(500).json({ message: "Server error adding room" });
  }
}

//  GET /api/rooms
export async function listRooms(req, res) {
  try {
    const rooms = await getAllRooms();
    res.status(200).json(rooms);
  } catch (err) {
    console.error("listRooms error:", err);
    res.status(500).json({ message: "Server error fetching rooms" });
  }
}

//  GET /api/rooms/hotels/:hotel_id
export async function listRoomsByHotel(req, res) {
  try {
    const { hotel_id } = req.params;
    const rooms = await getRoomsByHotel(hotel_id);
    res.status(200).json(rooms);
  } catch (err) {
    console.error("listRoomsByHotel error:", err);
    res.status(500).json({ message: "Server error fetching rooms by hotel" });
  }
}

//  DELETE /api/rooms/:id
export async function removeRoom(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteRoom(id);
    if (result.affectedRows === 0)
      return res.status(404).json({ message: "Room not found" });
    res.json({ message: "Room deleted successfully" });
  } catch (err) {
    console.error("removeRoom error:", err);
    res.status(500).json({ message: "Server error deleting room" });
  }
}
