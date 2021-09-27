const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });

  if (notes?.length === 0) {
    res.json({
      status: 'success',
      code: 200,
      message: 'There is no any notes yet',
      data: notes,
    });
    return;
  }

  res.json({
    status: 'success',
    code: '200',
    data: notes,
  });
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error('Please fill all the fields');
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save();

    res.status(200).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  const note = Note.findById(req.params.id);
  console.log(note);
  if (note) {
    res.json({
      status: 'success',
      data: note,
    });
  } else {
    res.status(404).json({ message: 'Note is not found' });
  }
});

module.exports = {
  getNotes,
  createNote,
  getNoteById,
};
