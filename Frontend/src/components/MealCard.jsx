/* eslint-disable react/prop-types */
import { useState, useEffect } from "react";
import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  IconButton,
  Button,
} from "@mui/material";
import FavoriteIcon from "@mui/icons-material/Favorite";
import MealDetailsPopup from "./MealDetailsPopup";
import api from "../api";
import { toast } from "react-toastify";

const MealCard = ({ meal, onFetchFavorites, isFavoritePage = false }) => {
  const [favorite, setFavorite] = useState(false);
  const [popupOpen, setPopupOpen] = useState(false);

  useEffect(() => {
    const checkFavoriteStatus = async () => {
      try {
        const response = await api.get("/api/recipes/favorites", {
          withCredentials: true,
        });
        const isFav = response.data.some(
          (favMeal) => favMeal.recipeId === meal.idMeal
        );
        setFavorite(isFav);
      } catch (error) {
        console.error("Error fetching favorite status", error);
      }
    };

    if (!isFavoritePage) checkFavoriteStatus();
  }, [meal.idMeal, isFavoritePage]);

  const handleUpdateFavorite = async () => {
    try {
      if (favorite || isFavoritePage) {
        await api.delete(`/api/recipes/favorites/${meal.idMeal}`, {
          withCredentials: true,
        });
        setFavorite(false);
        onFetchFavorites(meal.idMeal); 
        toast.success("Meal removed successfully", {
          position: "bottom-right",
        });
      } else {
        await api.post(
          "/api/recipes/favorites",
          {
            recipeId: meal.idMeal,
            title: meal.strMeal,
            imageUrl: meal.strMealThumb,
          },
          { withCredentials: true }
        );
        setFavorite(true);
        toast.success("Meal added to favorites", { position: "bottom-right" });
      }
    } catch (error) {
      console.error("Error adding favorites", error);
    }
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  };

   return (
    <>
      <Card
        onClick={handleOpenPopup}
        sx={{
          cursor: 'pointer',
          width: 300,
          height: 380,
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
          backgroundColor: '#fff',
          boxShadow: '0 8px 24px rgba(0,0,0,0.12)',
          borderRadius: '20px',
          overflow: 'hidden',
          transition: 'all 0.3s ease-in-out',
          '&:hover': {
            transform: 'translateY(-8px)',
            boxShadow: '0 16px 45px rgba(0,0,0,0.15)',
          },
        }}
      >
        <CardMedia
          component="img"
          height="200"
          image={meal.strMealThumb}
          alt={meal.strMeal}
          loading="lazy"
          sx={{
            objectFit: 'cover',
            transition: 'transform 0.3s ease',
            '&:hover': {
              transform: 'scale(1.05)',
            },
          }}
        />
        <CardContent
          sx={{
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            padding: '20px',
          }}
        >
          <Typography 
            variant="h6" 
            sx={{
              fontWeight: 600,
              fontSize: '1.2rem',
              color: '#2C3E50',
              mb: 1,
              lineHeight: 1.3,
              overflow: 'hidden',
              textOverflow: 'ellipsis',
              display: '-webkit-box',
              WebkitLineClamp: 2,
              WebkitBoxOrient: 'vertical',
            }}
          >
            {meal.strMeal}
          </Typography>
          
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            marginTop: 'auto'
          }}>
            {isFavoritePage ? (
              <Button
                variant="contained"
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateFavorite();
                }}
                sx={{
                  width: '100%',
                  backgroundColor: '#E84B7D',
                  borderRadius: '12px',
                  padding: '8px 16px',
                  textTransform: 'none',
                  fontWeight: 600,
                  '&:hover': {
                    backgroundColor: '#d63d6b',
                  },
                }}
              >
                Remove from Favorites
              </Button>
            ) : (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  handleUpdateFavorite();
                }}
                sx={{
                  backgroundColor: favorite ? 'rgba(232, 75, 125, 0.1)' : 'transparent',
                  borderRadius: '12px',
                  padding: '8px',
                  transition: 'all 0.2s ease',
                  '&:hover': {
                    backgroundColor: 'rgba(232, 75, 125, 0.2)',
                    transform: 'scale(1.1)',
                  },
                }}
              >
                <FavoriteIcon 
                  sx={{ 
                    fontSize: '28px',
                    color: favorite ? '#E84B7D' : 'rgba(0,0,0,0.4)',
                  }} 
                />
              </IconButton>
            )}
          </div>
        </CardContent>
      </Card>
      <MealDetailsPopup
        open={popupOpen}
        close={handleClosePopup}
        mealId={meal.idMeal}
      />
    </>
  );
};

export default MealCard;
