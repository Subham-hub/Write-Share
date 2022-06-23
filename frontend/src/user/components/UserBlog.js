import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'

import Card from '../../shared/UIElements/Card/Card'

import classes from './css/UserBlog.module.css'

const UserBlog = () => {
  const [blogs, setBlogs] = useState([])
  const uid = useParams().uid

  useEffect(() => {
    const blogs = JSON.parse(sessionStorage.getItem('blogData'))
    setBlogs(blogs.filter((b) => b.uid === uid))
  }, [uid])

  return (
    <div className={classes.content}>
      {blogs.map((blog) => (
        <Card key={blog.id} className={classes.inner}>
          <ul>
            <li>
              <h1>{blog.title}</h1>
              <p>{blog.description}</p>
            </li>
          </ul>
          <hr />
        </Card>
      ))}
    </div>
  )
}

export default UserBlog
