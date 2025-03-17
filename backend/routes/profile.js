const User = require("./models/user");

app.get("/profile", async (req, res) => {
  if (!req.user) {
    return res.status(401).json({ error: "Unauthorized" });
  }

  try {
    const user = await User.findOne({ googleId: req.user.googleId });
    if (!user) {
      return res.status(404).json({ error: "User not found" });
    }
    res.json({ message: `Hello, ${user.displayName}!`, user });
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ error: "Server error" });
  }
});
