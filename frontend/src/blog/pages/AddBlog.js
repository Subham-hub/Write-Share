import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { Button, Container, Paper, TextField, Typography } from "@mui/material";

import Modal from "../../shared/UIElements/Modal/Modal";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import ImageUploader from "../../shared/UIElements/ImageUploader/ImageUploader";
import { useHttp } from "../../shared/hooks/http-hook";
import { blogActions } from "../../shared/store/blogSlice";
import { userDataActions } from "../../shared/store/userDataSlice";

const AddBlog = () => {
  const [image, setImage] = useState();
  const { isLoading, error, clearError, sendRequest } = useHttp();
  const navigate = useNavigate();
  const { uid, username, token } = useSelector((s) => s.userData);
  const dispatch = useDispatch();
  const { handleSubmit, register } = useForm();

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("author", username);
    formData.append("uid", uid);
    formData.append("image", image);
    try {
      const response = await sendRequest("blogs/add_blog", "POST", formData, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(blogActions.addBlogs({ flag: "add", newBlog: response.blog }));
      if (response)
        dispatch(
          userDataActions.updateData({
            flag: "BLOGS",
            blogFlag: "ADD",
            bid: response.blog._id,
          })
        );
      alert("Successfully Added!");
      navigate("/blog");
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
      {!isLoading && (
        <>
          <Container maxWidth="sm" sx={{ pt: 15 }}>
            <Paper elevation={10} sx={{ bgcolor: "transparent", p: 3 }}>
              <Typography textAlign="center" variant="h3" gutterBottom>
                Add Blog
              </Typography>
              <form autoComplete="off" onSubmit={handleSubmit(onSubmit)}>
                <ImageUploader
                  onImageUpload={(pickedFile) => setImage(pickedFile)}
                />
                <TextField
                  style={{ width: "100%" }}
                  label="Title"
                  {...register("title", { required: true })}
                  sx={{ mt: 2, mb: 2 }}
                />

                <TextField
                  style={{ width: "100%" }}
                  label="Description"
                  multiline
                  rows={5}
                  {...register("description", { minLength: 10 })}
                  sx={{ mb: 2 }}
                />

                <Button fullWidth variant="contained" type="submit">
                  POST
                </Button>
              </form>
            </Paper>
          </Container>
        </>
      )}
    </>
  );
};

export default AddBlog;
