import { useState } from "react";
import { AppBar, Toolbar, Box, Button, IconButton } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import { Logout } from "@mui/icons-material";
import { toast } from "react-toastify";
import ConfirmationDialog from "./ConfirmationDialog";

const NavBar = () => {
  const navigate = useNavigate();
  const [popupOpen,setPopupOpen] = useState(false);

  const logout = () => {
    localStorage.removeItem("token");
    toast.success("Logout Successfully", { position: "bottom-right" });
    navigate("/");
  };

  const handleOpenPopup = () => {
    setPopupOpen(true);
  };

  const handleClosePopup = () => {
    setPopupOpen(false);
  }

  return (
    <>
    <AppBar position="static" color="transparent" elevation={0}>
      <Toolbar>
        <Box
          sx={{ flexGrow:1,flexWrap:'wrap', display: "flex", justifyContent: "space-evenly" }}
        >
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none" , color:'black'}}
              to="/home"
            >
              HOME
            </Link>
          </Button>
          <Button color="inherit">
            <Link
              style={{ textDecoration: "none",color:'black'}}
              to="/favorites"
            >
              FAVORITE
            </Link>
          </Button>
          <IconButton onClick={handleOpenPopup}>
            <Logout />
          </IconButton>
        </Box>
      </Toolbar>
    </AppBar>
    <ConfirmationDialog open={popupOpen} onClose={handleClosePopup} onConfirm={() => {logout();setPopupOpen(false)}} title="Confirm Logout" message="Are you sure want to log out ?" />
    </>
  );
};

export default NavBar;
