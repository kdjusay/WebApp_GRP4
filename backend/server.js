const express = require("express");
const dotenv = require("dotenv");
const cors = require("cors");
const bodyParser = require("body-parser");
const connectDB = require("./config/db");
const assignmentRoutes = require("./routes/assignments"); // ✅ Ensure this line exists

dotenv.config();
connectDB(); // Connect to MongoDB

const app = express();
app.use(cors());
app.use(bodyParser.json());

// ✅ Register API Routes
app.use("/api/assignments", assignmentRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
