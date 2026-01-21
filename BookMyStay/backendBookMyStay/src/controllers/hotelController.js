import fs from "fs";
import path from "path";
import {fetchBookingsByHotel} from "../models/bookingModel.js"
import {
  createHotel,
  getAllHotels,
  getHotelsByCity,
  deleteHotelModel,
  updateHotel,
  getHotelById, //  Added from second version
} from "../models/hotelModule.js";
import { connectDb } from "../../config/index.js"; //
import { getBookingsByHotel } from "./bookingController.js";

//  Helper: Convert stored image path -> actual disk path
const uploadsDir = path.resolve("uploads", "hotels");
function diskPathFromImagePath(imagePath) {
  if (!imagePath) return null;
  // Example: "/uploads/hotels/abc.jpg"
  const parts = imagePath.split("/").filter(Boolean);
  const filename = parts[parts.length - 1];
  return filename ? path.join(uploadsDir, filename) : null;
}

//  Helper: Remove image file if it exists
async function removeFileIfExists(imagePath) {
  try {
    const p = diskPathFromImagePath(imagePath);
    if (!p) return;
    if (fs.existsSync(p)) {
      await fs.promises.unlink(p);
      console.log("Removed file:", p);
    }
  } catch (err) {
    console.error("Error removing file:", err);
  }
}

//  CREATE Hotel (supports image upload)
export async function addHotel(req, res) {
  try {
    const pool = await connectDb();
    const { hotel_id, city_id, name, address, description } = req.body;
    const file = req.file; // multer file (optional)
    const imagePath = file ? `/uploads/hotels/${file.filename}` : null;

    if (!city_id || !name) {

      return res.status(400).json({ message: "city_id and name are required" });
    }

    if (hotel_id == 0 ) {
      const sql = `INSERT INTO hotels (city_id, name, address, description, image_url)
                 VALUES (${city_id},'${name}','${address}','${description}','${imagePath}')`;
      const [result]=await pool.execute(sql);

      res.status(201).json({
        message: "Hotel added successfully",
        hotel_id: result.insertId,
        image_path: imagePath,
      });
    }
    else{
       const sql = `update hotels set city_id=${city_id}, name='${name}', address='${address}',description='${description}', image_url='${imagePath}' where hotel_id=${hotel_id}`;
                
      const [result]=await pool.execute(sql);

      res.status(201).json({
        message: "Hotel Updeted successfully",
        hotel_id: result.insertId,
        image_path: imagePath,
      });
    }
  } catch (err) {
    console.error("addHotel error:", err);
    res.status(500).json({ message: "Server error adding hotel" });
  }
}

//  READ - Get all hotels
export async function listHotels(req, res) {
  try {
    const hotels = await getAllHotels();
    res.status(200).json(hotels);
  } catch (err) {
    console.error("listHotels error:", err);
    res.status(500).json({ message: "Server error fetching hotels" });
  }
}

//  READ - Get hotels by city
export async function listHotelsByCity(req, res) {
  try {
    const { cityId } = req.params;
    const hotels = await getHotelsByCity(cityId);
    res.status(200).json(hotels);
  } catch (err) {
    console.error("listHotelsByCity error:", err);
    res.status(500).json({ message: "Server error fetching hotels by city" });
  }
}

//  UPDATE Hotel (supports optional image replacement)

export async function getHotelDetailsById(req, res){
   const { id } = req.params;
  return await getHotelById(id);
}
// export async function editHotel(req, res) {
//   try {
//     const { id } = req.params;
//     const { name, address, description } = req.body;
//     const file = req.file; // multer file if new image uploaded

//     // get current hotel info
//     const existing = await getHotelById(id);
//     if (!existing) {
//       return res.status(404).json({ message: "Hotel not found" });
//     }

//     // set new or old image path
//     let newImagePath = existing.image_url;
//     if (file) {
//       newImagePath = `/uploads/hotels/${file.filename}`;
//       // remove old image if exists
//       if (existing.image_url) {
//         await removeFileIfExists(existing.image_url);
//       }
//     }

//     // update record
//     const result = await updateHotel(id, {
//       name,
//       address,
//       description,
//       image_url: newImagePath,
//     });

//     if (result.affectedRows === 0) {
//       return res.status(404).json({ message: "Hotel not found / not updated" });
//     }

//     res.json({ message: "Hotel updated successfully", image_path: newImagePath });
//   } catch (err) {
//     console.error("editHotel error:", err);
//     res.status(500).json({ message: "Server error updating hotel" });
//   }
// }

//  DELETE Hotel (removes DB record and image file)
export async function deleteHotel(req, res) {
  try {
    const { hotel_id } = req.params;

    // fetch existing record
    const hotel = await getHotelById(hotel_id);
    if (!hotel) {
      return res.status(404).json({ message: "Hotel not found" });
    }

    // check any booking 
    const bookings=await fetchBookingsByHotel(hotel_id);
    if(bookings.length > 0 && bookings.filter(b => b.status=='confirmed').length > 0){
      return res.status(409).json({
        code:"BOOKING_ALREADY_EXISTS",
        message:"Can not delete hotel"
      })
    }  
    // delete from DB
    const result = await deleteHotelModel(hotel_id);

    // remove file from uploads folder if exists
    if (hotel.image_url) {
      await removeFileIfExists(hotel.image_url);
    }

    res.json({ message: "Hotel deleted successfully", result });
  } catch (error) {
    console.error("deleteHotel error:", error);
    res.status(500).json({ message: "Error deleting hotel" });
  }
}
