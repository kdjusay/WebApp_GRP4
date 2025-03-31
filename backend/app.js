require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const { passport } = require("./config/auth");
const MongoStore = require("connect-mongo"); 
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");

const app = express();

// ✅ MongoDB Connection using Environment Variable
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ MongoDB Connected"))
.catch(err => console.error("❌ MongoDB Connection Error:", err));

// ✅ Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "'unsafe-inline'", "trusted-cdn.com"],
        objectSrc: ["'none'"], 
        upgradeInsecureRequests: [],
      },
    },
    frameguard: { action: "deny" }, 
    referrerPolicy: { policy: "strict-origin-when-cross-origin" },
  })
);

// ✅ CORS Configuration
app.use(cors({
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
  methods: "GET,POST,PUT,DELETE",
  allowedHeaders: "Content-Type, Authorization",
}));

app.use(express.json());

// ✅ Session Middleware (MongoDB Session Store)
app.use(session({
  store: MongoStore.create({ mongoUrl: process.env.MONGO_URI }),
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    secure: process.env.NODE_ENV === "production", 
    httpOnly: true, 
    sameSite: "strict", 
  },
}));

app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// ✅ Validation Route
app.get("/validate", (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    return next(new Error("Name parameter is required"));
  }
  res.send(`Hello, ${name}!`);
});

// ✅ Default Home Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// ✅ Handle Missing Routes (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handler
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app; // ✅ Export app for use in server.js
