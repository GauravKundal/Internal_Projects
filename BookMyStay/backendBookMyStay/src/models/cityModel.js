import { connectDb } from "../../config/index.js";

//  Add City
export async function createCity(name) {
  const conn = await connectDb();
  const sql = `INSERT INTO cities (city_name) VALUES ('${name}')`;
  const [result] = await conn.query(sql);
  return result;
}

//  Get All Cities
export async function getAllCitiesModel() {
  const conn = await connectDb();
  const sql = `SELECT * FROM cities`;
  const [rows] = await conn.query(sql);
  return rows;
}

//  Delete City by ID
export async function deleteCityModel(id) {
  const conn = await connectDb();
  const sql = `DELETE FROM cities WHERE city_id = ${id}`;
  const [result] = await conn.query(sql);
  return result;
}
