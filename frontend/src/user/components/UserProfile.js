import React, { useEffect, useState } from 'react'
import { Link, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'

import Card from '../../shared/UIElements/Card/Card'

import classes from './css/UserProfile.module.css'

const UserProfile = () => {
  const [user, setUser] = useState([])
  const [showPostBtn, setShowPostBtn] = useState(true)
  const { uid } = useSelector((s) => s.userData)

  useEffect(() => setUser(JSON.parse(sessionStorage.getItem('userData'))), [])
  const { name, image, blogs } = user

  return (
    <>
      <div className="center">
        <div className={classes.content}>
          <Card>
            <div className="center">
              <Avatar
                className="avatar"
                alt={name}
                src={image}
                sx={{ width: '10rem', height: '10rem' }}
              />
            </div>
            <h1>{name}</h1>
            {blogs && <h3>No. of posts made: {blogs.length}</h3>}

            {showPostBtn && blogs && blogs.length !== 0 && (
              <h1 onClick={() => setShowPostBtn(false)}>
                <Link
                  className={`${classes.link} link`}
                  to={`/${uid}/profile/posts`}
                >
                  See all posts made by {name}
                </Link>
              </h1>
            )}
          </Card>
        </div>
      </div>
      {!showPostBtn && (
        <div className={`${classes.blogs} center`}>
          <Outlet />
        </div>
      )}
    </>
  )
}

export default UserProfile
