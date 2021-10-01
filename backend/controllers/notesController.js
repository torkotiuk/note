const asyncHandler = require('express-async-handler');
const Note = require('../models/noteModel');

const getNotes = asyncHandler(async (req, res) => {
  const notes = await Note.find({ user: req.user._id });

  // if (notes?.length === 0) {
  //   res.json({
  //     status: 'success',
  //     code: 200,
  //     message: 'There is no any notes yet',
  //     data: notes,
  //   });
  //   return;
  // }

  res.json(notes);
});

const createNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  if (!title || !content || !category) {
    res.status(400);
    throw new Error('Please fill all the fields');
  } else {
    const note = new Note({ user: req.user._id, title, content, category });

    const createdNote = await note.save();

    res.status(201).json(createdNote);
  }
});

const getNoteById = asyncHandler(async (req, res) => {
  try {
    const note = await Note.findById(req.params.id);
    res.json(note);
  } catch (error) {
    res.status(404).json({ message: 'Note is not found' });
  }
});

const updateNote = asyncHandler(async (req, res) => {
  const { title, content, category } = req.body;

  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error('You can not perform this action');
  }

  if (note) {
    note.title = title;
    note.content = content;
    note.category = category;

    const updatedNote = await note.save();
    res.json(updatedNote);
  } else {
    res.status(404).json({ message: 'Note is not found' });
  }
});

const deleteNote = asyncHandler(async (req, res) => {
  const note = await Note.findById(req.params.id);

  if (note.user.toString() !== req.user._id.toString()) {
    res.status(400);
    throw new Error('You can not perform this action');
  }

  if (note) {
    await note.remove();
    res.json({ message: 'Note was deleted' });
  } else {
    res.status(404).json({ message: 'Note is not found' });
  }
});

module.exports = {
  getNotes,
  createNote,
  getNoteById,
  updateNote,
  deleteNote,
};
