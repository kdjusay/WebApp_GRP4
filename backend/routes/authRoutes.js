const express = require("express");
const { registerUser, loginUser } = require("../routes/authController"); 
const validateToken = require("../middleware/validateToken"); // Token validation middleware
const authorizeRoles = require("../middleware/authorizeRoles"); // Role-based access control middleware

const router = express.Router();

// ✅ User Registration Route (Public)
router.post("/register", registerUser);

// ✅ User Login Route (Public)
router.post("/login", loginUser);

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
