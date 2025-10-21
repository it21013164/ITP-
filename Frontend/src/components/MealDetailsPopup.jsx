/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import { useEffect, useState } from 'react';
import { Dialog, DialogTitle, DialogContent, Typography, CircularProgress, Box, IconButton } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import RecipeNotes from './RecipeNotes';
import api from '../api';


const MealDetailsPopup = ({ open, close, mealId }) => {
    const [mealDetails, setMealDetails] = useState(null);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        if (mealId && open) {
            setLoading(true);
            api.get(`/api/recipes/meals/details/${mealId}`, { withCredentials: true })
                .then(response => { setMealDetails(response.data); setLoading(false) })
                .catch(error => {
                    console.error('Error fetching meal details', error);
                    setLoading(false);
                })
        }
    }, [mealId, open]);

    return (
        <Dialog 
            open={open} 
            onClose={close} 
            maxWidth="lg" 
            fullWidth
            PaperProps={{
                sx: {
                    minHeight: 600,
                    maxWidth: '95vw',
                    maxHeight: '95vh',
                    borderRadius: 4,
                    boxShadow: 8,
                    overflow: 'hidden'
                }
            }}
        >
            <DialogTitle sx={{textAlign:'center', fontWeight: 700, fontSize: 28, pb: 0}}>
                Meal Details
            </DialogTitle>
            <DialogContent
                dividers
                sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 4,
                    p: 4,
                    maxHeight: '85vh',
                    overflowY: 'auto'
                }}
            >
                {loading ? (
                    <Box sx={{display:'flex',justifyContent:'center',alignItems:'center',width:'100%',height:300}}>
                        <CircularProgress />
                    </Box>
                ) : (
                    mealDetails && (
                        <>
                            <Box sx={{
                                display: 'flex',
                                flexDirection: { xs: 'column', md: 'row' },
                                gap: 4,
                            }}>
                                {/* Image Section */}
                                <Box sx={{
                                    flex: '0 0 320px',
                                    display: 'flex',
                                    justifyContent: 'center',
                                    alignItems: 'flex-start'
                                }}>
                                    <img 
                                        src={mealDetails.strMealThumb} 
                                        alt={mealDetails.strMeal} 
                                        style={{
                                            width: '100%',
                                            maxWidth: 300,
                                            borderRadius: '16px',
                                            boxShadow: '0 4px 24px rgba(0,0,0,0.12)'
                                        }} 
                                    />
                                </Box>

                                {/* Details Section */}
                                <Box sx={{ flex: 1, minWidth: 0 }}>
                                    <Typography variant="h5" sx={{fontWeight: 600, mb: 2}}>
                                        {mealDetails.strMeal}
                                    </Typography>
                                    <Typography variant='body1' color='text.secondary' sx={{mb: 1}}>
                                        <strong>Category:</strong> {mealDetails.strCategory}
                                    </Typography>
                                    <Typography variant='body1' color='text.secondary' sx={{mb: 3}}>
                                        <strong>Area:</strong> {mealDetails.strArea}
                                    </Typography>
                                    <Typography variant='body1' sx={{whiteSpace: 'pre-line'}}>
                                        <strong>Instructions:</strong><br />
                                        {mealDetails.strInstructions}
                                    </Typography>
                                </Box>
                            </Box>

                            {/* Notes Section */}
                            <Box sx={{ 
                                borderTop: '1px solid rgba(0,0,0,0.12)', 
                                pt: 4 
                            }}>
                                <RecipeNotes recipeId={mealDetails.idMeal} />
                            </Box>
                        </>
                    )
                )}
            </DialogContent>
        </Dialog>
    );
};

export default MealDetailsPopup;