import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import Card from '../../shared/UIElements/Card/Card'

import classes from './css/UserBlog.module.css'

const UserBlog = () => {
  const uid = useParams().uid
  const [blogs, setBlogs] = useState([])
  const { allBlogs } = useSelector((s) => s.blogs)
  useEffect(() => setBlogs(allBlogs.filter((blog) => blog.uid === uid)), [
    allBlogs,
    uid,
  ])

  return (
    <div className={classes.content}>
      {blogs.map((blog) => (
        <Card key={blog._id} className={classes.inner}>
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
