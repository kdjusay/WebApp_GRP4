const express = require('express');
const multer = require('multer');
const path = require('path');
const File = require('../models/File'); // Ensure the correct path
const router = express.Router();

// ✅ Configure Multer for File Storage
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, 'uploads/'); // Ensure 'uploads/' exists
  },
  filename: (req, file, cb) => {
    cb(null, Date.now() + path.extname(file.originalname)); // Unique filename
  }
});

const upload = multer({ storage });

// ✅ File Upload Route
router.post('/upload', upload.single('file'), async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: 'No file uploaded' });

    const newFile = new File({
      filename: req.file.filename,
      path: req.file.path,
      size: req.file.size
    });

    await newFile.save();
    res.status(201).json({ message: 'File uploaded successfully', file: newFile });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error uploading file' });
  }
});

// ✅ Get All Uploaded Files
router.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: 'Error retrieving files' });
  }
});

module.exports = router;
