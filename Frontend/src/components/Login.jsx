import { useState } from "react";
import { useForm } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as Yup from "yup";
import {
  TextField,
  Button,
  Typography,
  Box,
  Container,
  Paper,
  IconButton,
  CircularProgress
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import api from "../api";
import { Link, useNavigate } from "react-router-dom";
import { toast } from "react-toastify";

const loginFormValidation = Yup.object().shape({
  email: Yup.string()
    .email("Invalid email format")
    .required("Email is required"),
  password: Yup.string().required("Password is required"),
});

const Login = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({ resolver: yupResolver(loginFormValidation) });

  const onSubmit = async (data) => {
    setLoading(true);
    try {
      const response = await api.post("/api/auth/login", {
        email: data.email,
        password: data.password,
      });

      const { token } = response.data;
      localStorage.setItem("token", token);

      toast.success("Login Successful", { position: "bottom-right" });
      navigate('/home');
    } catch (error) {
      console.error("Login error", error.response?.data);
      toast.error("Error! Failed to Login", { position: "bottom-right" });
    } finally {
      setLoading(false);
    }
  };

  const handleShowPassword = () => {
    setShowPassword(!showPassword);
  };

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
            maxWidth: 500,
            mx: 'auto',
            background: 'rgba(255, 255, 255, 0.98)',
            backdropFilter: 'blur(10px)',
          }}
        >
          <Box
            sx={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
            }}
          >
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
              Welcome Back
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)} noValidate style={{ width: '100%' }}>
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Email"
                  fullWidth
                  {...register("email")}
                  error={!!errors.email}
                  helperText={errors.email?.message}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: '#E84B7D',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '16px',
                    }
                  }}
                />
              </Box>
              <Box sx={{ mb: 3 }}>
                <TextField
                  label="Password"
                  type={showPassword ? 'text' : 'password'}
                  fullWidth
                  {...register("password")}
                  error={!!errors.password}
                  helperText={errors.password?.message}
                  InputProps={{
                    endAdornment: (
                      <IconButton
                        onClick={handleShowPassword}
                        edge="end"
                        sx={{ color: '#9CA3AF' }}
                      >
                        {showPassword ? <VisibilityOff /> : <Visibility />}
                      </IconButton>
                    )
                  }}
                  sx={{
                    '& .MuiOutlinedInput-root': {
                      borderRadius: '12px',
                      '&:hover fieldset': {
                        borderColor: '#E84B7D',
                      },
                    },
                    '& .MuiOutlinedInput-input': {
                      padding: '16px',
                    }
                  }}
                />
              </Box>
              <Button
                type="submit"
                fullWidth
                variant="contained"
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
                disabled={loading}
              >
                {loading ? (
                  <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                    <CircularProgress size={20} color="inherit" />
                    <span>Signing in...</span>
                  </Box>
                ) : (
                  'Sign in'
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
              Don't have an account?{" "}
              <Link
                to="/register"
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
                Create an account
              </Link>
            </Typography>
          </Box>
        </Paper>
      </Container>
    </Box>
  );
};

export default Login;