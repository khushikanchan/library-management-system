const mongoose = require('mongoose');

const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGODB_URI);
    console.log('Transaction Service - MongoDB Connected');
  } catch (error) {
    console.error('Transaction Service - MongoDB Connection Error:', error);
    process.exit(1);
  }
};

module.exports = connectDB;