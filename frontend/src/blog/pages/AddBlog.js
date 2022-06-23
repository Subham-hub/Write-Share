import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { useForm } from 'react-hook-form'
import { Button, TextField } from '@mui/material'

import Card from '../../shared/UIElements/Card/Card'
import Modal from '../../shared/UIElements/Modal/Modal'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import ImageUpload from '../../shared/UIElements/ImageUpload/ImageUpload'
import { useHttp } from '../../shared/hooks/http-hook'
import { blogActions } from '../../shared/store/blogSlice'

import classes from './css/AddBlog.module.css'

const AddBlog = () => {
  const [image, setImage] = useState()
  const [imageIsValid, setImageIsVaid] = useState(false)
  const { isLoading, error, clearError, sendRequest } = useHttp()
  const navigate = useNavigate()
  const { uid, name, token } = useSelector((s) => s.userData)
  const dispatch = useDispatch()
  const { handleSubmit, register } = useForm()

  const onSubmit = async (data) => {
    const formData = new FormData()
    formData.append('title', data.title)
    formData.append('description', data.description)
    formData.append('name', name)
    formData.append('uid', uid)
    formData.append('image', image)
    try {
      const response = await sendRequest('blogs/add-blog', 'POST', formData, {
        Authorization: `Bearer ${token}`,
      })
      dispatch(blogActions.addBlogs({ flag: 'add', newBlog: response.blog }))
      navigate('/blog')
    } catch (e) {
      console.log(e)
      throw new Error(
        'Something went wrong while posting the blog, please try again!',
      )
    }
  }

  const imageHandler = (pickedFile, fileIsValid) => {
    setImage(pickedFile)
    setImageIsVaid(fileIsValid)
  }

  return (
    <>
      {
        <Modal
          open={error ? true : false}
          modalDescription={error}
          handleClose={clearError}
        />
      }
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <>
          <div className="center">
            <Card className={classes.content}>
              <header>
                <h1>Add Blog</h1>
              </header>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <ImageUpload onImageUpload={imageHandler} />
                <br />
                <TextField
                  style={{ width: '100%' }}
                  label="Title"
                  {...register('title', { required: true })}
                />
                <br />
                <br />
                <TextField
                  style={{ width: '100%' }}
                  label="Description"
                  multiline
                  rows={7}
                  {...register('description', { minLength: 10 })}
                />
                <br />
                <br />
                <div className={classes.btn}>
                  <Button
                    disabled={!imageIsValid}
                    variant="contained"
                    type="submit"
                  >
                    POST
                  </Button>
                </div>
              </form>
            </Card>
          </div>
        </>
      )}
    </>
  )
}

export default AddBlog
