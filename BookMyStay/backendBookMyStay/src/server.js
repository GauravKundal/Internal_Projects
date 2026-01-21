// src/server.js
import "dotenv/config";
import express from "express";
import cors from "cors";
import path from "path";

import cityRoutes from "./routes/cityRoutes.js";
import hotelRoutes from "./routes/hotelRoutes.js";
import roomsRoutes from "./routes/roomsRoutes.js";
import bookingRoutes from "./routes/bookingRoutes.js";
import userRoutes from "./routes/userRoutes.js";
import { fileURLToPath } from "url";

// import { connectDb } from "./index.js";

const app = express();
const __filename=fileURLToPath(import.meta.url);
const __dirname=path.dirname(__filename);

const allowedOrigins = ["http://localhost:5173", "http://localhost:5174"];

// Debug middleware
app.use((req, res, next) => {
  const origin = req.headers.origin || "";
  console.log("[CORS-MW] incoming origin:", origin, "url:", req.url);

  if (!origin) {
    res.setHeader("Access-Control-Allow-Origin", "*");
  } else if (allowedOrigins.includes(origin)) {
    res.setHeader("Access-Control-Allow-Origin", origin); // echo exact origin
    res.setHeader("Access-Control-Allow-Credentials", "true");
    res.setHeader("Vary", "Origin");
  } else {
    // do not set Allow-Origin header (browser will block)
    console.log("[CORS-MW] origin NOT allowed:", origin);
  }

  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,DELETE,OPTIONS");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type,Authorization,X-Requested-With");

  if (req.method === "OPTIONS") return res.status(204).end();
  next();
});

const corsOptions = {
  origin: (origin, callback) => {
    if (!origin) return callback(null, true);
    if (allowedOrigins.includes(origin)) return callback(null, origin);
    return callback(new Error("CORS error: Origin not allowed"), false);
  },
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization", "X-Requested-With"],
  credentials: true,
  optionsSuccessStatus: 204
};

// Use CORS middleware
app.use(cors(corsOptions));

// **Fix**: use "/*" instead of "*" to avoid path-to-regexp error
// app.options("/*", cors(corsOptions));

// Body parser
app.use(express.json());

// Connect Database
// connectDb()
//   .then(() => console.log("DB connected (server.js)"))
//   .catch(err => {
//     console.error("DB connect failed:", err);
//     process.exit(1);
//   });

// Root route
app.get("/", (req, res) => res.send("Backend Working"));

// API routes
app.use("/api/cities", cityRoutes);
app.use("/api/hotels", hotelRoutes);
app.use("/api/rooms", roomsRoutes);
app.use("/api/bookings", bookingRoutes);
app.use("/api/users", userRoutes);
app.use("/uploads", express.static(path.join(__dirname, "../public/uploads")));

const PORT = process.env.PORT || 2323;

// Print registered routes (debug)
try {
  app._router.stack.forEach(r => {
    if (r.route && r.route.path) console.log("Route:", r.route.path);
  });
} catch (e) {
  console.warn("Could not list routes:", e);
}

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
