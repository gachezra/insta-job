const bcrypt = require('bcryptjs');
const User = require('../models/user');
const mongoose = require('mongoose');
require('dotenv').config();

const seedAdmin = async () => {
  await mongoose.connect(`mongodb+srv://${process.env.MONGO_USER}:${process.env.MONGO_PASS}@insta-project.oodqm.mongodb.net/?retryWrites=true&w=majority&appName=insta-project`);

  const hashedPassword = await bcrypt.hash(`${process.env.PASS}`, 10);
  const admin = new User({
    firstName: `${process.env.FN}`,
    lastName: `${process.env.LN}`,
    email: `${process.env.EMAIL}`,
    country: `${process.env.COUNTRY}`,
    password: hashedPassword,
    isEmailVerified: true,
    role: 'admin'
  });

  await admin.save();
  console.log('Default admin seeded.');
};

seedAdmin();
