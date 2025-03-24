const express = require('express');
const validateToken = require('./middlewares/validateToken');
const authorizeRoles = require('./middlewares/authorizeRoles');
require('dotenv').config();
const app = express();

// Public Route
app.get('/', (req, res) => {
  res.send('Welcome to the app!');
});

// Protected User Profile Route
app.get('/profile', validateToken, (req, res) => {
  res.send(`Welcome, ${req.user.email}. This is your profile.`);
});

// Admin Dashboard (Restricted to Admins Only)
app.get('/admin-dashboard', validateToken, authorizeRoles('admin'), (req, res) => {
  res.send('Welcome to the admin dashboard.');
});

// Upload Route (Allowed for Users and Admins)
app.get('/upload', validateToken, authorizeRoles('user', 'admin'), (req, res) => {
  res.send('You are authorized to upload files.');
});

app.listen(3000, () => {
  console.log('Server is running on http://localhost:3000');
});