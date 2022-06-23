import React, { useEffect, useState } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { useDispatch, useSelector } from 'react-redux'
import { Button, TextField } from '@mui/material'
import { useForm } from 'react-hook-form'

import Card from '../../shared/UIElements/Card/Card'
import LoadingSpinner from '../../shared/UIElements/LoadingSpinner/LoadingSpinner'
import Modal from '../../shared/UIElements/Modal/Modal'
import { useHttp } from '../../shared/hooks/http-hook'
import { blogActions } from '../../shared/store/blogSlice'

import classes from './css/UpdateBlog.module.css'

const UpdateBlog = () => {
  const [blog, setBlog] = useState()
  const { isLoading, error, clearError, sendRequest } = useHttp()
  const { token } = useSelector((s) => s.userData)
  const { myBlogs } = useSelector((s) => s.blogs)
  const navigate = useNavigate()
  const dispatch = useDispatch()
  const { handleSubmit, register } = useForm()
  const bid = useParams().bid

  useEffect(() => setBlog(myBlogs.find((b) => b._id === bid)), [bid, myBlogs])

  const onSubmit = async (data) => {
    try {
      await sendRequest(`blogs/edit/${bid}`, 'PATCH', data, {
        Authorization: `Bearer ${token}`,
      })
      dispatch(blogActions.editBlogs({ bid, data }))
      navigate('/blog')
    } catch (e) {
      throw new Error(
        'Something went wrong while edting the blog, please try again',
      )
    }
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
      {!isLoading && blog && (
        <>
          <div className={`${classes.content} center`}>
            <Card className={classes.inner}>
              <header>
                <h1>Edit Blog</h1>
              </header>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <div className={classes.inputs}>
                  <TextField
                    style={{ width: '100%' }}
                    label="New Title"
                    defaultValue={blog.title}
                    {...register('title', { required: true })}
                  />
                  <br />
                  <br />
                  <TextField
                    style={{ width: '100%' }}
                    label="New Description"
                    multiline
                    rows={7}
                    defaultValue={blog.description}
                    {...register('description', { minLength: 10 })}
                  />
                </div>
                <br />
                <div className={classes.btn}>
                  <Button
                    variant="contained"
                    color="secondary"
                    size="large"
                    type="submit"
                  >
                    UPDATE
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

export default UpdateBlog
