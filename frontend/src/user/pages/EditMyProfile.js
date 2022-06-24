import React, { useEffect, useState } from 'react'
import { Avatar, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useSelector } from 'react-redux'

import Card from '../../shared/UIElements/Card/Card'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import { useHttp } from '../../shared/hooks/http-hook'

import classes from './css/EditMyProfile.module.css'

const EditMyProfile = () => {
  const [user, setUser] = useState()
  const { handleSubmit, register } = useForm()
  const { uid, token } = useSelector((s) => s.userData)
  const { sendRequest, isLoading, error, clearError } = useHttp()

  useEffect(() => setUser(JSON.parse(sessionStorage.getItem('userData'))), [])

  const onSubmit = async (data) => {
    await sendRequest(`users/update_profile/${uid}`, 'PATCH', data, {
      Authorization: `Bearer ${token}`,
    })
    alert('Profile updated successfully!')
  }

  return (
    <>
      <Modal
        open={error ? true : false}
        modalDescription={error}
        handleClose={clearError}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && user && (
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
