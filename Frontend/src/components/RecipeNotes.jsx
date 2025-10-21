import React, { useState, useEffect } from 'react';
import {
    Box,
    TextField,
    Button,
    Typography,
    Rating,
    Card,
    IconButton,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions
} from '@mui/material';
import { Edit as EditIcon, Delete as DeleteIcon } from '@mui/icons-material';
import api from '../api';

const RecipeNotes = ({ recipeId }) => {
    const [notes, setNotes] = useState([]);
    const [newNote, setNewNote] = useState({ title: '', notes: '', rating: 5 });
    const [editingNote, setEditingNote] = useState(null);
    const [isDialogOpen, setIsDialogOpen] = useState(false);

    useEffect(() => {
        fetchNotes();
    }, [recipeId]);

    const fetchNotes = async () => {
        try {
            const response = await api.get(`/api/recipe-notes/recipe/${recipeId}`);
            setNotes(response.data);
        } catch (error) {
            console.error('Error fetching notes:', error);
        }
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editingNote) {
                await api.put(`/api/recipe-notes/${editingNote._id}`, newNote);
            } else {
                await api.post('/api/recipe-notes', { ...newNote, recipeId });
            }
            fetchNotes();
            setNewNote({ title: '', notes: '', rating: 5 });
            setEditingNote(null);
            setIsDialogOpen(false);
        } catch (error) {
            console.error('Error saving note:', error);
        }
    };

    const handleEdit = (note) => {
        setEditingNote(note);
        setNewNote({
            title: note.title,
            notes: note.notes,
            rating: note.rating
        });
        setIsDialogOpen(true);
    };

    const handleDelete = async (noteId) => {
        try {
            await api.delete(`/api/recipe-notes/${noteId}`);
            fetchNotes();
        } catch (error) {
            console.error('Error deleting note:', error);
        }
    };

    return (
        <Box sx={{ mt: 4 }}>
            <Button
                variant="contained"
                onClick={() => setIsDialogOpen(true)}
                sx={{
                    mb: 3,
                    backgroundColor: '#E84B7D',
                    '&:hover': { backgroundColor: '#d63d6b' }
                }}
            >
                Add Note
            </Button>

            <Dialog open={isDialogOpen} onClose={() => setIsDialogOpen(false)}>
                <DialogTitle>
                    {editingNote ? 'Edit Note' : 'Add New Note'}
                </DialogTitle>
                <form onSubmit={handleSubmit}>
                    <DialogContent>
                        <TextField
                            label="Title"
                            fullWidth
                            value={newNote.title}
                            onChange={(e) => setNewNote({ ...newNote, title: e.target.value })}
                            margin="normal"
                            required
                        />
                        <TextField
                            label="Notes"
                            fullWidth
                            multiline
                            rows={4}
                            value={newNote.notes}
                            onChange={(e) => setNewNote({ ...newNote, notes: e.target.value })}
                            margin="normal"
                            required
                        />
                        <Box sx={{ mt: 2 }}>
                            <Typography component="legend">Rating</Typography>
                            <Rating
                                value={newNote.rating}
                                onChange={(e, newValue) => setNewNote({ ...newNote, rating: newValue })}
                            />
                        </Box>
                    </DialogContent>
                    <DialogActions>
                        <Button onClick={() => setIsDialogOpen(false)}>Cancel</Button>
                        <Button type="submit" variant="contained">Save</Button>
                    </DialogActions>
                </form>
            </Dialog>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
                {notes.map((note) => (
                    <Card key={note._id} sx={{ p: 2 }}>
                        <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start' }}>
                            <Box>
                                <Typography variant="h6">{note.title}</Typography>
                                <Rating value={note.rating} readOnly />
                                <Typography variant="body1" sx={{ mt: 1 }}>
                                    {note.notes}
                                </Typography>
                            </Box>
                            <Box>
                                <IconButton onClick={() => handleEdit(note)}>
                                    <EditIcon />
                                </IconButton>
                                <IconButton onClick={() => handleDelete(note._id)}>
                                    <DeleteIcon />
                                </IconButton>
                            </Box>
                        </Box>
                    </Card>
                ))}
            </Box>
        </Box>
    );
};

export default RecipeNotes;