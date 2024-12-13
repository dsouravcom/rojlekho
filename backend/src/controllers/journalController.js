const Post = require("../models/journalModel");

// Create a new post
exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      userId: req.user.id,
    });

    await post.save();
    res
      .status(201)
      .send({ success: "ok", message: "Post created successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Get all posts of a user
exports.getPosts = async (req, res) => {
  try {
    const page = parseInt(req.query.page) || 1;
    const limit = parseInt(req.query.limit) || 10;
    const sortBy = req.query.sortBy;
    
    const skip = (page - 1) * limit;
    
    // Use aggregation for better performance
    const [posts, totalCount] = await Promise.all([
      Post.find({ userId: req.user.id })
        .sort({ createdAt: sortBy === "newest" ? -1 : 1 })
        .skip(skip)
        .limit(limit)
        .lean(),
      Post.countDocuments({ userId: req.user.id })
    ]);

    res.status(200).json({
      success: true,
      data: {
        posts,
        pagination: {
          totalPages: Math.ceil(totalCount / limit),
          currentPage: page,
          totalPosts: totalCount,
          hasMore: page * limit < totalCount
        }
      }
    });
  } catch (error) {
    res.status(500).json({ 
      success: false,
      error: "Failed to fetch posts" 
    });
  }
};

// Get a post by id
exports.getPost = async (req, res) => {
  try {
    const post = await Post.findOne({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    res.status(200).send(post);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Update a post by id
exports.updatePost = async (req, res) => {
  try {
    const post = await Post.findOneAndUpdate(
      { _id: req.params.id, userId: req.user.id },
      req.body,
      { new: true }
    );
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    res
      .status(200)
      .send({ success: "ok", message: "Post updated successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// search posts by title or content
exports.searchPosts = async (req, res) => {
  try {
    const search = req.query.search;
    const posts = await Post.find({
      $or: [
        { title: { $regex: search, $options: "i" } },
        { content: { $regex: search, $options: "i" } },
      ],
      userId: req.user.id,
    });
    res.status(200).send(posts);
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// Delete a post by id
exports.deletePost = async (req, res) => {
  try {
    const post = await Post.findOneAndDelete({
      _id: req.params.id,
      userId: req.user.id,
    });
    if (!post) {
      return res.status(404).send({ error: "Post not found" });
    }
    res
      .status(200)
      .send({ success: "ok", message: "Post deleted successfully" });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};

// get all posts count
exports.getPostCount = async (req, res) => {
  try {
    const count = await Post.countDocuments({ userId: req.user.id });
    res.status(200).send({ count });
  } catch (error) {
    res.status(400).send({ error: error.message });
  }
};