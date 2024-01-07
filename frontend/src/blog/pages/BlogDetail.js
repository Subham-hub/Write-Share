import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { Link, useParams } from "react-router-dom";
import { Box, Container, Typography } from "@mui/material";

const BlogDetail = () => {
  const [blog, setBlog] = useState();
  const bid = useParams().bid;
  const { allBlogs } = useSelector((s) => s.blogs);
  useEffect(() => {
    setBlog(allBlogs.find((b) => b._id === bid));
  }, [bid, allBlogs]);

  return (
    blog && (
      <Container
        maxWidth="xl"
        sx={{
          mt: 10,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "90vh",
        }}
      >
        <Box maxHeight={300} maxWidth={300}>
          <img
            src={blog.image.secure_url}
            height="100%"
            width="100%"
            alt={blog.author + "'s blog"}
          />
        </Box>
        <Typography variant="h2">{blog.title}</Typography>
        <Typography variant="h5">
          Author -{" "}
          <Link className="link" to={`/${blog.uid}/profile`}>
            {blog.author}
          </Link>
        </Typography>
        <Typography component="time" fontWeight="bold">
          {new Date(blog.createdAt).toLocaleDateString("en-US", {
            dateStyle: "long",
          })}
        </Typography>
        <hr />
        <Typography
          p={1}
          bgcolor="white"
          variant="h6"
          component="p"
          gutterBottom
        >
          {blog.description}
        </Typography>
      </Container>
    )
  );
};

export default BlogDetail;
