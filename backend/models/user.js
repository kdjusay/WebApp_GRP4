const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  googleId: { type: String, required: true, unique: true },
  displayName: String,
  firstName: String,
  lastName: String,
  email: { type: String, required: true, unique: true },
  picture: String,
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model("User", UserSchema);
