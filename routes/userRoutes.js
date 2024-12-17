const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const validate = require('../middleware/validator');
const auth = require('../middleware/auth');

router.post('/signup', validate('signup'), userController.signup);
router.post('/login', validate('login'), userController.login);
router.post('/verify-email/:token', userController.verifyEmail);
router.get('/profile/:id', auth(['user', 'admin']), userController.getProfile);

module.exports = router;