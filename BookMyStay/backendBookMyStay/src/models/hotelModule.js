import { api } from "../../../frontend/src/api.js";
import { connectDb } from "../../config/index.js";
import axios from "axios";



//  CREATE Hotel
export async function createHotel({ city_id, name, address, description }) {
  const conn = await connectDb();
  const sql = `
    INSERT INTO hotels (city_id, name, address, description)
    VALUES (${city_id}, '${name}', '${address || ""}', '${description || ""}')
  `;
  const [result] = await conn.query(sql);
  return result;
}

//  READ - Get all hotels
export async function getAllHotels() {
  const conn = await connectDb();
  const sql = `
    SELECT h.hotel_id, h.name, h.address, h.description, c.city_name,h.image_url
    FROM hotels h
    JOIN cities c ON h.city_id = c.city_id
    ORDER BY h.hotel_id DESC
  `;
  const [rows] = await conn.query(sql);
  return rows;
}

//  READ - Get hotels by city
export async function getHotelsByCity(cityId) {
  const conn = await connectDb();
  const sql = `
    SELECT h.hotel_id, h.name, h.address, h.description, c.city_name,h.image_url
    FROM hotels h
    JOIN cities c ON h.city_id = c.city_id
    WHERE h.city_id = ${cityId}
    ORDER BY h.hotel_id DESC
  `;
  const [rows] = await conn.query(sql);
  return rows;
}

//  UPDATE Hotel
export async function updateHotel(id, data) {
  const conn = await connectDb();
  const { name, address, description } = data;
  const sql = `
    UPDATE hotels 
    SET name = '${name}', 
        address = '${address}', 
        description = '${description}'
    WHERE hotel_id = ${id}
  `;
  const [result] = await conn.query(sql);
  return result;
}

//  DELETE Hotel
export async function deleteHotelModel(id) {
  const conn = await connectDb();
  const sql = `DELETE FROM hotels WHERE hotel_id = ${id}`;
  const [result] = await conn.query(sql);
  return result;
}


export async function uploadHotel(formDataObj, file) {
  const fd = new FormData();
  fd.append("name", formDataObj.name || "");
  fd.append("city_id", formDataObj.city_id || "");
  fd.append("address", formDataObj.address || "");
  fd.append("description", formDataObj.description || "");
  if (file) fd.append("image", file); // name MUST be "image"

  // DON'T set Content-Type manually; Axios will do it
  const res = await axios.post(`/hotels`, fd, {
    withCredentials: true, // if using cookie auth; else remove
    // headers: { Authorization: `Bearer ${token}` } // if using JWT
  });

  return res.data;
}

export async function getHotelById(id) {
  const pool = await connectDb();
  const [rows] = await pool.execute("SELECT * FROM hotels WHERE hotel_id = ?", [id]);
  return rows[0] || null;
}