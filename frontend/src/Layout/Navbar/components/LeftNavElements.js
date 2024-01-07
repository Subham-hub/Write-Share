import React, { useState } from "react";
import { Box, IconButton, Menu, MenuItem, Typography } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import { Link, NavLink, useLocation } from "react-router-dom";
import { useSelector } from "react-redux";

import icon from "../../../assets/icon.png";

const LeftNavElements = () => {
  const [anchorElNav, setAnchorElNav] = useState(null);
  const { isLoggedIn } = useSelector((s) => s.auth);
  const { pathname } = useLocation();

  const handleOpenNavMenu = (e) => setAnchorElNav(e.currentTarget);
  const handleCloseNavMenu = () => setAnchorElNav(null);

  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: "none", md: "flex" } }}
      >
        <Link to="/">
          <img
            src={icon}
            alt="icon"
            height="55"
            width="50"
            style={{ paddingTop: "5px" }}
          />
        </Link>
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}>
        <IconButton
          size="large"
          aria-label="account of current user"
          aria-controls="menu-appbar"
          aria-haspopup="true"
          onClick={handleOpenNavMenu}
          color="inherit"
        >
          <MenuIcon />
        </IconButton>
        <Menu
          id="menu-appbar"
          anchorEl={anchorElNav}
          anchorOrigin={{
            vertical: "bottom",
            horizontal: "left",
          }}
          keepMounted
          transformOrigin={{
            vertical: "top",
            horizontal: "left",
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: "block", md: "none" },
          }}
        >
          <NavLink to="/">
            <MenuItem onClick={handleCloseNavMenu}>Home</MenuItem>
          </NavLink>
          {isLoggedIn && (
            <NavLink to="/blog">
              <MenuItem onClick={handleCloseNavMenu}>My Blogs</MenuItem>
            </NavLink>
          )}
        </Menu>
      </Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: "flex", md: "none" } }}
      >
        <Link to="/">
          <img
            src={icon}
            alt="icon"
            height="55"
            width="50"
            style={{ paddingTop: "5px" }}
          />
        </Link>
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: "none", md: "flex" } }}>
        <Link
          onClick={handleCloseNavMenu}
          style={{ borderBottom: pathname === "/" ? "1px solid orange" : "" }}
          to="/"
        >
          Home
        </Link>
        <span style={{ visibility: "hidden" }}>....</span>
        {isLoggedIn && (
          <Link
            onClick={handleCloseNavMenu}
            style={{
              borderBottom: pathname === "/blog" ? "1px solid orange" : "",
            }}
            to="/blog"
          >
            My Blogs
          </Link>
        )}
      </Box>
    </>
  );
};

export default LeftNavElements;
