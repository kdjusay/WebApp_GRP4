const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: { type: String, required: true },
  path: { type: String, required: true }, // Local storage path
  url: { type: String, default: null }, // Optional for S3 storage
  size: { type: Number, required: true }, // File size in bytes
  uploadedAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('File', fileSchema);
