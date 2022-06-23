import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'

import classes from './css/BlogDetail.module.css'

const BlogDetail = () => {
  const [blogs, setBlogs] = useState([])
  const bid = useParams().bid
  const { allBlogs } = useSelector((s) => s.blogs)
  useEffect(() => setBlogs(allBlogs.find((b) => b._id === bid)), [
    bid,
    allBlogs,
  ])

  return (
    <>
      <div className={classes['post-img']}>
        <img src={blogs.image} alt={blogs.name + "'s blog"} />
      </div>
      <div
        className={`${classes['m-auto']} ${classes['blog-post-content']} ${classes['max-width-2']} ${classes['m-auto']} ${classes['my-2']}`}
      >
        <h1 className="font1">{blogs.title}</h1>
        <div className={classes['blogpost-meta']}>
          <div className={classes['author-info']}>
            <div>
              <b>Author - {blogs.name}</b>
            </div>
            <div>04 January. 6 min read</div>
          </div>
          <div className="social"></div>
        </div>
        <p className={classes.font1}>{blogs.description}</p>
      </div>
      <div className="max-width-1 m-auto">
        <hr />
      </div>
    </>
  )
}

export default BlogDetail
