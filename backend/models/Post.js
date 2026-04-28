const mongoose = require('mongoose');

const postSchema = new mongoose.Schema({
  title: String,
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User'
  }
});

module.exports = mongoose.model('Post', postSchema);
