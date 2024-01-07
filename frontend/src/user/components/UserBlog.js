import React, { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { Container, Paper, Typography } from "@mui/material";

const UserBlog = () => {
  const uid = useParams().uid;
  const [blogs, setBlogs] = useState([]);
  const { allBlogs } = useSelector((s) => s.blogs);
  const navigate = useNavigate();
  useEffect(
    () => setBlogs(allBlogs.filter((blog) => blog.uid === uid)),
    [allBlogs, uid]
  );

  return (
    <Container maxWidth="md">
      {blogs.map((blog, index) => (
        <Paper
          elevation={10}
          key={blog._id}
          sx={{
            bgcolor: "transparent",
            p: 3,
            maxWidth: "100%",
            maxHeight: 300,
            overflowY: "scroll",
            mb: index + 1 !== blogs.length ? 4 : 0,
          }}
        >
          <ul>
            <li>
              <Typography
                variant="h4"
                className="link"
                onClick={() => navigate(`/blog/${blog._id}/details`)}
              >
                {index + 1}. {blog.title}
              </Typography>
              <Typography variant="h6" component="p" m>
                {blog.description}
              </Typography>
            </li>
          </ul>
          <hr />
        </Paper>
      ))}
    </Container>
  );
};

export default UserBlog;
