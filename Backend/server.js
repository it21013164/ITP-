const express = require('express');
const connectDatabase = require('./database/db');
const dotenv = require('dotenv');
const cors = require('cors');
const authRoutes = require('./routes/authRoutes');
const recipeRoutes = require('./routes/recipeRoutes');
const recipeNotesRouter = require('./routes/notesRoutes');

dotenv.config();

connectDatabase();

const app = express();

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true,
}));

app.use(express.json());

app.use('/api/auth', authRoutes);
app.use('/api/recipes', recipeRoutes);
app.use('/api/recipe-notes', recipeNotesRouter);

app.get('/', (req, res) => {
    res.send('Welcome to the Recipe APIs');
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});