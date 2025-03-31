const express = require("express");
const path = require("path");
const { registerUser, loginUser } = require("../routes/authController"); // Fixed incorrect import path
const validateToken = require("../middleware/validateToken"); 
const authorizeRoles = require("../middleware/authorizeRoles");

const router = express.Router();

// ✅ Serve Login Page 
router.get("/login", (req, res) => {
  res.sendFile(path.join(__dirname, "../public/login.html"));
});

// ✅ User Registration Route (Public)
router.post("/register", async (req, res) => {
  try {
    await registerUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ User Login Route (Public)
router.post("/login", async (req, res) => {
  try {
    await loginUser(req, res);
  } catch (error) {
    res.status(500).json({ message: "Internal Server Error", error: error.message });
  }
});

// ✅ Protected Route: User Dashboard (Authenticated Users Only)
router.get("/dashboard", validateToken, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, user ID: ${req.user.id}!`,
    email: req.user.email,
  });
});

// ✅ Admin-Only Route (Only accessible by Admins)
router.get("/admin", validateToken, authorizeRoles("admin"), (req, res) => {
  res.json({ message: "Welcome, Admin! You have access to this route." });
});

module.exports = router;
