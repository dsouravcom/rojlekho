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


// Journal detail
router.get("/api/journal", async (req, res) => {
  const {id} = req.query;
  try {
    const post = await Post.findById(id).select('-uid');
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Journal update
router.put("/api/updatejournal", async (req, res) => {
  const {id, title, content} = req.body;
  try {
    await Post.findByIdAndUpdate(id, {title: title, content: content});
    res.json({ message: "Post updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
);


// Journal delete
router.delete("/api/deletejournal", async (req, res) => {
  const {id} = req.query;
  try {
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
}
);



module.exports = router;
