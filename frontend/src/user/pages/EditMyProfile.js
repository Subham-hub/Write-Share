import { Avatar, Button, TextField } from '@mui/material'
import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'
import Card from '../../shared/UIElements/Card/Card'

import classes from './css/EditMyProfile.module.css'

const EditMyProfile = () => {
  const [user, setUser] = useState()
  const { handleSubmit, register } = useForm()

  useEffect(() => setUser(JSON.parse(sessionStorage.getItem('userData'))), [])

  const onSubmit = async (data) => {
    console.log(data)
  }

  console.log(user)
  return (
    <>
      {user && (
        <div className={classes.content + ' center'}>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="center">
                <Avatar
                  style={{ height: '10rem', width: '10rem' }}
                  sizes="larger"
                  src={user.avatar.secure_url}
                />
              </div>
              <br />
              <TextField
                label="First Name"
                defaultValue={user.firstname}
                {...register('firstname')}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                label="Last Name"
                defaultValue={user.lastname}
                {...register('lastname')}
              />
              <br />
              <br />
              <TextField
                label="Email"
                defaultValue={user.email}
                fullWidth={true}
                {...register('email')}
              />
              <br />
              <br />
              <Button variant="outlined" color="inherit" type="submit">
                Update
              </Button>
            </form>
          </Card>
        </div>
      )}
    </>
  )
}

export default EditMyProfile
