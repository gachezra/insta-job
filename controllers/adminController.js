const bcrypt = require('bcryptjs');
const User = require('../models/user');

exports.addAdmin = async (req, res) => {
  const { firstName, lastName, email, country, password } = req.body;

  const role = req.header('role');
  if (!role || role !== 'admin') {
    return res.status(403).json({ message: 'Access denied: Only admins can add other admins' });
  }

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser) return res.status(400).json({ message: 'Admin already exists' });

    const hashedPassword = await bcrypt.hash(password, 10);
    const admin = new User({
      firstName,
      lastName,
      email,
      country,
      password: hashedPassword,
      role: 'admin',
      isEmailVerified: true
    });

    await admin.save();
    res.status(201).json({ message: 'Admin added successfully', admin: { firstName, email } });
  } catch (err) {
    res.status(500).json({ message: 'Server Error', error: err.message });
  }
};
