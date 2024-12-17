const bcrypt = require('bcryptjs');
const User = require('../models/user');
const mongoose = require('mongoose');
require('dotenv').config();

const seedAdmin = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@insta-project.oodqm.mongodb.net/?retryWrites=true&w=majority&appName=insta-project`);

  const hashedPassword = await bcrypt.hash('Admin123!', 10);
  const admin = new User({
    firstName: 'Admin',
    lastName: 'User',
    email: 'admin@mail.com',
    country: 'Kenya',
    password: hashedPassword,
    isEmailVerified: true,
    role: 'admin'
  });

  await admin.save();
  console.log('Default admin seeded.');
};

seedAdmin();
