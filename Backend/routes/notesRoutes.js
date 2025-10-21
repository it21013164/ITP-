const express = require('express');
const router = express.Router();
const authMiddleware = require('../middleware/authMiddleware');
const {
    getNotes,
    createNote,
    updateNote,
    deleteNote
} = require('../controllers/notesController');

// Get all notes for a specific recipe
router.get('/recipe/:recipeId', authMiddleware, getNotes);

// Create a new note
router.post('/', authMiddleware, createNote);

// Update a note
router.put('/:id', authMiddleware, updateNote);

// Delete a note
router.delete('/:id', authMiddleware, deleteNote);

module.exports = router;