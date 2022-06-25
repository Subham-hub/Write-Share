import React, { useEffect, useState } from 'react'
import { Link, Outlet, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import Avatar from '@mui/material/Avatar'

import Card from '../../shared/UIElements/Card/Card'

import classes from './css/UserProfile.module.css'
import { useHttp } from '../../shared/hooks/http-hook'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'

const UserProfile = () => {
  const uid = useParams().uid
  const [user, setUser] = useState()
  const [showPostBtn, setShowPostBtn] = useState(true)
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const { token } = useSelector((s) => s.userData)
  useEffect(() => {
    const fetchUser = async () => {
      const response = await sendRequest(`users/get_user/${uid}`, 'GET', null, {
        Authorization: `Bearer ${token}`,
      })
      setUser(response)
    }
    fetchUser()
  }, [sendRequest, token, uid])

  return (
    <>
      <Modal
        open={error ? true : false}
        modalDescription="Error"
        handleClose={clearError}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && user && (
        <>
          <div className="center">
            <div className={classes.content}>
              <Card>
                <div className="center">
                  <Avatar
                    className="avatar"
                    alt={user.firstname}
                    src={user.avatar.secure_url}
                    sx={{ width: '10rem', height: '10rem' }}
                  />
                </div>
                <h1>
                  {user.firstname} {user.lastname}
                </h1>
                {user.blogs && <h3>No. of posts made: {user.blogs.length}</h3>}

                {showPostBtn && user.blogs.length !== 0 && (
                  <h1 onClick={() => setShowPostBtn(false)}>
                    <Link
                      className={`${classes.link} link`}
                      to={`/${uid}/profile/posts`}
                    >
                      See all posts made by {user.firstname}
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
      )}
    </>
  )
}

export default UserProfile
