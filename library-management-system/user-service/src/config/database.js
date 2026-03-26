const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('User Service - MongoDB Connected');
  } catch (error) {
    console.error('User Service - MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;