const express = require('express');
const router = express.Router();

// Define your routes
router.get('/api/user', (req, res) => {
  // Handle user route logic
  res.json({ message: 'User route accessed' });
});

router.post('/api/post', (req, res) => {
  // Handle post route logic
  res.json({ message: 'Post route accessed' });
});

// Add more routes as needed

module.exports = router;
