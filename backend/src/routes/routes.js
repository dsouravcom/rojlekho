const express = require("express");
const router = express.Router();

const Post = require("../models/post.js");

// Create journal Route
router.post("/api/createjournal", async (req, res) => {
  try {
    const { title, content, uid } = req.body;
    await Post.create({ title, content, uid });

    res.json({ message: "Post created successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// search route
router.get("/api/search", async (req, res) => {
  const { query, uid } = req.query;
  try {
    const filteredPost = await Post.find({ uid });
    const result = filteredPost.filter(
      (post) => post.title.includes(query) || post.content.includes(query)
    );
    res.json({ result });
  } catch (error) {
    console.error("Error searching posts:", error);
    res.status(500).json({ error: "Internal server error" });
  }
});

// Journals list, newest or oldest, limit or all posts path
router.get("/api/journals", async (req, res) => {
  let { uid, time, page } = req.query;
  const sorting = time === "newest" ? -1 : 1;
  const pageNumber = parseInt(page) || 1;
  const skip = (pageNumber - 1) * 10;
  try {
    const posts = await Post.find({ uid: uid })
      .skip(skip)
      .sort({ createdAt: sorting })
      .limit(10);
    const postnumber = await Post.find({ uid: uid });
    const totalPosts = postnumber.length;

    res.json({ posts, totalPosts });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Journal count
router.get("/api/journalcount", async (req, res) => {
  const { uid } = req.query;
  try {
    const posts = await Post.find({ uid: uid });
    res.json(posts.length);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Journal detail
router.get("/api/journal", async (req, res) => {
  const { id } = req.query;
  try {
    const post = await Post.findById(id).select("-uid");
    res.json(post);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Journal update
router.put("/api/updatejournal", async (req, res) => {
  const { id, title, content } = req.body;
  try {
    await Post.findByIdAndUpdate(id, { title: title, content: content });
    res.json({ message: "Post updated successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Journal delete
router.delete("/api/deletejournal", async (req, res) => {
  const { id } = req.query;
  try {
    await Post.findByIdAndDelete(id);
    res.json({ message: "Post deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// account delete and all journals
router.delete("/api/deleteaccount", async (req, res) => {
  const { uid } = req.query;
  try {
    await Post.deleteMany({ uid: uid });
    res.json({ message: "Account deleted successfully!" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Server Error" });
  }
});

// Test API route
router.get("/api/test", (req, res) => {
  res.json({ message: "Test API route" });
});

module.exports = router;
