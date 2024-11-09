const {createMood, getMoods, getUserMoods} = require('../controllers/moodController');
const express = require('express');
const router = express.Router();
const auth = require('../middlewares/auth');

router.post('/create', auth, createMood);
router.get('/all', auth, getMoods);
router.get('/user', auth, getUserMoods);

module.exports = router;