import { useEffect, useState } from "react";
import api from "../api";
import { Box, Typography, CircularProgress } from "@mui/material";
import MealCard from "./MealCard";
import NavBar from "./NavBar";

const FavoriteMeals = () => {
  const [favoriteMeals, setFavoriteMeals] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchFavorites();
  }, []);

  const fetchFavorites = async () => {
    setLoading(true);
    try {
      const response = await api.get("/api/recipes/favorites", {
        withCredentials: true,
      });
      setFavoriteMeals(response.data);
    } catch (error) {
      console.error("Error fetching favorite meals", error);
    } finally {
      setLoading(false);
    }
  };

  const handleFavoriteChange = (mealId) => {
    setFavoriteMeals((prevfavorites) => prevfavorites.filter((meal) => meal.recipeId !== mealId))
  };


  return (
    <Box sx={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #FF6B6B 0%, #E84B7D 100%)',
    }}>
      <NavBar />
      <Box sx={{
        p: 4,
        minHeight: '100vh',
        animation: 'fadeIn 0.5s ease-in-out'
      }}>
        {loading ? (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh'
          }}>
            <CircularProgress sx={{ color: 'white' }} />
          </Box>
        ) : favoriteMeals.length > 0 ? (
          <Box sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: 4,
            justifyContent: "center",
            padding: '20px',
            borderRadius: '20px',
            animation: 'fadeIn 0.5s ease-in-out',
          }}>
            {favoriteMeals.map((meal) => (
              <Box
                key={meal._id}
                sx={{
                  transform: 'translateY(0)',
                  transition: 'transform 0.3s ease',
                  '&:hover': {
                    transform: 'translateY(-8px)'
                  }
                }}
              >
                <MealCard
                  meal={{
                    idMeal: meal.recipeId,
                    strMeal: meal.title,
                    strMealThumb: meal.imageUrl,
                  }}
                  onFetchFavorites={() => handleFavoriteChange(meal.recipeId)}
                  isFavoritePage={true}
                />
              </Box>
            ))}
          </Box>
        ) : (
          <Box sx={{
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'center',
            height: '50vh',
            backgroundColor: 'rgba(255, 255, 255, 0.1)',
            backdropFilter: 'blur(10px)',
            borderRadius: '20px',
            padding: '40px',
            margin: '0 auto',
            maxWidth: '600px',
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          }}>
            <Typography
              variant="h5"
              sx={{
                color: 'white',
                textAlign: 'center',
                fontWeight: 500,
                opacity: 0.9
              }}
            >
              No Favorite Meals Yet
            </Typography>
          </Box>
        )}
      </Box>
    </Box>
  );
};

const styles = {
  '@keyframes fadeIn': {
    from: {
      opacity: 0,
      transform: 'translateY(20px)'
    },
    to: {
      opacity: 1,
      transform: 'translateY(0)'
    }
  }
};

export default FavoriteMeals;
