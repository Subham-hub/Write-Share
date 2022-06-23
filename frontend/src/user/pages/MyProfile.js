import React, { useEffect, useState } from 'react'
import Avatar from '@mui/material/Avatar'
import Card from '../../shared/UIElements/Card/Card'
import { Link } from 'react-router-dom'
import { Button } from '@mui/material'

import classes from './css/MyProfile.module.css'

const MyProfile = () => {
  const [user, setUser] = useState()
  useEffect(() => setUser(JSON.parse(sessionStorage.getItem('userData'))), [])
  return (
    <>
      {user !== undefined && (
        <div className={classes.content + ' center'}>
          <Card>
            <div className="center">
              <Avatar
                style={{ height: '10rem', width: '10rem' }}
                sizes="larger"
                src={user.avatar.secure_url}
              />
            </div>
            <div className={classes.inner}>
              <Button>
                <Link to={`/edit-profile`}>Edit Profile</Link>
              </Button>
              <h3>
                {user.firstname}
                &nbsp;&nbsp;
                {user.lastname}
              </h3>
              <h3>{user.email}</h3>
              <h3>Blogs posted: {user.blogs.length}</h3>
            </div>
          </Card>
        </div>
      )}
    </>
  )
}

export default MyProfile
