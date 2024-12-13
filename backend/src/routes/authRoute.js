const {register, login, logout} = require('../controllers/authController');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);

module.exports = router;