require("dotenv").config();
const express = require("express");
const session = require("express-session");
const cors = require("cors");
const helmet = require("helmet");
const { passport } = require("./config/auth");
const MongoStore = require("connect-mongo"); // MongoDB session store
const mongoose = require("mongoose");

const authRoutes = require("./routes/authRoutes");
const profileRoutes = require("./routes/profile");

const app = express();

// ✅ MongoDB connection setup for session store
mongoose.connect("mongodb+srv://LearnVerse:learnverse01@cluster0.owqh1.mongodb.net/LearnVerse?retryWrites=true&w=majority", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
}).then(() => {
  console.log("Connected to MongoDB successfully");
}).catch((err) => {
  console.error("MongoDB connection error:", err);
});

// ✅ Enhanced Security Middleware
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: ["'self'", "trusted-cdn.com"],
      },
    },
    frameguard: { action: "deny" }, // Prevent clickjacking
    referrerPolicy: { policy: "no-referrer" }, // Hide referrer data
    xssFilter: true, // Protect against XSS attacks
  })
);

// ✅ CORS Configuration
const corsOptions = {
  origin: process.env.CLIENT_URL || "*",
  credentials: true,
  methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
  allowedHeaders: "Content-Type, Authorization",
};
app.use(cors(corsOptions));
app.use(express.json());

// ✅ Session Middleware (MongoDB Session Store for Production)
app.use(
  session({
    store: MongoStore.create({ mongoUrl: "mongodb://localhost/your-database-name" }), // MongoDB as session store
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
      secure: process.env.NODE_ENV === "production", // Secure cookies in production
      httpOnly: true, // Prevent JavaScript access
      sameSite: "strict", // Prevent CSRF
    },
  })
);
app.use(passport.initialize());
app.use(passport.session());

// ✅ Routes
app.use("/auth", authRoutes);
app.use("/profile", profileRoutes);

// ✅ Validation Route
app.get("/validate", (req, res, next) => {
  const { name } = req.query;
  if (!name) {
    const error = new Error("Name parameter is required");
    error.status = 400;
    next(error);
  } else {
    res.send(`Hello, ${name}!`);
  }
});

// ✅ Default Home Route
app.get("/", (req, res) => {
  res.json({ message: "Welcome to the API" });
});

// ✅ Handle Missing Routes (404)
app.use((req, res, next) => {
  res.status(404).json({ error: "Route not found" });
});

// ✅ Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error("Error:", err.message);
  res.status(err.status || 500).json({ error: err.message || "Internal Server Error" });
});

module.exports = app; // ✅ Export app for use in server.js
