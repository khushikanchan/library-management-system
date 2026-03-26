const mongoose = require('mongoose');

const fineSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'User'
  },
  transactionId: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'Transaction'
  },
  amount: {
    type: Number,
    required: true,
    min: 0
  },
  paidStatus: {
    type: Boolean,
    default: false
  },
  paidDate: {
    type: Date
  },
  description: {
    type: String,
    default: ''
  }
}, {
  timestamps: true
});

module.exports = mongoose.model('Fine', fineSchema);