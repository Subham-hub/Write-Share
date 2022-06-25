import React, { useState } from 'react'
import { Avatar, Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'
import { useDispatch, useSelector } from 'react-redux'

import Card from '../../shared/UIElements/Card/Card'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import ImageUpload from '../../shared/UIElements/ImageUpload/ImageUpload'
import { useHttp } from '../../shared/hooks/http-hook'

import classes from './css/EditMyProfile.module.css'
import { userDataActions } from '../../shared/store/userDataSlice'

const EditMyProfile = () => {
  const { email, firstname, lastname, avatar, uid, token, blogs } = useSelector(
    (s) => s.userData,
  )
  const dispatch = useDispatch()

  const [modalOpen, setModalOpen] = useState(false)
  const [image, setImage] = useState()
  const [imageIsValid, setImageIsVaid] = useState(false)

  const { handleSubmit, register } = useForm()
  const { sendRequest, isLoading, error, clearError } = useHttp()
  const handleOpen = () => setModalOpen(true)
  const handleClose = () => setModalOpen(false)

  const onSubmit = async (data) => {
    try {
      await sendRequest(`users/update_profile/${uid}`, 'PATCH', data, {
        Authorization: `Bearer ${token}`,
      })
      dispatch(userDataActions.updateData({ flag: 'INFO', ...data }))
      alert('Profile updated successfully!')
    } catch (e) {
      throw new Error(e)
    }
  }
  const imageHandler = (pickedFile, fileIsValid) => {
    setImage(pickedFile)
    setImageIsVaid(fileIsValid)
  }

  const updateProfilePicHandler = async () => {
    handleClose()
    const data = new FormData()
    data.append('newAvatar', image)
    data.append('uid', uid)
    data.append('flag', 'CHANGE_AVATAR')
    try {
      const response = await sendRequest('users/update_pic', 'PATCH', data, {
        Authorization: `Bearer ${token}`,
      })
      dispatch(
        userDataActions.updateData({
          flag: 'AVATAR',
          avatarFlag: 'CHANGE',
          avatar: response.user.avatar,
        }),
      )
      setImage(undefined)
      setImageIsVaid(false)
    } catch (e) {
      throw new Error(e)
    }
  }

  const removeProfilePicHandler = async () => {
    handleClose()
    const data = { uid, flag: 'REMOVE_AVATAR' }
    try {
      await sendRequest('users/update_pic', 'PATCH', data, {
        Authorization: `Bearer ${token}`,
      })
      dispatch(userDataActions.updateData({ flag: 'AVATAR' }))
    } catch (e) {
      throw new Error(e)
    }
  }

  return (
    <>
      <Modal
        open={error ? true : false}
        modalDescription={error}
        handleClose={clearError}
      />
      <Modal
        open={modalOpen}
        modalText=" "
        modalDescription={
          <>
            {avatar.id === null ? (
              <ImageUpload
                style={{ width: '100%' }}
                btnText="select a picture"
                onImageUpload={imageHandler}
              />
            ) : (
              <div className="center">
                <Avatar
                  style={{
                    height: '10rem',
                    width: '10rem',
                  }}
                  sizes="larger"
                  src={avatar.secure_url}
                />
              </div>
            )}
            {imageIsValid && avatar.id === null && (
              <div style={{ marginTop: '0.5rem' }} className="center">
                <Button
                  style={{ width: '70%' }}
                  variant="contained"
                  color="success"
                  onClick={updateProfilePicHandler}
                >
                  Upload
                </Button>
              </div>
            )}
            {avatar.id !== null && (
              <>
                <div
                  style={{ marginTop: '0.5rem', fontSize: '10px' }}
                  className="center"
                >
                  <ImageUpload
                    showPreview={false}
                    btnText="change image"
                    color="success"
                    onImageUpload={imageHandler}
                  />
                  &nbsp;&nbsp;&nbsp;
                  <Button
                    variant="outlined"
                    color="error"
                    onClick={removeProfilePicHandler}
                  >
                    Remove Picture
                  </Button>
                </div>
                <>
                  {imageIsValid && avatar.id !== null && (
                    <div style={{ marginTop: '0.5rem' }} className="center">
                      <Button
                        style={{ width: '70%' }}
                        variant="contained"
                        color="success"
                        onClick={updateProfilePicHandler}
                      >
                        click here to upload
                      </Button>
                    </div>
                  )}
                </>
              </>
            )}
          </>
        }
        handleClose={handleClose}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div className={classes.content + ' center'}>
          <Card>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="center">
                <Avatar
                  style={{ height: '10rem', width: '10rem', cursor: 'pointer' }}
                  sizes="larger"
                  src={avatar.secure_url}
                  onClick={handleOpen}
                />
              </div>
              <h4>No. of posts made: {blogs.length}</h4>
              <br />
              <TextField
                label="First Name"
                defaultValue={firstname}
                {...register('firstname')}
              />
              &nbsp;&nbsp;&nbsp;&nbsp;
              <TextField
                label="Last Name"
                defaultValue={lastname}
                {...register('lastname')}
              />
              <br />
              <br />
              <TextField
                label="Email"
                defaultValue={email}
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
