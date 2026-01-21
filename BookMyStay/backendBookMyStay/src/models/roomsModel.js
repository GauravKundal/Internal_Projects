import { connectDb } from "../../config/index.js";

/**
 *  CREATE Room
 */
export async function createRoom({ hotel_id, room_type, price, status }) {
  const conn = await connectDb();
  const sql = `
    INSERT INTO rooms (hotel_id, room_type, price, status)
    VALUES (?, ?, ?, ?)
  `;
  const params = [
    Number(hotel_id),
    room_type,
    price !== undefined && price !== null ? Number(price) : 0,
    status || "available"
  ];
  const [result] = await conn.execute(sql, params);
  return result;
}

/**
 *  READ - All Rooms (with hotel name)
 */
export async function getAllRooms() {
  const conn = await connectDb();
  const sql = `
    SELECT r.room_id, r.hotel_id, r.room_type, r.price, r.status,
           h.name AS hotel_name
    FROM rooms r
    LEFT JOIN hotels h ON r.hotel_id = h.hotel_id
    ORDER BY r.created_at DESC
  `;
  const [rows] = await conn.query(sql);
  return rows;
}

/**
 *  READ - Rooms by hotel
 */
export async function getRoomsByHotel(hotel_id) {
  const conn = await connectDb();
  const sql = `
    SELECT room_id, hotel_id, room_type, price, status
    FROM rooms
    WHERE hotel_id = ?
    ORDER BY created_at DESC
  `;
  const [rows] = await conn.execute(sql, [Number(hotel_id)]);
  return rows;
}

/**
 *  DELETE Room
 */
export async function deleteRoom(id) {
  const conn = await connectDb();
  const sql = `DELETE FROM rooms WHERE room_id = ?`;
  const [result] = await conn.execute(sql, [Number(id)]);
  return result;
}
