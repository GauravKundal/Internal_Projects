import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { connectDb } from "../../config/index.js";
import { jwtConfig } from "../middleware/auth.js";
import { fetchBookingsByUser } from "../models/bookingModel.js";

const { hashSync, compareSync } = bcrypt;
const { JWT_SECRET, JWT_EXPIRES_IN } = jwtConfig;

//  Simple Regex patterns
const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const passwordRegex = /^(?=.*[0-9]{4,})(?=.*[!@#$%^&*]).{5,}$/;

//  REGISTER USER
export async function registerUser(req, res) {
  try {
    const conn = await connectDb();
    const { name, email, password, phone, role } = req.body;

    if (!name || !email || !password)
      return res.status(400).json({ message: "Missing required fields" });

    // Validate email & password with regex
    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (!passwordRegex.test(password))
      return res
        .status(400)
        .json({ message: "Password must have 4 numbers & 1 special character" });

    // Hash password
    const hashed = hashSync(password, 10);

    // Insert user
    const qry = `INSERT INTO users (name, email, password, phone, role)
                 VALUES (?, ?, ?, ?, ?)`;
    const [result] = await conn.execute(qry, [
      name,
      email,
      hashed,
      phone || null,
      role || "user",
    ]);

    return res.status(201).json({
      message: "User registered successfully",
      userId: result.insertId,
    });
  } catch (err) {
    console.error("❌ Register Error:", err);
    if (err.code === "ER_DUP_ENTRY")
      return res.status(409).json({ message: "Email already registered" });
    return res.status(500).json({ message: "Something went wrong" });
  }
}

//  LOGIN USER
export async function loginUser(req, res) {
  try {
    const conn = await connectDb();
    const { email, password } = req.body;

    // Validate input
    if (!email || !password)
      return res.status(400).json({ message: "Email and password required" });

    if (!emailRegex.test(email))
      return res.status(400).json({ message: "Invalid email format" });

    if (!passwordRegex.test(password))
      return res
        .status(400)
        .json({ message: "Password must have 4 numbers & 1 special character" });

    // Find user
    const [rows] = await conn.execute(
      "SELECT * FROM users WHERE email = ? LIMIT 1",
      [email]
    );

    if (rows.length === 0) {
      return res
        .status(404)
        .json({ message: "User not found. Please register first." });
    }

    const user = rows[0];

    // Compare passwords
    const isPasswordValid = compareSync(password, user.password);
    if (!isPasswordValid) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    // Create token
    const payload = { id: user.user_id, email: user.email, role: user.role };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: JWT_EXPIRES_IN });

    console.log(" Token generated:", token);

    return res.status(200).json({
      message: "Login successful!",
      token,
      role: user.role,
      expiresIn: JWT_EXPIRES_IN,
    });
  } catch (err) {
    console.error("❌ Login Error:", err);
    return res.status(500).json({ message: "Server error" });
  }
}

//  GET ALL USERS (Admin only)
export async function getAllUsers(req, res) {
  try {
    const conn = await connectDb();
    const [rows] = await conn.execute(
      "SELECT user_id, name, email, phone, role FROM users"
    );
    return res.json(rows);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

//  GET USER BY ID
export async function getUserById(req, res) {
  try {
    const requestedId = Number(req.params.id);
    const loggedInUser = req.user;

    if (loggedInUser.role !== "admin" && loggedInUser.id !== requestedId) {
      return res
        .status(403)
        .json({ message: "Access denied: You can only view your own profile." });
    }

    const conn = await connectDb();
    const [rows] = await conn.execute(
      "SELECT user_id, name, email, phone, role FROM users WHERE user_id = ?",
      [req.params.id]
    );

    if (rows.length === 0)
      return res.status(404).json({ message: "User not found" });

    return res.json(rows[0]);
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

//  UPDATE USER
export async function updateUser(req, res) {
  try {
    const conn = await connectDb();
    const { name, email, phone, role } = req.body;
    const { id } = req.params;

    if (req.user.role !== "admin" && req.user.id !== Number(id))
      return res.status(403).json({ message: "Forbidden" });

    const [result] = await conn.execute(
      "UPDATE users SET name=?, email=?, phone=?, role=? WHERE user_id=?",
      [name, email, phone, role, id]
    );

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    return res.json({ message: "User updated successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}

//  DELETE USER (Admin only)
export async function deleteUser(req, res) {
  try {
    const conn = await connectDb();
    const { id } = req.params;
    const bookings= await fetchBookingsByUser(id);
      if(bookings.length > 0 && bookings.filter(b => b.status=='confirmed').length > 0){
      return res.status(409).json({
        code:"BOOKING_ALREADY_EXISTS",
        message:"Can not delete hotel"
      })
    }  
    const [result] = await conn.execute("DELETE FROM users WHERE user_id=?", [
      id,
    ]);

    if (result.affectedRows === 0)
      return res.status(404).json({ message: "User not found" });

    return res.json({ message: "User deleted successfully" });
  } catch (err) {
    console.error(err);
    return res.status(500).json({ message: "Server error" });
  }
}
