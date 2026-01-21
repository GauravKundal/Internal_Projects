import express from "express";
import {
  registerUser,
  loginUser,
  updateUser,
  getAllUsers,
  getUserById,
  deleteUser,
} from "../controllers/userController.js";

import { authenticate, authorizeRoles } from "../middleware/auth.js";

const router = express.Router();

// 🔹 Public routes
router.post("/register", registerUser);
router.post("/login", loginUser);

// 🔹 Protected routes
router.get("/", authenticate, authorizeRoles("admin"), getAllUsers);
router.get("/:id", authenticate, getUserById);
router.put("/update/:id", authenticate, updateUser);
router.delete("/delete/:id", authenticate, authorizeRoles("admin"), deleteUser);

export default router;
