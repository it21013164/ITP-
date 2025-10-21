import { useState } from 'react';
import { TextField, Button, Typography, Box, Container, Paper, IconButton, CircularProgress } from '@mui/material';
import { useForm } from 'react-hook-form';
import * as Yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';
import api from "../api";
import { Link } from 'react-router-dom';
import { Visibility, VisibilityOff } from '@mui/icons-material';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const formValidation = Yup.object().shape({
    firstName: Yup.string().required('First Name is required'),
    lastName: Yup.string().required('Last Name is required'),
    email: Yup.string().email('Invalid email format').required('Email is required'),
    phoneNumber: Yup.string().matches(/^[0-9]+$/, 'Must be only digits').min(10, 'Phone number must be at leats 10 digits').required('Phone number is required'),
    password: Yup.string().min(6, 'Password must be at least 6 characters').required('Password is required'),
    confirmPassword: Yup.string().oneOf([Yup.ref('password'), null], 'Passwords must match').required('Confirm Password is required'),
});

const Register = () => {
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm({ resolver: yupResolver(formValidation) });
    const navigate = useNavigate();

    const onSubmit = async (data) => {
        setLoading(true);
        try {
            await api.post('/api/auth/register', {
                firstName: data.firstName,
                lastName: data.lastName,
                email: data.email,
                phoneNumber: data.phoneNumber,
                password: data.password,
            });
            navigate('/');
            toast.success('Registration Successful', { position: 'bottom-right' });
        } catch (error) {
            toast.error('Error in Registration', { position: 'bottom-right' });
        } finally {
            setLoading(false)
        }
    };

    const handleClickShowPassword = () => {
        setShowPassword(!showPassword);
    };


    const handleClickShowConfirmPassword = () => {
        setShowConfirmPassword(!showConfirmPassword);
    }

    return (
        <Box
            sx={{
                background: 'linear-gradient(135deg, #FF6B6B 0%, #E84B7D 100%)',
                minHeight: '100vh',
                display: 'flex',
                justifyContent: 'center',
                alignItems: 'center',
                padding: '20px'
            }}
        >
            <Container maxWidth="sm">
                <Paper
                    elevation={24}
                    sx={{
                        p: { xs: 3, sm: 5 },
                        borderRadius: '20px',
                        boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                        background: 'rgba(255, 255, 255, 0.98)',
                        backdropFilter: 'blur(10px)',
                        maxWidth: 600,
                        mx: 'auto',
                        my: 4
                    }}
                >
                    <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
                        <Typography
                            variant="h4"
                            component="h1"
                            sx={{
                                mb: 4,
                                fontWeight: 700,
                                color: '#2C3E50',
                                textAlign: 'center',
                                position: 'relative',
                                '&:after': {
                                    content: '""',
                                    position: 'absolute',
                                    bottom: -10,
                                    left: '50%',
                                    transform: 'translateX(-50%)',
                                    width: '60px',
                                    height: '4px',
                                    backgroundColor: '#E84B7D',
                                    borderRadius: '2px'
                                }
                            }}
                        >
                            Create Account
                        </Typography>
                        <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ width: '100%' }}>
                            <Box sx={{
                                display: 'grid',
                                gridTemplateColumns: { xs: '1fr', sm: '1fr 1fr' },
                                gap: 3,
                                mb: 3
                            }}>
                                <TextField
                                    label="First Name"
                                    fullWidth
                                    {...register('firstName')}
                                    error={!!errors.firstName}
                                    helperText={errors.firstName?.message}
                                    sx={textFieldStyle}
                                />
                                <TextField
                                    label="Last Name"
                                    fullWidth
                                    {...register('lastName')}
                                    error={!!errors.lastName}
                                    helperText={errors.lastName?.message}
                                    sx={textFieldStyle}
                                />
                                <TextField
                                    label="Email"
                                    fullWidth
                                    {...register('email')}
                                    error={!!errors.email}
                                    helperText={errors.email?.message}
                                    sx={textFieldStyle}
                                />
                                <TextField
                                    label="Phone Number"
                                    fullWidth
                                    {...register('phoneNumber')}
                                    error={!!errors.phoneNumber}
                                    helperText={errors.phoneNumber?.message}
                                    sx={textFieldStyle}
                                />
                                <TextField
                                    label="Password"
                                    type={showPassword ? 'text' : 'password'}
                                    fullWidth
                                    {...register('password')}
                                    error={!!errors.password}
                                    helperText={errors.password?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={handleClickShowPassword}
                                                edge="end"
                                                sx={{ color: '#9CA3AF' }}
                                            >
                                                {showPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                    sx={textFieldStyle}
                                />
                                <TextField
                                    label="Confirm Password"
                                    type={showConfirmPassword ? 'text' : 'password'}
                                    fullWidth
                                    {...register('confirmPassword')}
                                    error={!!errors.confirmPassword}
                                    helperText={errors.confirmPassword?.message}
                                    InputProps={{
                                        endAdornment: (
                                            <IconButton
                                                onClick={handleClickShowConfirmPassword}
                                                edge="end"
                                                sx={{ color: '#9CA3AF' }}
                                            >
                                                {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                                            </IconButton>
                                        )
                                    }}
                                    sx={textFieldStyle}
                                />
                            </Box>
                            <Button
                                type="submit"
                                fullWidth
                                variant="contained"
                                disabled={loading}
                                sx={{
                                    mt: 3,
                                    mb: 2,
                                    backgroundColor: '#E84B7D',
                                    padding: '12px',
                                    borderRadius: '12px',
                                    textTransform: 'none',
                                    fontSize: '1.1rem',
                                    fontWeight: 600,
                                    boxShadow: '0 4px 12px rgba(232, 75, 125, 0.2)',
                                    '&:hover': {
                                        backgroundColor: '#d63d6b',
                                        boxShadow: '0 6px 16px rgba(232, 75, 125, 0.3)',
                                    }
                                }}
                            >
                                {loading ? (
                                    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                                        <CircularProgress size={20} color="inherit" />
                                        <span>Creating account...</span>
                                    </Box>
                                ) : (
                                    'Create Account'
                                )}
                            </Button>
                        </form>
                        <Typography
                            variant="body1"
                            sx={{
                                mt: 3,
                                color: '#6B7280',
                                textAlign: 'center'
                            }}
                        >
                            Already have an account?{" "}
                            <Link
                                to="/"
                                style={{
                                    textDecoration: 'none',
                                    color: '#E84B7D',
                                    fontWeight: 600,
                                    transition: 'color 0.2s',
                                    '&:hover': {
                                        color: '#d63d6b'
                                    }
                                }}
                            >
                                Sign in
                            </Link>
                        </Typography>
                    </Box>
                </Paper>
            </Container>
        </Box>
    );
};

const textFieldStyle = {
    '& .MuiOutlinedInput-root': {
        borderRadius: '12px',
        '&:hover fieldset': {
            borderColor: '#E84B7D',
        },
    },
    '& .MuiOutlinedInput-input': {
        padding: '16px',
    }
};

export default Register;
