import {
  createCity,
  getAllCitiesModel,
  deleteCityModel,
} from "../models/cityModel.js";

//  Get all cities
export async function getAllCities(req, res) {
  try {
    const rows = await getAllCitiesModel();
    res.status(200).json(rows);
  } catch (error) {
    console.error("Error fetching cities:", error);
    res.status(500).json({ message: "Error fetching cities" });
  }
}

//  Add new city
export async function addCity(req, res) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "City name is required" });

    const result = await createCity(name);
    res.status(201).json({ message: "City added successfully", result });
  } catch (error) {
    console.error("Error in addCity:", error);
    res.status(500).json({ message: "Server error" });
  }
}

//  Delete city by ID
export async function deleteCity(req, res) {
  try {
    const { id } = req.params;
    const result = await deleteCityModel(id);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "City not found" });

    res.status(200).json({ message: "City deleted successfully" });
  } catch (error) {
    console.error("Error deleting city:", error);
    res.status(500).json({ message: "Server error" });
  }
}
