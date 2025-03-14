const express = require('express');
const router = express.Router();
const File = require('backend/models/File'); // Ensure you have a File model

// Get all uploaded files
router.get('/files', async (req, res) => {
  try {
    const files = await File.find();
    res.status(200).json(files);
  } catch (error) {
    console.error(error);
    res.status(500).send('Error retrieving files');
  }
});

module.exports = router;
