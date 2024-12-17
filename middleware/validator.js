const { body, validationResult } = require('express-validator');

const validate = (method) => {
  switch (method) {
    case 'addAdmin':
      return [
        body('name').notEmpty().withMessage('Name is required'),
        body('email').isEmail().withMessage('Valid email is required'),
        body('password').isLength({ min: 6 }).withMessage('Password must be at least 6 characters long'),
      ];
    default:
      return [];
  }
};

module.exports = (method) => [
  validate(method),
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
    next();
  },
];
