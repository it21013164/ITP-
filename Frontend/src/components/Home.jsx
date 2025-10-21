import  {useEffect , useState , useCallback} from 'react';
import {Box,Button , CircularProgress} from '@mui/material';
import MealCard from './MealCard';
import api from '../api';
import NavBar from './NavBar';


const Home = () => {
    const [categories , setCategories] = useState([]);
    const [selectedCategory , setSelectedCategory] = useState('');
    const [meals,setMeals] = useState([]);
    const [showMeals , setShowMeals] = useState(10);
    const [loading,setLoading] = useState(false);

    useEffect(() => {
        api.get('/api/recipes/categories')
             .then(response => {
                setCategories(response.data.categories);
                if(response.data.categories.length > 0){
                    setSelectedCategory(response.data.categories[0].strCategory);
                }
             })
             .catch(error => console.error('Error fetching categories',error));
    },[]);

    useEffect(() => {
        if (selectedCategory) {
            fetchMealsByCategory(selectedCategory);
        }
    }, [selectedCategory]);

    const fetchMealsByCategory = async (category) => {
        setLoading(true);
        try {
            const response = await api.get(`/api/recipes/meals/${category}`);
            setMeals(response.data);
            setShowMeals(10); 
        } catch (error) {
            console.error("Error fetching meals", error);
        }finally{
            setLoading(false);
        }
    };

    const handleScrollFunction = useCallback(() => {
        if(window.innerHeight + document.documentElement.scrollTop >= document.documentElement.offsetHeight-50){
            setShowMeals(prevShow => prevShow + 10)
        }
    },[]);

    useEffect(() => { //used throttling to show the meals 
        window.addEventListener('scroll',handleScrollFunction);
        return () => window.removeEventListener('scroll',handleScrollFunction);
    },[handleScrollFunction]);

    return(
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
                <Box 
                    sx={{
                        display: 'flex',
                        gap: 2,
                        mb: 4,
                        justifyContent: 'center',
                        flexWrap: 'wrap',
                        padding: '20px',
                        borderRadius: '20px',
                        backgroundColor: 'rgba(255, 255, 255, 0.1)',
                        backdropFilter: 'blur(10px)',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
                    }}
                >
                    {categories.map(category => (
                        <Button 
                            sx={{
                                backgroundColor: selectedCategory === category.strCategory 
                                    ? 'rgba(255, 255, 255, 0.9)'
                                    : 'rgba(255, 255, 255, 0.2)',
                                color: selectedCategory === category.strCategory 
                                    ? '#E84B7D'
                                    : 'white',
                                borderRadius: '20px',
                                textTransform: 'capitalize',
                                fontWeight: 'bold',
                                transition: 'all 0.3s ease',
                                padding: '8px 24px',
                                '&:hover': {
                                    backgroundColor: 'rgba(255, 255, 255, 0.9)',
                                    color: '#E84B7D',
                                    transform: 'translateY(-2px)',
                                    boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                                },
                                '&:active': {
                                    transform: 'translateY(1px)',
                                }
                            }}
                            type='button' 
                            key={category.idCategory}
                            onClick={() => setSelectedCategory(category.strCategory)}
                        >
                            {category.strCategory}
                        </Button>
                    ))}
                </Box>

                {loading ? (
                    <Box sx={{
                        display: 'flex',
                        justifyContent: 'center',
                        alignItems: 'center',
                        height: '50vh'
                    }}>
                        <CircularProgress sx={{ color: 'white' }} />
                    </Box>
                ) : meals.length > 0 && (
                    <Box sx={{
                        display: 'flex',
                        flexWrap: 'wrap',
                        gap: 4,
                        justifyContent: 'center',
                        padding: '20px',
                        animation: 'fadeIn 0.5s ease-in-out'
                    }}>
                        {meals.slice(0, showMeals).map(meal => (
                            <Box 
                                key={meal.idMeal}
                                sx={{
                                    transform: 'translateY(0)',
                                    transition: 'transform 0.3s ease',
                                    '&:hover': {
                                        transform: 'translateY(-8px)'
                                    }
                                }}
                            >
                                <MealCard meal={meal} />
                            </Box>
                        ))}
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


export default Home;