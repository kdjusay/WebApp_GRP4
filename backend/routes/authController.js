const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

// ✅ User Registration Controller
const registerUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists" });
    }

    // Hash the password
    const saltRounds = 10;
    const hashedPassword = await bcrypt.hash(password, saltRounds);

    // Save user to DB
    const newUser = new User({ email, password: hashedPassword });
    await newUser.save();

    // Generate token for immediate login
    const token = jwt.sign({ id: newUser._id, email: newUser.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(201).json({
      message: "User registered successfully!",
      user: { id: newUser._id, email: newUser.email },
      token,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

// ✅ User Login Controller
const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;

    // Check if email and password are provided
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if the user exists
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ error: "Invalid email or password" });
    }

    // Log data for debugging
    console.log("🔍 Email:", email);
    console.log("🔍 User found:", user ? "Yes" : "No");
    console.log("🔍 Entered Password:", password);
    console.log("🔍 Stored Password:", user.password || "No password stored");

    // If the user registered via Google, they won't have a password
    if (!user.password) {
      return res.status(400).json({
        error: "This account was registered via Google. Please log in with Google.",
      });
    }

    // Verify password
    const isMatch = await bcrypt.compare(password, user.password);
    console.log("🔍 Password Match:", isMatch);    

    // Generate a JWT token
    const token = jwt.sign({ id: user._id, email: user.email }, process.env.JWT_SECRET, { expiresIn: "1h" });

    res.status(200).json({
      message: "Login successful",
      token,
      user: { id: user._id, email: user.email },
    });
  } catch (error) {
    console.error("❌ Login Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};

module.exports = { registerUser, loginUser };
