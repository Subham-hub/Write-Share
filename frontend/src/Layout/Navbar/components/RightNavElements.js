import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Avatar, Box, Button, IconButton, Menu, MenuItem } from "@mui/material";

import { authActions, serverLogout } from "../../../shared/store/authSlice";

const RightNavElements = () => {
  const { avatar, useranme } = useSelector((s) => s.userData);
  const { isLoggedIn, isLoggingIn } = useSelector((s) => s.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [anchorEl, setAnchorEl] = useState(null);
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null);

  const isMenuOpen = Boolean(anchorEl);
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl);

  const handleMobileMenuClose = () => setMobileMoreAnchorEl(null);
  const handleMobileMenuOpen = (e) => setMobileMoreAnchorEl(e.currentTarget);
  const handleProfileMenuOpen = (e) => setAnchorEl(e.currentTarget);
  const handleMenuClose = () => {
    setAnchorEl(null);
    handleMobileMenuClose();
  };

  const menuId = "primary-search-account-menu";
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: "top",
        horizontal: "right",
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn && (
        <Link to={`/my-profile`}>
          <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
        </Link>
      )}
      {!isLoggedIn && (
        <div>
          <Link to={"/login"}>
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Link>
          <Link to={"/signup"}>
            <MenuItem onClick={handleMenuClose}>Signup</MenuItem>
          </Link>
        </div>
      )}
      {isLoggedIn && (
        <Link to="/" onClick={() => dispatch(serverLogout())}>
          <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
        </Link>
      )}
    </Menu>
  );

  const mobileMenuId = "primary-search-account-menu-mobile";
  const renderMobileMenu = (
    <div>
      {isLoggedIn && (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "right",
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <Link to={`/my-profile`}>
            <MenuItem onClick={handleMenuClose}>Profile</MenuItem>
          </Link>
          <Link to="/" onClick={() => dispatch(serverLogout())}>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Link>
        </Menu>
      )}
    </div>
  );
  const notLoggedinBtn = (
    <Button
      variant="outlined"
      onClick={() => {
        navigate("/auth");
        if (isLoggingIn) dispatch(authActions.isSigning());
        else dispatch(authActions.isLogging());
      }}
    >
      {!isLoggingIn ? "Login" : "Signup"}
    </Button>
  );

  return (
    <Box sx={{ flexGrow: -1 }}>
      <Box sx={{ display: { xs: "none", md: "flex" } }}>
        {isLoggedIn ? (
          <Avatar
            style={{ cursor: "pointer" }}
            src={avatar.secure_url}
            alt={"Avatar of " + useranme}
            size="large"
            edge="end"
            aria-label="account of current user"
            aria-controls={menuId}
            aria-haspopup="true"
            onClick={handleProfileMenuOpen}
            color="inherit"
          />
        ) : (
          notLoggedinBtn
        )}
      </Box>
      {/*for mobile */}
      <Box sx={{ display: { xs: "flex", md: "none" } }}>
        {isLoggedIn ? (
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <Avatar src={avatar.secure_url} alt={"Avatar of " + useranme} />
          </IconButton>
        ) : (
          notLoggedinBtn
        )}
      </Box>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  );
};

export default RightNavElements;
