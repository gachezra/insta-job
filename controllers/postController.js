const Post = require('../models/post');
const Comment = require('../models/comment');

exports.createPost = async (req, res) => {
  try {
    const post = new Post({
      title: req.body.title,
      content: req.body.content,
      author: req.user.id
    });

    await post.save();
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error creating post', error: err.message });
  }
};

exports.updatePost = async (req, res) => {
  try {
    const userId = req.body.userId;
    const post = await Post.findById(req.params.id);
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found' });
    }

    if (post.author.toString() !== userId) {
      return res.status(403).json({ message: 'Not authorized to update this post' });
    }

    post.title = req.body.title;
    post.content = req.body.content;
    post.updatedAt = Date.now();

    await post.save();
    res.json(post);
  } catch (err) {
    res.status(500).json({ message: 'Error updating post', error: err.message });
  }
};

exports.deletePost = async (req, res) => {
  try {
    const userId = req.body.userId;
    
    const post = await Post.findOneAndDelete({ _id: req.params.id, author: userId });
    
    if (!post) {
      return res.status(404).json({ message: 'Post not found or unauthorized' });
    }

    await Comment.deleteMany({ post: post._id });

    res.json({ message: 'Post deleted successfully' });
  } catch (err) {
    res.status(500).json({ message: 'Error deleting post', error: err.message });
  }
}