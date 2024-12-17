const Comment = require('../models/comment');

exports.createComment = async (req, res) => {
  try {
    const userId = req.body.author;

    const comment = new Comment({
      content: req.body.content,
      post: req.params.postId,
      author: userId
    });

    await comment.save();
    res.status(201).json(comment);
  } catch (err) {
    res.status(500).json({ message: 'Error creating comment', error: err.message });
  }
};