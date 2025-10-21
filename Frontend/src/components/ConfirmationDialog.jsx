/* eslint-disable no-unused-vars */
/* eslint-disable react/prop-types */
import React from "react";
import { 
    Dialog, 
    DialogTitle, 
    DialogContent, 
    DialogActions, 
    Button, 
    Typography,
    Box,
    IconButton
} from "@mui/material";
import CloseIcon from '@mui/icons-material/Close';
import LogoutIcon from '@mui/icons-material/Logout';

const ConfirmationDialog = ({
    open,
    onClose,
    onConfirm,
    title = "Confirm Action",
    message = "Are you sure want to proceed ?",
    confirmText = "Yes",
    cancelText = "No",
    confirmColor = "error"
}) => {
    return (
        <Dialog 
            open={open} 
            onClose={onClose}
            PaperProps={{
                sx: {
                    borderRadius: '16px',
                    minWidth: '400px',
                    padding: '16px',
                    boxShadow: '0 8px 32px rgba(0,0,0,0.12)',
                }
            }}
        >
            <IconButton
                aria-label="close"
                onClick={onClose}
                sx={{
                    position: 'absolute',
                    right: 8,
                    top: 8,
                    color: (theme) => theme.palette.grey[500],
                }}
            >
                <CloseIcon />
            </IconButton>

            <DialogTitle 
                sx={{
                    textAlign: 'center',
                    pt: 3,
                    pb: 2,
                }}
            >
                <Box sx={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 2 }}>
                    <Box
                        sx={{
                            backgroundColor: 'error.light',
                            borderRadius: '50%',
                            width: 60,
                            height: 60,
                            display: 'flex',
                            alignItems: 'center',
                            justifyContent: 'center',
                            mb: 2
                        }}
                    >
                        <LogoutIcon sx={{ fontSize: 32, color: 'white' }} />
                    </Box>
                    <Typography variant="h6" component="span" sx={{ fontWeight: 600 }}>
                        {title}
                    </Typography>
                </Box>
            </DialogTitle>

            <DialogContent>
                <Typography 
                    align="center" 
                    sx={{ 
                        color: (theme) => theme.palette.text.secondary,
                        px: 3
                    }}
                >
                    {message}
                </Typography>
            </DialogContent>

            <DialogActions 
                sx={{
                    justifyContent: 'center',
                    gap: 2,
                    pb: 3,
                    px: 3
                }}
            >
                <Button 
                    onClick={onClose} 
                    variant="outlined"
                    sx={{
                        borderRadius: '10px',
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600
                    }}
                >
                    {cancelText}
                </Button>
                <Button 
                    onClick={onConfirm} 
                    variant="contained" 
                    color={confirmColor}
                    sx={{
                        borderRadius: '10px',
                        px: 4,
                        py: 1,
                        textTransform: 'none',
                        fontWeight: 600,
                        boxShadow: '0 4px 12px rgba(211, 47, 47, 0.2)'
                    }}
                >
                    {confirmText}
                </Button>
            </DialogActions>
        </Dialog>
    );
};

export default ConfirmationDialog;