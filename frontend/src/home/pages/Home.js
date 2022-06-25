import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'

import BlogCard from '../../blog/components/BlogCard'
import background from '../../assets/home-side-img.jpg'

import classes from './Home.module.css'

const Home = () => {
  const [blogs, setBlogs] = useState([])
  const { allBlogs } = useSelector((s) => s.blogs)
  useEffect(() => setBlogs(allBlogs), [allBlogs])

  return (
    <>
      <div
        className={`${classes['m-auto']} ${classes.content} ${classes['max-width-1']} ${classes['my-2']}`}
      >
        <div className={classes['content-left']}>
          <h1>Welcome To Write &Share!</h1>
          <p>
            Qui nulla duis mollit ad officia qui non proident. Qui incididunt
            veniam proident minim ad. Excepteur aliqua irure occaecat qui
            occaecat. Lorem deserunt sint ipsum commodo esse pariatur excepteur
            ipsum ullamco aliquip. Tempor enim reprehenderit anim officia fugiat
            cillum veniam ea voluptate est exercitation. Consequat veniam nulla
            eu commodo in mollit anim in in. Incididunt duis minim incididunt
            aliquip et tempor enim ex cupidatat adipisicing.
          </p>
        </div>
        <div className={classes['content-right']}>
          <img src={background} alt="cat" />
        </div>
      </div>
      <div className={`${classes['max-width-1']} ${classes['m-auto']}`}>
        <hr />
      </div>
      <BlogCard blogs={blogs} />
    </>
  )
}

export default Home
