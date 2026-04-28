const express = require('express');
const router = express.Router();
const User = require('../models/User');
const Post = require('../models/Post');

// GET /users -> fetch users with their posts
router.get('/', async (req, res) => {
  try {
    const users = await User.find().lean();
    for (let u of users) {
        u.posts = await Post.find({ user: u._id });
    }
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /users -> create user
router.post('/', async (req, res) => {
  try {
    const { name } = req.body;
    const user = new User({ name });
    await user.save();
    res.status(201).json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// POST /users/:userId/posts -> create post for a user
router.post('/:userId/posts', async (req, res) => {
  try {
    const { title } = req.body;
    const { userId } = req.params;
    const post = new Post({ title, user: userId });
    await post.save();
    res.status(201).json(post);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
