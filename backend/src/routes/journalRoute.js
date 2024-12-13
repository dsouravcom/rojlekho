const express = require('express');
const router = express.Router();
const { createPost, getPosts, getPost, updatePost, searchPosts, deletePost, getPostCount } = require('../controllers/journalController');
const auth = require('../middlewares/auth');

router.post('/create', auth, createPost);
router.get('/posts', auth, getPosts);
router.get('/post/:id', auth, getPost);
router.put('/update/:id', auth, updatePost);
router.get('/search', auth, searchPosts);
router.delete('/delete/:id', auth, deletePost);
router.get('/count', auth, getPostCount);

module.exports = router;