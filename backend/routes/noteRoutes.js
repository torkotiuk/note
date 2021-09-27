const express = require('express');
const {
  getNotes,
  createNote,
  getNoteById,
} = require('../controllers/notesController');
const { protect } = require('../middlewares/authMiddleware');

const router = express.Router();

router.route('/').get(protect, getNotes);
router.route('/create').post(protect, createNote);
router.route('/:id').get(protect, getNoteById);
// .put().delete();

module.exports = router;
