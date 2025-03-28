const express = require("express");
const authMiddleware = require("../middleware/authMiddleware"); 

const router = express.Router();

// ✅ Protected Dashboard Route
router.get("/dashboard", authMiddleware, (req, res) => {
    res.json({
        message: "Welcome to your dashboard!",
        user: req.user, // The authenticated user info from the token
    });
});

module.exports = router;
