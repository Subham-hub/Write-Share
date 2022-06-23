import React from 'react'
import AppBar from '@mui/material/AppBar'
import Toolbar from '@mui/material/Toolbar'
import Container from '@mui/material/Container'
import { makeStyles } from '@material-ui/core/styles'

import RightNavElements from './components/RightNavElements'
import LeftNavElements from './components/LeftNavElements'

const useStyles = makeStyles({
  navbar: {
    backgroundColor: '#242B2E',
  },
})

const NavBar = () => {
  const styles = useStyles()

  return (
    <AppBar position="fixed" className={styles.navbar}>
      <Container maxWidth="xl" className={styles.navbar}>
        <Toolbar disableGutters>
          <LeftNavElements />
          <RightNavElements />
        </Toolbar>
      </Container>
    </AppBar>
  )
}
export default NavBar
