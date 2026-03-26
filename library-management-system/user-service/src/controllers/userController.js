const UserProfile = require('../models/UserProfile');

// @desc    Create user profile
// @route   POST /users/profile
// @access  Private (Admin)
exports.createProfile = async (req, res) => {
  try {
    const { userId, name, email, role } = req.body;

    const existingProfile = await UserProfile.findOne({ userId });
    if (existingProfile) {
      return res.status(400).json({ error: 'Profile already exists' });
    }

    const profile = await UserProfile.create({
      userId,
      name,
      email,
      role
    });

    res.status(201).json(profile);
  } catch (error) {
    console.error('Create profile error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get all users
// @route   GET /users
// @access  Private (Admin/Librarian)
exports.getAllUsers = async (req, res) => {
  try {
    const { page = 1, limit = 10, role, search } = req.query;
    
    let query = {};
    if (role) query.role = role;
    if (search) {
      query.$or = [
        { name: { $regex: search, $options: 'i' } },
        { email: { $regex: search, $options: 'i' } },
        { membershipId: { $regex: search, $options: 'i' } }
      ];
    }

    const users = await UserProfile.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const total = await UserProfile.countDocuments(query);

    res.json({
      users,
      totalPages: Math.ceil(total / limit),
      currentPage: page,
      total
    });
  } catch (error) {
    console.error('Get all users error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get user by ID
// @route   GET /users/:id
// @access  Private
exports.getUserById = async (req, res) => {
  try {
    const user = await UserProfile.findOne({ userId: req.params.id });
    
    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json(user);
  } catch (error) {
    console.error('Get user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Update user profile
// @route   PUT /users/:id
// @access  Private
exports.updateUser = async (req, res) => {
  try {
    const updates = req.body;
    const user = await UserProfile.findOne({ userId: req.params.id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check authorization
    if (req.user.role !== 'admin' && req.user.id !== req.params.id) {
      return res.status(403).json({ error: 'Access denied' });
    }

    const updatedUser = await UserProfile.findOneAndUpdate(
      { userId: req.params.id },
      updates,
      { new: true, runValidators: true }
    );

    res.json(updatedUser);
  } catch (error) {
    console.error('Update user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Delete user
// @route   DELETE /users/:id
// @access  Private (Admin)
exports.deleteUser = async (req, res) => {
  try {
    const user = await UserProfile.findOneAndDelete({ userId: req.params.id });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.json({ message: 'User deleted successfully' });
  } catch (error) {
    console.error('Delete user error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

// @desc    Get user statistics
// @route   GET /users/stats/dashboard
// @access  Private (Admin)
exports.getUserStats = async (req, res) => {
  try {
    const totalUsers = await UserProfile.countDocuments();
    const activeUsers = await UserProfile.countDocuments({ isActive: true });
    const students = await UserProfile.countDocuments({ role: 'student' });
    const librarians = await UserProfile.countDocuments({ role: 'librarian' });

    res.json({
      totalUsers,
      activeUsers,
      students,
      librarians
    });
  } catch (error) {
    console.error('Get user stats error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};