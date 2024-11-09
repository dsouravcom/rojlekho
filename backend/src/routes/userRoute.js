const {getUserProfile} = require('../controllers/userController');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.get('/profile', auth, getUserProfile);

module.exports = router;