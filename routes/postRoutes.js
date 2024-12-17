const express = require('express');
const router = express.Router();
const postController = require('../controllers/postController');
const commentController = require('../controllers/commentController');
const validate = require('../middleware/validator');
const auth = require('../middleware/auth');

router.post('/', auth(['user', 'admin']), validate('createPost'), postController.createPost);
router.put('/:id', auth(['user', 'admin']), validate('updatePost'), postController.updatePost);
router.delete('/:id', auth(['user', 'admin']), postController.deletePost);
router.post('/:postId/comments', auth(['user', 'admin']), validate('createComment'), commentController.createComment);

module.exports = router;