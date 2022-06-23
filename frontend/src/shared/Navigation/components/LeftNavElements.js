import React, { useState } from 'react'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Typography from '@mui/material/Typography'
import Menu from '@mui/material/Menu'
import MenuIcon from '@mui/icons-material/Menu'
import MenuItem from '@mui/material/MenuItem'
import { Link, NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import classes from './LeftNavElements.module.css'
import icon from '../../../assets/icon.png'

const LeftNavElements = () => {
  const [anchorElNav, setAnchorElNav] = useState(null)
  const { isLoggedIn } = useSelector((s) => s.auth)

  const handleOpenNavMenu = (event) => setAnchorElNav(event.currentTarget)
  const handleCloseNavMenu = () => setAnchorElNav(null)

  return (
    <>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ mr: 2, display: { xs: 'none', md: 'flex' } }}
      >
        <Link className={`${classes.link}`} to="/">
          <img
            src={icon}
            alt="icon"
            height="55"
            width="50"
            style={{ paddingTop: '5px' }}
          />
        </Link>
      </Typography>
      <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
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
            vertical: 'bottom',
            horizontal: 'left',
          }}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'left',
          }}
          open={Boolean(anchorElNav)}
          onClose={handleCloseNavMenu}
          sx={{
            display: { xs: 'block', md: 'none' },
          }}
        >
          <div className={classes.navlink}>
            <NavLink to="/">
              <MenuItem onClick={handleCloseNavMenu}>Home</MenuItem>
            </NavLink>
            {isLoggedIn && (
              <NavLink to="/blog">
                <MenuItem onClick={handleCloseNavMenu}>My Blogs</MenuItem>
              </NavLink>
            )}
          </div>
        </Menu>
      </Box>
      <Typography
        variant="h6"
        noWrap
        component="div"
        sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}
      >
        <Link className={`${classes.link}`} to="/">
          <img
            src={icon}
            alt="icon"
            height="55"
            width="50"
            style={{ paddingTop: '5px' }}
          />
        </Link>
      </Typography>
      <Box
        style={{ paddingLeft: '1rem' }}
        sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}
      >
        <div className={classes.homelinks}>
          <NavLink
            onClick={handleCloseNavMenu}
            className={classes.homelink}
            to="/"
          >
            Home
          </NavLink>
          <span style={{ visibility: 'hidden' }}>....</span>
          {isLoggedIn && (
            <NavLink
              onClick={handleCloseNavMenu}
              className={classes.homelink}
              to="/blog"
            >
              My Blogs
            </NavLink>
          )}
          <span style={{ visibility: 'hidden' }}>....</span>
          {/* <NavLink className={classes.homelink} to="/">
            About Me
          </NavLink> */}
        </div>
      </Box>
    </>
  )
}

export default LeftNavElements
