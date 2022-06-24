import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import Box from '@mui/material/Box'
import IconButton from '@mui/material/IconButton'
import Avatar from '@mui/material/Avatar'
import MenuItem from '@mui/material/MenuItem'
import Menu from '@mui/material/Menu'
import MoreIcon from '@mui/icons-material/MoreVert'
import { Button } from '@mui/material'

import { useHttp } from '../../hooks/http-hook'
import { authActions, serverLogout } from '../../store/authSlice'

const RightNavElements = () => {
  const [user, setUser] = useState()
  const { uid } = useSelector((s) => s.userData)
  const { isLoggedIn, isLoggingIn } = useSelector((s) => s.auth)
  const { sendRequest } = useHttp()
  const dispatch = useDispatch()
  const navigate = useNavigate()

  const [anchorEl, setAnchorEl] = useState(null)
  const [mobileMoreAnchorEl, setMobileMoreAnchorEl] = useState(null)

  const isMenuOpen = Boolean(anchorEl)
  const isMobileMenuOpen = Boolean(mobileMoreAnchorEl)

  const handleProfileMenuOpen = (event) => {
    setAnchorEl(event.currentTarget)
  }

  const handleMobileMenuClose = () => {
    setMobileMoreAnchorEl(null)
  }

  const handleMenuClose = () => {
    setAnchorEl(null)
    handleMobileMenuClose()
  }

  const handleMobileMenuOpen = (event) => {
    setMobileMoreAnchorEl(event.currentTarget)
  }

  const menuId = 'primary-search-account-menu'
  const renderMenu = (
    <Menu
      anchorEl={anchorEl}
      anchorOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      id={menuId}
      keepMounted
      transformOrigin={{
        vertical: 'top',
        horizontal: 'right',
      }}
      open={isMenuOpen}
      onClose={handleMenuClose}
    >
      {isLoggedIn && (
        <Link to={`/my-profile`}>
          <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
        </Link>
      )}
      {!isLoggedIn && (
        <div>
          <Link to={'/login'}>
            <MenuItem onClick={handleMenuClose}>Login</MenuItem>
          </Link>
          <Link to={'/signup'}>
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
  )

  const mobileMenuId = 'primary-search-account-menu-mobile'
  const renderMobileMenu = (
    <div>
      {isLoggedIn && (
        <Menu
          anchorEl={mobileMoreAnchorEl}
          anchorOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          id={mobileMenuId}
          keepMounted
          transformOrigin={{
            vertical: 'top',
            horizontal: 'right',
          }}
          open={isMobileMenuOpen}
          onClose={handleMobileMenuClose}
        >
          <Link to={`/my-profile`}>
            <MenuItem onClick={handleMenuClose}>Settings</MenuItem>
          </Link>
          <Link to="/" onClick={() => dispatch(serverLogout())}>
            <MenuItem onClick={handleMenuClose}>Logout</MenuItem>
          </Link>
        </Menu>
      )}
    </div>
  )
  const notLoggedinBtn = (
    <Button
      variant="outlined"
      onClick={() => {
        navigate('/auth')
        if (isLoggingIn) dispatch(authActions.isSigning())
        else dispatch(authActions.isLogging())
      }}
    >
      {!isLoggingIn ? 'Login' : 'Signup'}
    </Button>
  )

  useEffect(() => {
    const fetchUser = async () => {
      try {
        const user = JSON.parse(sessionStorage.getItem('userData'))
        setUser(user)
      } catch (e) {}
    }
    fetchUser()
  }, [uid, sendRequest])

  return (
    <Box sx={{ flexGrow: -1 }}>
      <Box sx={{ flexGrow: 1 }} />
      <Box sx={{ display: { xs: 'none', md: 'flex' } }}>
        {isLoggedIn ? (
          <Avatar
            style={{ cursor: 'pointer' }}
            src={user ? user.avatar.secure_url : null}
            alt={user ? 'Avatar of ' + user.name : 'Profile Pic'}
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
      <Box sx={{ display: { xs: 'flex', md: 'none' } }}>
        {isLoggedIn ? (
          <IconButton
            size="large"
            aria-label="show more"
            aria-controls={mobileMenuId}
            aria-haspopup="true"
            onClick={handleMobileMenuOpen}
            color="inherit"
          >
            <MoreIcon />
          </IconButton>
        ) : (
          notLoggedinBtn
        )}
      </Box>

      {renderMobileMenu}
      {renderMenu}
    </Box>
  )
}

export default RightNavElements
