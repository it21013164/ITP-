const express = require('express');
const {getCategories , getMealsByCategory,addFavorite,removeFavorite,getFavorites, getMealDetails} = require('../controllers/recipeController');
const authMiddleware = require('../middleware/authMiddleware');

const router = express.Router();

router.get('/categories',authMiddleware,getCategories);
router.get('/meals/:category',authMiddleware,getMealsByCategory);
router.post('/favorites',authMiddleware,addFavorite);
router.delete('/favorites/:recipeId',authMiddleware,removeFavorite);
router.get('/favorites',authMiddleware,getFavorites);
router.get('/meals/details/:mealId',authMiddleware,getMealDetails);

module.exports = router;