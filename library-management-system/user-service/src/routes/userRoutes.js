const express = require('express');
const {
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
  getUserStats,
  createProfile
} = require('../controllers/userController');
const auth = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(auth);

router.post('/profile', authorize('admin'), createProfile);
router.get('/', authorize('admin', 'librarian'), getAllUsers);
router.get('/stats', authorize('admin'), getUserStats);
router.get('/:id', getUserById);
router.put('/:id', updateUser);
router.delete('/:id', authorize('admin'), deleteUser);

module.exports = router;