import express from "express";
import {
  getAllCities,
  addCity,
  deleteCity,
} from "../controllers/cityController.js";

const router = express.Router();

router.get("/", getAllCities);     //  Read all
router.post("/", addCity);         //  Create
router.delete("/:id", deleteCity); //  Delete

export default router;
