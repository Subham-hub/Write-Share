import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'

import Card from '../../shared/UIElements/Card/Card'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import { useHttp } from '../../shared/hooks/http-hook'
import { authActions } from '../../shared/store/authSlice'
import { autoLogin } from '../../shared/store/userDataSlice'

import classes from './css/Auth.module.css'
import ImageUpload from '../../shared/UIElements/ImageUpload/ImageUpload'

const Auth = () => {
  const [image, setImage] = useState()
  const [imageIsValid, setImageIsVaid] = useState(false)
  const { isLoading, sendRequest, error, clearError } = useHttp()
  const { isLoggingIn } = useSelector((s) => s.auth)
  const navigate = useNavigate()
  const dispatch = useDispatch()

  const { handleSubmit, register } = useForm()

  const onSubmit = async (data) => {
    if (!isLoggingIn && data.password !== data.confirmPassword)
      return alert('Please enter exact passwords')
    const formData = new FormData()
    formData.append('email', data.email)
    formData.append('password', data.password)
    if (!isLoggingIn) {
      formData.append('firstname', data.firstname)
      formData.append('lastname', data.lastname)
      formData.append('avatar', image)
    }
    let response
    if (isLoggingIn) {
      try {
        response = await sendRequest('users/login', 'POST', formData)
      } catch (e) {
        throw new Error(
          'Something went wrong while logging in, please try again!',
        )
      }
    } else {
      try {
        response = await sendRequest('users/signup', 'POST', formData)
      } catch (e) {
        throw new Error(e)
      }
    }
    if (response) {
      const userData = JSON.stringify({
        uid: response.user._id,
        token: response.token,
      })
      localStorage.setItem('userData', userData)
      dispatch(authActions.login())
      dispatch(autoLogin())
    }
    navigate('/')
  }
  const imageHandler = (pickedFile, fileIsValid) => {
    setImage(pickedFile)
    setImageIsVaid(fileIsValid)
  }

  return (
    <>
      <Modal
        open={error ? true : false}
        modalDescription={error}
        handleClose={clearError}
      />
      {isLoading && (
        <div className="center">
          <LoadingSpinner asOverlay />
        </div>
      )}
      {!isLoading && (
        <div className="center">
          <div className={`${classes.content} center`}>
            <Card className={classes.inner}>
              <header>
                <h2>{isLoggingIn ? 'LOG-IN' : 'SIGN-UP'}</h2>
              </header>
              <form onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.inputs}>
                  {!isLoggingIn && (
                    <>
                      <ImageUpload onImageUpload={imageHandler} />
                      <br />
                      <TextField
                        label="First Name"
                        {...register('firstname', { required: true })}
                      />
                      &nbsp;&nbsp;&nbsp;&nbsp;
                      <TextField
                        label="Last Name"
                        {...register('lastname', { required: true })}
                      />
                      <br />
                      <br />
                    </>
                  )}
                  <TextField
                    label="Email"
                    {...register('email', {
                      required: true,
                      pattern: /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                    })}
                  />
                  <br />
                  <br />
                  <TextField
                    type="password"
                    label="Password"
                    {...register('password', { minLength: 6 })}
                  />
                  <br />
                  <br />
                  {!isLoggingIn && (
                    <TextField
                      type="password"
                      label="Confirm Password"
                      {...register('confirmPassword', { minLength: 6 })}
                    />
                  )}
                </div>
                <div className={classes.btn}>
                  <Button
                    disabled={!isLoggingIn && !imageIsValid}
                    type="submit"
                    variant="contained"
                  >
                    {isLoggingIn ? 'log-in' : 'sign-up'}
                  </Button>
                  <Button color="error" type="submit" variant="contained">
                    {isLoggingIn ? 'log-in' : 'sign-up'} with google
                  </Button>
                </div>
              </form>
              <Button
                onClick={() => {
                  if (isLoggingIn) dispatch(authActions.isSigning())
                  else dispatch(authActions.isLogging())
                }}
                color="inherit"
              >
                {isLoggingIn
                  ? 'Not registered? click here to register'
                  : 'Already registered? click here to login'}
              </Button>
            </Card>
          </div>
        </div>
      )}
    </>
  )
}

export default Auth
