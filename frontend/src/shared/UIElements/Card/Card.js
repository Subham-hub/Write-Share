import React from 'react'

import classes from './Card.module.css'

const Card = (props) => {
  return (
    <div
      onClick={props.onClick}
      className={`${classes.card} ${props.className}`}
      style={props.style}
    >
      {props.children}
    </div>
  )
}

export default Card
