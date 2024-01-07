import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";
import { useForm } from "react-hook-form";

import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import Modal from "../../shared/UIElements/Modal/Modal";
import { useHttp } from "../../shared/hooks/http-hook";
import { blogActions } from "../../shared/store/blogSlice";

const UpdateBlog = () => {
  const [blog, setBlog] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const { token } = useSelector((s) => s.userData);
  const { myBlogs } = useSelector((s) => s.blogs);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();
  const { bid } = useParams();

  useEffect(() => setBlog(myBlogs.find((b) => b._id === bid)), [bid, myBlogs]);

  const onSubmit = async (data) => {
    try {
      await sendRequest(`blogs/edit/${bid}`, "PATCH", data, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(blogActions.editBlogs({ bid, data }));
      navigate("/blog");
      alert("Successfully Edited!");
    } catch (e) {}
  };

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
          <Container maxWidth="md" sx={{ mt: 20 }}>
            <Paper elevation={10} sx={{ p: 4, bgcolor: "transparent" }}>
              <Typography variant="h4" gutterBottom textAlign="center">
                Edit Blog
              </Typography>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <TextField
                  fullWidth
                  label="New Title"
                  defaultValue={blog.title}
                  {...register("title", { required: true })}
                />
                <br />
                <br />
                <TextField
                  fullWidth
                  label="New Description"
                  multiline
                  rows={7}
                  defaultValue={blog.description}
                  sx={{ mb: 3 }}
                  {...register("description", { minLength: 10 })}
                />
                <Button
                  variant="contained"
                  color="secondary"
                  size="large"
                  type="submit"
                  fullWidth
                >
                  UPDATE
                </Button>
              </form>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
};

export default UpdateBlog;
