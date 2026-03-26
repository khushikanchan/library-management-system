const Transaction = require('../models/Transaction');
const axios = require('axios');
const moment = require('moment');

// @desc    Issue a book
// @route   POST /transactions/issue
// @access  Private (Admin/Librarian)
exports.issueBook = async (req, res) => {
  try {
    const { userId, bookId, dueDate } = req.body;

    // Check if user exists via user service
    try {
      await axios.get(`${process.env.USER_SERVICE_URL}/${userId}`, {
        headers: { Authorization: req.headers.authorization }
      });
    } catch (error) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if book exists and has available copies
    const bookResponse = await axios.get(`${process.env.BOOK_SERVICE_URL}/${bookId}`);
    const book = bookResponse.data;

    if (book.availableCopies <= 0) {
      return res.status(400).json({ error: 'No copies available' });
    }

    // Check if user already has this book issued
    const existingTransaction = await Transaction.findOne({
      userId,
      bookId,
      status: { $in: ['issued', 'overdue'] }
    });

    if (existingTransaction) {
      return res.status(400).json({ error: 'User already has this book issued' });
    }

    // Create transaction
    const transaction = await Transaction.create({
      userId,
      bookId,
      dueDate: dueDate || moment().add(14, 'days').toDate(),
      status: 'issued'
    });

    // Update book available copies
    await axios.patch(
      `${process.env.BOOK_SERVICE_URL}/${bookId}/quantity`,
      { quantity: book.quantity, availableCopies: book.availableCopies - 1 },
      { headers: { Authorization: req.headers.authorization } }
    );

    // Update user profile
    await axios.put(
      `${process.env.USER_SERVICE_URL}/${userId}`,
      { $inc: { currentlyBorrowed: 1, totalBooksBorrowed: 1 } },
      { headers: { Authorization: req.headers.authorization } }
    );

    res.status(201).json(transaction);
  } catch (error) {
    console.error('Issue book error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Return a book
// @route   POST /transactions/return
// @access  Private (Admin/Librarian)
exports.returnBook = async (req, res) => {
  try {
    const { transactionId } = req.body;

    const transaction = await Transaction.findById(transactionId);
    if (!transaction) {
      return res.status(404).json({ error: 'Transaction not found' });
    }

    if (transaction.status === 'returned') {
      return res.status(400).json({ error: 'Book already returned' });
    }

    transaction.returnDate = new Date();
    transaction.status = 'returned';
    await transaction.save();

    // Update book available copies
    const bookResponse = await axios.get(`${process.env.BOOK_SERVICE_URL}/${transaction.bookId}`);
    const book = bookResponse.data;
    
    await axios.patch(
      `${process.env.BOOK_SERVICE_URL}/${transaction.bookId}/quantity`,
      { quantity: book.quantity, availableCopies: book.availableCopies + 1 },
      { headers: { Authorization: req.headers.authorization } }
    );

    // Update user profile
    await axios.put(
      `${process.env.USER_SERVICE_URL}/${transaction.userId}`,
      { $inc: { currentlyBorrowed: -1 } },
      { headers: { Authorization: req.headers.authorization } }
    );

    // Calculate fine if overdue
    const dueDate = moment(transaction.dueDate);
    const returnDate = moment(transaction.returnDate);
    
    if (returnDate.isAfter(dueDate)) {
      const daysOverdue = returnDate.diff(dueDate, 'days');
      const fineAmount = daysOverdue * 5; // $5 per day
      
      // Create fine record
      await axios.post(
        `${process.env.FINE_SERVICE_URL}/fines`,
        {
          userId: transaction.userId,
          transactionId: transaction._id,
          amount: fineAmount
        },
        { headers: { Authorization: req.headers.authorization } }
      );
    }

    res.json(transaction);
  } catch (error) {
    console.error('Return book error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all transactions
// @route   GET /transactions
// @access  Private (Admin/Librarian)
exports.getAllTransactions = async (req, res) => {
  try {
    const { page = 1, limit = 10, status, userId } = req.query;
    
    let query = {};
    if (status) query.status = status;
    if (userId) query.userId = userId;

    const transactions = await Transaction.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Transaction.countDocuments(query);

    // Enrich transactions with book and user details
    const enrichedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        try {
          const [bookResponse, userResponse] = await Promise.all([
            axios.get(`${process.env.BOOK_SERVICE_URL}/${transaction.bookId}`),
            axios.get(`${process.env.USER_SERVICE_URL}/${transaction.userId}`, {
              headers: { Authorization: req.headers.authorization }
            })
          ]);
          
          return {
            ...transaction.toObject(),
            book: bookResponse.data,
            user: userResponse.data
          };
        } catch (error) {
          return transaction;
        }
      })
    );

    res.json({
      transactions: enrichedTransactions,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get transactions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get user transactions
// @route   GET /transactions/user/:userId
// @access  Private
exports.getUserTransactions = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check authorization
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const transactions = await Transaction.find({ userId })
      .sort({ createdAt: -1 });

    // Enrich with book details
    const enrichedTransactions = await Promise.all(
      transactions.map(async (transaction) => {
        try {
          const bookResponse = await axios.get(`${process.env.BOOK_SERVICE_URL}/${transaction.bookId}`);
          return {
            ...transaction.toObject(),
            book: bookResponse.data
          };
        } catch (error) {
          return transaction;
        }
      })
    );

    res.json(enrichedTransactions);
  } catch (error) {
    console.error('Get user transactions error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get transaction statistics
// @route   GET /transactions/stats
// @access  Private (Admin)
exports.getTransactionStats = async (req, res) => {
  try {
    const totalIssued = await Transaction.countDocuments({ status: 'issued' });
    const totalOverdue = await Transaction.countDocuments({ status: 'overdue' });
    const totalReturned = await Transaction.countDocuments({ status: 'returned' });
    
    const monthlyIssued = await Transaction.aggregate([
      {
        $match: {
          issueDate: {
            $gte: moment().subtract(6, 'months').toDate()
          }
        }
      },
      {
        $group: {
          _id: { $month: '$issueDate' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalIssued,
      totalOverdue,
      totalReturned,
      monthlyIssued
    });
  } catch (error) {
    console.error('Get transaction stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};