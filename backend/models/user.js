const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String }, // Allow null for Google OAuth users
  googleId: { type: String, default: null }, 
  role: { type: String, default: "user" },
});

module.exports = mongoose.model("User", userSchema);
