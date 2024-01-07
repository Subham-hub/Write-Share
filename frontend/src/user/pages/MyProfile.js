import React, { useEffect, useState } from "react";
import {
  Avatar,
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";

import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import Modal from "../../shared/UIElements/Modal/Modal";
import ImageUploader from "../../shared/UIElements/ImageUploader/ImageUploader";
import { useHttp } from "../../shared/hooks/http-hook";
import { userDataActions } from "../../shared/store/userDataSlice";

const EditMyProfile = () => {
  const { email, username, avatar, uid, token, blogs } = useSelector(
    (s) => s.userData
  );
  const dispatch = useDispatch();

  const [modalOpen, setModalOpen] = useState(false);
  const [image, setImage] = useState(null);
  const [newImagePreview, setNewImagePreview] = useState(null);

  const { handleSubmit, register } = useForm();
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const handleOpen = () => setModalOpen(true);
  const handleClose = () => setModalOpen(false);

  const onSubmit = async (data) => {
    try {
      await sendRequest(`users/update_profile/${uid}`, "PATCH", data, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(userDataActions.updateData({ flag: "INFO", ...data }));
      alert("Profile updated successfully!");
    } catch (e) {}
  };

  const updateProfilePicHandler = async () => {
    const data = new FormData();
    data.append("newAvatar", image);
    data.append("uid", uid);
    data.append("flag", "CHANGE_AVATAR");
    try {
      const response = await sendRequest("users/update_pic", "PATCH", data, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(
        userDataActions.updateData({
          flag: "AVATAR",
          avatarFlag: "CHANGE",
          avatar: response.user.avatar,
        })
      );
      alert("Image updated successfully!");
      setImage(undefined);
    } catch (e) {}
  };

  const removeProfilePicHandler = async () => {
    if (!avatar.secure_url) return alert("There's no image present");
    const data = { uid, flag: "REMOVE_AVATAR" };
    try {
      await sendRequest("users/update_pic", "PATCH", data, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(userDataActions.updateData({ flag: "AVATAR" }));
      setNewImagePreview(null);
      alert("Successfully removed image");
    } catch (e) {}
  };

  useEffect(() => {
    if (image) {
      const reader = new FileReader();
      reader.onload = () => setNewImagePreview(reader.result);
      reader.readAsDataURL(image);
      handleClose();
    }
  }, [image]);

  return (
    <>
      <Modal
        open={error ? true : false}
        modalDescription={error}
        handleClose={clearError}
      />
      <Modal open={modalOpen} modalText=" " handleClose={handleClose}>
        <ImageUploader onImageUpload={(image) => setImage(image)} />
      </Modal>
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <Container
          maxWidth="md"
          sx={{
            mt: 13,
          }}
        >
          <Paper elevation={10} sx={{ bgcolor: "transparent", p: 5 }}>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Avatar
                style={{
                  height: "10rem",
                  width: "10rem",
                  display: "block",
                  margin: "auto",
                }}
                alt={username}
                src={newImagePreview ? newImagePreview : avatar.secure_url}
              />
              <Box textAlign="center" mt={2}>
                {image ? (
                  <Button
                    onClick={updateProfilePicHandler}
                    variant="contained"
                    sx={{ mr: 1 }}
                  >
                    Confirm
                  </Button>
                ) : (
                  <Button
                    onClick={handleOpen}
                    variant="contained"
                    color="success"
                    sx={{ mr: 1 }}
                  >
                    Change
                  </Button>
                )}
                <Button
                  variant="contained"
                  color="error"
                  onClick={removeProfilePicHandler}
                  disabled={image || avatar.id ? false : true}
                >
                  Remove
                </Button>
              </Box>
              <Typography variant="h5" textAlign="center" gutterBottom>
                No. of posts made: {blogs.length}
              </Typography>
              <TextField
                label="Username"
                defaultValue={username}
                fullWidth
                {...register("username")}
              />
              <TextField
                label="Email"
                defaultValue={email}
                fullWidth
                {...register("email")}
                sx={{ mt: 2, mb: 2 }}
              />

              <Button
                fullWidth
                variant="outlined"
                color="inherit"
                type="submit"
              >
                Update
              </Button>
            </form>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default EditMyProfile;
