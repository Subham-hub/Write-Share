import React from 'react'

import classes from './Footer.module.css'

const Footer = ({ children }) => {
  return (
    <div className={classes.footer}>
      <p>Copyright &copy;2022{children}</p>
    </div>
  )
}

export default Footer
