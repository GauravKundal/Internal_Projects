import express from "express";
import multer from "multer";
import path from "path";
import fs from "fs";
import {
  addHotel,
  listHotels,
  listHotelsByCity,
  deleteHotel,
  getHotelDetailsById,
} from "../controllers/hotelController.js";
// import { uploadHotelImage } from "../upload.js";
const router = express.Router();

const hotelsDir = path.resolve("public", "uploads", "hotels");
if (!fs.existsSync(hotelsDir)) fs.mkdirSync(hotelsDir, { recursive: true });

const storage = multer.diskStorage({
  destination: (req, file, cb) => cb(null, hotelsDir),
  filename: (req, file, cb) => {
    const ext = path.extname(file.originalname);
    const base = path.basename(file.originalname, ext).replace(/\s+/g, "_");
    cb(null, `${Date.now()}_${base}${ext}`);
  }
});
const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB
  fileFilter: (req, file, cb) => {
    if (!file.mimetype.startsWith("image/")) {
      return cb(new Error("Only images allowed"), false);
    }
    cb(null, true);
  }
});


//  Routes
router.post("/", upload.single("image"), addHotel); // POST /api/hotels
router.get("/", listHotels);                               // Read All
router.get("/city/:cityId", listHotelsByCity);              // Read by city
router.put("/:id", getHotelDetailsById);                               // Update
router.delete("/:hotel_id", deleteHotel);                         // Delete
// router.post("/", uploadHotelImage.single("image"), addHotel);

export default router;
