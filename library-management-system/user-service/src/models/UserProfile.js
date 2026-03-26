const mongoose = require('mongoose');

const userProfileSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    unique: true,
    ref: 'User'
  },
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  role: {
    type: String,
    enum: ['admin', 'librarian', 'student'],
    required: true
  },
  phone: {
    type: String,
    default: ''
  },
  address: {
    type: String,
    default: ''
  },
  membershipId: {
    type: String,
    unique: true,
    sparse: true
  },
  totalBooksBorrowed: {
    type: Number,
    default: 0
  },
  currentlyBorrowed: {
    type: Number,
    default: 0
  },
  totalFines: {
    type: Number,
    default: 0
  },
  isActive: {
    type: Boolean,
    default: true
  }
}, {
  timestamps: true
});

// Generate membership ID before saving
userProfileSchema.pre('save', async function(next) {
  if (!this.membershipId) {
    this.membershipId = `LIB${Date.now()}${Math.floor(Math.random() * 1000)}`;
  }
  next();
});

module.exports = mongoose.model('UserProfile', userProfileSchema);