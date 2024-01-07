import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";

import BlogCard from "../../blog/components/BlogCard";
import background from "../../assets/home-side-img.jpg";

import classes from "./Home.module.css";

const Home = () => {
  const [blogs, setBlogs] = useState([]);
  const { allBlogs } = useSelector((s) => s.blogs);
  useEffect(() => setBlogs(allBlogs), [allBlogs]);

  return (
    <>
      <div
        className={`${classes["m-auto"]} ${classes.content} ${classes["max-width-1"]} ${classes["my-2"]}`}
      >
        <div className={classes["content-left"]}>
          <h1>Welcome To Write &Share!</h1>
          <p>
            Powered by the MERN stack, this portfolio blogs project showcases
            expertise in modern web development. Utilizing React and Redux for
            the front end, MongoDB as the database, and Node.js for the server,
            the application seamlessly integrates a responsive user interface
            with efficient data storage. With Material-UI enhancing the visual
            experience, this project exemplifies a comprehensive skill set in
            full-stack development, leveraging cutting-edge technologies for an
            immersive and dynamic portfolio experience
          </p>
        </div>
        <div className={classes["content-right"]}>
          <img src={background} alt="cat" />
        </div>
      </div>
      <div className={`${classes["max-width-1"]} ${classes["m-auto"]}`}>
        <hr />
      </div>
      <BlogCard blogs={blogs} />
    </>
  );
};

export default Home;
