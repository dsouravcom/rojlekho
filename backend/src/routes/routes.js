const express = require("express");
const router = express.Router();

const Post = require("../models/post.js");

// Create journal Route
router.post("/api/createjournal", async (req, res) => {
  try {
    const { title, content, uid} = req.body;
    await Post.create({ title, content, uid });

    res.json({ message: "Post created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Journals list
router.get("/api/journals", async (req, res) => {
  const {uid} = req.query;
  try {
    const posts = await Post.find({ uid: uid });
    res.json(posts);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Journal count
router.get("/api/journalcount", async (req, res) => {
  const {uid} = req.query;
  try {
    const posts = await Post.find({uid: uid});
    res.json(posts.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
