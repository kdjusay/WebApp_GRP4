require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const multer = require("multer");
const cors = require("cors");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3"); // AWS SDK v3

const app = express();
app.use(cors());
app.use(express.json());

// Check if required env variables are set
if (!process.env.AWS_ACCESS_KEY_ID || !process.env.AWS_SECRET_ACCESS_KEY || !process.env.AWS_S3_BUCKET || !process.env.AWS_REGION || !process.env.MONGO_URI) {
  console.error("❌ Missing required environment variables. Check your .env file.");
  process.exit(1);
}

// ✅ AWS S3 Client Configuration (v3)
const s3 = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
});

// ✅ Multer setup (stores file in memory before upload)
const storage = multer.memoryStorage();
const upload = multer({ storage });

// ✅ MongoDB Connection
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => console.log("✅ MongoDB Connected"))
  .catch((err) => {
    console.error("❌ MongoDB Connection Error:", err);
    process.exit(1);
  });

// ✅ File Schema
const FileSchema = new mongoose.Schema({
  filename: String,
  url: String,
  contentType: String,
  size: Number,
});

const File = mongoose.model("File", FileSchema);

// ✅ File Upload Endpoint (Using AWS SDK v3)
app.post("/upload", upload.single("file"), async (req, res) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const fileKey = `${Date.now()}-${req.file.originalname}`;

    // Upload to S3
    const params = {
      Bucket: process.env.AWS_S3_BUCKET,
      Key: fileKey,
      Body: req.file.buffer,
      ContentType: req.file.mimetype,
    };

    const command = new PutObjectCommand(params);
    await s3.send(command);

    const fileUrl = `https://${process.env.AWS_S3_BUCKET}.s3.${process.env.AWS_REGION}.amazonaws.com/${fileKey}`;

    // Save metadata to MongoDB
    const newFile = new File({
      filename: req.file.originalname,
      url: fileUrl,
      contentType: req.file.mimetype,
      size: req.file.size,
    });

    await newFile.save();

    res.json({ message: "✅ File uploaded!", fileUrl });
  } catch (error) {
    console.error("❌ Upload Error:", error);
    res.status(500).json({ error: "Upload failed" });
  }
});

// ✅ Retrieve All Files
app.get("/files", async (req, res) => {
  try {
    const files = await File.find();
    res.json(files);
  } catch (error) {
    res.status(500).json({ message: "❌ Error retrieving files", error });
  }
});

// ✅ Retrieve a Specific File by ID
app.get("/files/:id", async (req, res) => {
  try {
    const file = await File.findById(req.params.id);
    if (!file) {
      return res.status(404).json({ message: "❌ File not found" });
    }
    res.json(file);
  } catch (error) {
    res.status(500).json({ message: "❌ Error retrieving file", error });
  }
});

// ✅ Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
