const express = require("express");
const { registerUser, loginUser } = require("../routes/authController"); // Use authController functions
const authenticateUser = require("../middleware/authMiddleware"); // Import authentication middleware

const router = express.Router();

// ✅ User Registration Route
router.post("/register", registerUser);

// ✅ User Login Route
router.post("/login", loginUser);

// ✅ Protected Route: Dashboard
router.get("/dashboard", authenticateUser, (req, res) => {
  res.json({
    message: `Welcome to your dashboard, user ID: ${req.user.id}!`,
    email: req.user.email,
  });
});

module.exports = router;
