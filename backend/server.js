require("dotenv").config();
const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const app = require("./app");

// ✅ Enable CORS for Frontend
app.use(cors({
  origin: process.env.FRONTEND_URL || "http://localhost:5500",
  methods: "GET,POST,PUT,DELETE",
  credentials: true,
}));

// ✅ MongoDB Connection
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log("✅ MongoDB Connected");
  } catch (err) {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  }
};

// ✅ Enforce HTTPS in Production
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
  const server = app.listen(PORT, () =>
    console.log(`🚀 Server running on http://localhost:${PORT}`)
  );

  // ✅ Handle Graceful Shutdown
  process.on("SIGINT", async () => {
    console.log("\n🛑 Shutting down...");
    server.close(() => {
      console.log("✅ Server and Database disconnected");
      process.exit(0);
    });
  });
});
