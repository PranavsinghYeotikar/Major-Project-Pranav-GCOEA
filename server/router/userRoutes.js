import express from "express";
import {
  registerUser,
  login,
  logout,
  getUser,
  forgotPassword,
  resetPassword,
} from "../controllers/authController.js";

import { isAuthenticated } from "../middleware/authMiddleware.js";

const router = express.Router();

/* ================= AUTH ROUTES ================= */

// Register
router.post("/register", registerUser);

// Login
router.post("/login", login);

// Get current logged in user
router.get("/me", isAuthenticated, getUser);

// Logout
router.get("/logout", isAuthenticated, logout);

/* ================= PASSWORD RESET ================= */

// Send reset password email
router.post("/password/forgot", forgotPassword);

// Reset password using token
router.put("/password/reset/:token", resetPassword);

export default router;