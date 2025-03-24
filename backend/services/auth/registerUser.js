const registerUser = async (req, res) => {
  try {
    const { email, password, role = "user", googleId = null } = req.body;

    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }

    // Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: "User already exists. Please log in." });
    }

    // Fix: Only check googleId if provided
    if (googleId) {
      const googleUser = await User.findOne({ googleId });
      if (googleUser) {
        return res.status(400).json({ error: "This Google account is already linked to an existing user." });
      }
    }


    // Hash password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create and save user
    const newUser = new User({ email, password: hashedPassword, role, googleId });
    await newUser.save();

    // Generate JWT token
    const token = jwt.sign(
      { id: newUser._id, email: newUser.email, role: newUser.role },
      process.env.JWT_SECRET || "default_secret",
      { expiresIn: "1h" }
    );

    res.status(201).json({
      message: "User registered successfully!",
      user: { id: newUser._id, email: newUser.email, role: newUser.role },
      token,
    });
  } catch (error) {
    console.error("❌ Registration Error:", error);
    res.status(500).json({ error: "Internal Server Error" });
  }
};
