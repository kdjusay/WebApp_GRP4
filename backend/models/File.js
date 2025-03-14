const mongoose = require('mongoose');

const fileSchema = new mongoose.Schema({
  filename: String,
  url: String, // S3 or local storage URL
  uploadedAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('File', fileSchema);
