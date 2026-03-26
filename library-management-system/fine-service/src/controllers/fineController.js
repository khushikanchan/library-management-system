const Fine = require('../models/Fine');
const axios = require('axios');

// @desc    Create fine
// @route   POST /fines
// @access  Private (Admin/Librarian)
exports.createFine = async (req, res) => {
  try {
    const { userId, transactionId, amount, description } = req.body;

    const fine = await Fine.create({
      userId,
      transactionId,
      amount,
      description
    });

    // Update user's total fines
    await axios.put(
      `${process.env.USER_SERVICE_URL}/${userId}`,
      { $inc: { totalFines: amount } },
      { headers: { Authorization: req.headers.authorization } }
    );

    res.status(201).json(fine);
  } catch (error) {
    console.error('Create fine error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all fines
// @route   GET /fines
// @access  Private (Admin/Librarian)
exports.getAllFines = async (req, res) => {
  try {
    const { page = 1, limit = 10, paidStatus, userId } = req.query;
    
    let query = {};
    if (paidStatus !== undefined) query.paidStatus = paidStatus === 'true';
    if (userId) query.userId = userId;

    const fines = await Fine.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await Fine.countDocuments(query);

    // Enrich fines with user details
    const enrichedFines = await Promise.all(
      fines.map(async (fine) => {
        try {
          const userResponse = await axios.get(`${process.env.USER_SERVICE_URL}/${fine.userId}`, {
            headers: { Authorization: req.headers.authorization }
          });
          
          return {
            ...fine.toObject(),
            user: userResponse.data
          };
        } catch (error) {
          return fine;
        }
      })
    );

    res.json({
      fines: enrichedFines,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get fines error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get user fines
// @route   GET /fines/:userId
// @access  Private
exports.getUserFines = async (req, res) => {
  try {
    const { userId } = req.params;
    
    // Check authorization
    if (req.user.role !== 'admin' && req.user.id !== userId) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const fines = await Fine.find({ userId, paidStatus: false });
    const totalUnpaid = fines.reduce((sum, fine) => sum + fine.amount, 0);

    res.json({
      fines,
      totalUnpaid,
      count: fines.length
    });
  } catch (error) {
    console.error('Get user fines error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Pay fine
// @route   POST /fines/pay
// @access  Private
exports.payFine = async (req, res) => {
  try {
    const { fineIds } = req.body;
    
    const fines = await Fine.find({ _id: { $in: fineIds }, paidStatus: false });
    
    if (fines.length === 0) {
      return res.status(404).json({ error: 'No unpaid fines found' });
    }

    // Update each fine
    const updatedFines = await Promise.all(
      fines.map(async (fine) => {
        fine.paidStatus = true;
        fine.paidDate = new Date();
        await fine.save();
        return fine;
      })
    );

    // Update user's total fines
    const totalPaid = updatedFines.reduce((sum, fine) => sum + fine.amount, 0);
    await axios.put(
      `${process.env.USER_SERVICE_URL}/${fines[0].userId}`,
      { $inc: { totalFines: -totalPaid } },
      { headers: { Authorization: req.headers.authorization } }
    );

    res.json({
      message: 'Fines paid successfully',
      paidAmount: totalPaid,
      fines: updatedFines
    });
  } catch (error) {
    console.error('Pay fine error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get fine statistics
// @route   GET /fines/stats
// @access  Private (Admin)
exports.getFineStats = async (req, res) => {
  try {
    const totalFines = await Fine.aggregate([
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const unpaidFines = await Fine.aggregate([
      { $match: { paidStatus: false } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);
    
    const paidFines = await Fine.aggregate([
      { $match: { paidStatus: true } },
      { $group: { _id: null, total: { $sum: '$amount' } } }
    ]);

    const monthlyFines = await Fine.aggregate([
      {
        $match: {
          createdAt: {
            $gte: new Date(new Date().setMonth(new Date().getMonth() - 6))
          }
        }
      },
      {
        $group: {
          _id: { $month: '$createdAt' },
          total: { $sum: '$amount' },
          count: { $sum: 1 }
        }
      },
      { $sort: { _id: 1 } }
    ]);

    res.json({
      totalFines: totalFines[0]?.total || 0,
      unpaidFines: unpaidFines[0]?.total || 0,
      paidFines: paidFines[0]?.total || 0,
      monthlyFines
    });
  } catch (error) {
    console.error('Get fine stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};