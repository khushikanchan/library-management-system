const express = require('express');
const {
  createFine,
  getAllFines,
  getUserFines,
  payFine,
  getFineStats
} = require('../controllers/fineController');
const auth = require('../middleware/auth');
const { authorize } = require('../middleware/role');

const router = express.Router();

router.use(auth);

router.post('/', authorize('admin', 'librarian'), createFine);
router.get('/', authorize('admin', 'librarian'), getAllFines);
router.get('/stats', authorize('admin'), getFineStats);
router.get('/:userId', getUserFines);
router.post('/pay', payFine);

module.exports = router;