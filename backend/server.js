require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const path = require("path");
const app = require("./app");

// ✅ Enable CORS for Frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "*", // Allow frontend domain or all (*)
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

// ✅ Serve Static Frontend Files
app.use(express.static(path.join(__dirname, "public")));

app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "public", "index.html"));
});

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err.message);
    process.exit(1);
  }
};

// ✅ Enforce HTTPS in Production (Render Auto Handles This)
if (process.env.NODE_ENV === "production") {
  app.use((req, res, next) => {
    if (req.headers["x-forwarded-proto"] !== "https") {
      return res.redirect(`https://${req.headers.host}${req.url}`);
    }
    next();
  });
}

// ✅ Start Server after DB Connection
const PORT = process.env.PORT || 5000;
connectDB().then(() => {
  const server = app.listen(PORT, () => {
    console.log(`🚀 Server running on port ${PORT}`);
  });

  // ✅ Handle Graceful Shutdown
  process.on("SIGINT", async () => {
    console.log("\n🛑 Shutting down...");
    await mongoose.disconnect();
    server.close(() => {
      console.log("✅ Server and Database disconnected");
      process.exit(0);
    });
  });
});
