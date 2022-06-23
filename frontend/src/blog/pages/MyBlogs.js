import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

import BLogCard from '../components/BlogCard'
import Button from '@mui/material/Button'

import classes from './css/MyBlogs.module.css'

const Blogs = () => {
  const navigate = useNavigate()
  const [blogs, setBlogs] = useState([])
  const { myBlogs } = useSelector((s) => s.blogs)
  const { name } = useSelector((s) => s.userData)

  const currentTime = new Date().getHours()
  let greeting
  if (currentTime < 12) {
    greeting = 'Good morning'
  } else if (currentTime < 18) {
    greeting = 'Good afternoon'
  } else {
    greeting = 'Good night'
  }

  useEffect(() => setBlogs(myBlogs), [myBlogs])

  return (
    <div className={classes.content}>
      <div className={classes.header + ' center'}>
        <h1>Dashboard</h1>
      </div>
      <div className={classes.btn + ' center'}>
        <Button variant="contained" onClick={() => navigate('/add-blog')}>
          Add Blog
        </Button>
      </div>
      <div className={classes.blogs}>
        {blogs && blogs.length !== 0 ? (
          <>
            <BLogCard
              blogs={blogs}
              showBtn={true}
              heading={`${greeting} ${name.toLowerCase()}!`}
            />
          </>
        ) : (
          <p className="fallback center">No blogs found! Maybe add one?</p>
        )}
      </div>
    </div>
  )
}

export default Blogs
