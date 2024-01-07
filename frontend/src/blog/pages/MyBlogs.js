import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import BLogCard from "../components/BlogCard";
import Button from "@mui/material/Button";

import { Box, Container, Typography } from "@mui/material";

const Blogs = () => {
  const navigate = useNavigate();
  const [blogs, setBlogs] = useState([]);
  const { myBlogs } = useSelector((s) => s.blogs);
  const { username } = useSelector((s) => s.userData);

  const currentTime = new Date().getHours();
  let greeting;
  if (currentTime < 12) {
    greeting = "Good morning";
  } else if (currentTime < 18) {
    greeting = "Good afternoon";
  } else {
    greeting = "Good night";
  }

  useEffect(() => setBlogs(myBlogs), [myBlogs]);

  return (
    <Container maxWidth="xl" sx={{ mt: 15, textAlign: "center" }}>
      <Typography variant="h4" gutterBottom>
        Dashboard
      </Typography>
      <Button variant="contained" onClick={() => navigate("/add-blog")}>
        Add Blog
      </Button>
      <Box mt={1}>
        {blogs && blogs.length !== 0 ? (
          <BLogCard
            blogs={blogs}
            showBtn={true}
            heading={`${greeting} ${username.toLowerCase()}!`}
          />
        ) : (
          <Typography variant="h3">No blogs found! Maybe add one?</Typography>
        )}
      </Box>
    </Container>
  );
};

export default Blogs;
