const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
require('dotenv').config();

const User = require('./src/models/User');

const seedAdmin = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    
    const adminExists = await User.findOne({ email: 'admin@library.com' });
    if (!adminExists) {
      await User.create({
        name: 'Admin User',
        email: 'admin@library.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Admin user created');
    }
    
    process.exit();
  } catch (error) {
    console.error('Seed error:', error);
    process.exit(1);
  }
};

seedAdmin();