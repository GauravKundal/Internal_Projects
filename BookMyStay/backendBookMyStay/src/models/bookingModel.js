//  bookingsModel.js (merged and cleaned)
import { connectDb } from "../../config/index.js"; 
// Alternate import (if used elsewhere): import { connectDb } from "../index.js";

//  1. Get all bookings
export async function fetchAllBookings() {
  const conn = await connectDb();
  const sql = `
    SELECT b.*, u.name AS user_name, h.name AS hotel_name, r.room_type
    FROM bookings b
    JOIN users u ON b.user_id = u.user_id
    JOIN hotels h ON b.hotel_id = h.hotel_id
    JOIN rooms r ON b.room_id = r.room_id
    ORDER BY b.booking_id DESC
  `;
  const [rows] = await conn.query(sql);
  return rows;
}

//  2. Get bookings by hotel
export async function fetchBookingsByHotel(hotelId) {
  const conn = await connectDb();
  const sql = `
    SELECT b.*, u.name AS user_name, r.room_type
    FROM bookings b
    JOIN users u ON b.user_id = u.user_id
    JOIN rooms r ON b.room_id = r.room_id
    WHERE b.hotel_id = ?
  `;
  const [rows] = await conn.query(sql, [hotelId]);
  return rows;
  // 🔹 Alternative (unsafe) version from second file (for reference only):
  // const [rows] = await conn.query(\`SELECT ... WHERE b.hotel_id = ${hotelId}\`);
}

//  3. Get bookings by user
export async function fetchBookingsByUser(userId) {
  const conn = await connectDb();
  const sql = `
    SELECT b.*, h.name AS hotel_name, r.room_type
    FROM bookings b
    JOIN hotels h ON b.hotel_id = h.hotel_id
    JOIN rooms r ON b.room_id = r.room_id
    WHERE b.user_id = ?
  `;
  const [rows] = await conn.query(sql, [userId]);
  return rows;
  // 🔹 Alternative (unsafe) version from second file (for reference only):
  // const [rows] = await conn.query(\`SELECT ... WHERE b.user_id = ${userId}\`);
}

//  4. Create a new booking
export async function insertBooking({
  user_id,
  hotel_id,
  room_id,
  check_in,
  check_out,
  total_price,
}) {
  const conn = await connectDb();

  if (!user_id || !hotel_id || !room_id) {
    throw new Error("Missing required booking fields (user_id, hotel_id, room_id)");
  }

  const sql = `
    INSERT INTO bookings 
    (user_id, hotel_id, room_id, check_in, check_out, total_price, status)
    VALUES (?, ?, ?, ?, ?, ?, ?)
  `;
  const [result] = await conn.query(sql, [
    user_id,
    hotel_id,
    room_id,
    check_in,
    check_out,
    total_price,
    "confirmed", //  Default status
  ]);
  return result;

  // 🔹 Simpler version from second file (for reference):
  // await conn.query(`INSERT INTO bookings(...) VALUES(${user_id}, ...)`);
}

//  5. Update booking
export async function modifyBooking(bookingId, { check_in, check_out, total_price, status }) {
  const conn = await connectDb();
  const sql = `
    UPDATE bookings
    SET check_in=?, check_out=?, total_price=?, status=?
    WHERE booking_id=?
  `;
  const [result] = await conn.query(sql, [check_in, check_out, total_price, status, bookingId]);
  return result;
  // 🔹 Raw version from second file (reference only):
  // await conn.query(\`UPDATE bookings SET check_in='${check_in}' ...\`);
}

//  6. Delete booking
export async function removeBooking(bookingId) {
  const conn = await connectDb();
  const [rows] = await conn.query(`SELECT room_id FROM bookings WHERE booking_id=?`, [bookingId]);
  if (rows.length === 0) return null;

  const roomId = rows[0].room_id;
  await conn.query(`DELETE FROM bookings WHERE booking_id=?`, [bookingId]);
  await conn.query(`UPDATE rooms SET status='available' WHERE room_id=?`, [roomId]);
  return roomId;
}

//  7. Cancel booking
export async function cancelBookingById(bookingId) {
  const conn = await connectDb();
  const [rows] = await conn.query(`SELECT room_id FROM bookings WHERE booking_id=?`, [bookingId]);
  if (rows.length === 0) return null;

  const roomId = rows[0].room_id;
  await conn.query(`UPDATE bookings SET status='cancelled' WHERE booking_id=?`, [bookingId]);
  await conn.query(`UPDATE rooms SET status='available' WHERE room_id=?`, [roomId]);
  return roomId;
}

//  8. Confirm booking
export async function confirmBookingById(bookingId) {
  const conn = await connectDb();
  const sql = `UPDATE bookings SET status='confirmed' WHERE booking_id=?`;
  const [result] = await conn.query(sql, [bookingId]);
  return result;
}
