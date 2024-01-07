import React, { Fragment, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import {
  Box,
  Button,
  Container,
  Paper,
  TextField,
  Typography,
} from "@mui/material";

import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import Modal from "../../shared/UIElements/Modal/Modal";
import ImageUploader from "../../shared/UIElements/ImageUploader/ImageUploader";
import { useHttp } from "../../shared/hooks/http-hook";
import { authActions } from "../../shared/store/authSlice";
import { autoLogin } from "../../shared/store/userDataSlice";

const Auth = () => {
  const [image, setImage] = useState();
  const { isLoading, sendRequest, error, clearError } = useHttp();
  const { isLoggingIn } = useSelector((s) => s.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    if (!isLoggingIn && !image) return alert("Please provide an image");
    const formData = new FormData();

    formData.append("email", data.email);
    formData.append("password", data.password);
    if (!isLoggingIn) {
      formData.append("username", data.username);
      formData.append("avatar", image);
    }
    try {
      const response = await sendRequest(
        `users/${isLoggingIn ? "login" : "signup"}`,
        "POST",
        formData
      );
      if (response) {
        const userData = JSON.stringify({
          uid: response.user._id,
          token: response.token,
        });
        localStorage.setItem("userData", userData);
        dispatch(authActions.login());
        dispatch(autoLogin());
      }
      navigate("/");
    } catch (e) {}
  };

  return (
    <>
      <Modal
        open={error ? true : false}
        modalDescription={error}
        handleClose={clearError}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <Container
          maxWidth="sm"
          sx={{
            pt: 11,
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            minHeight: "90vh",
          }}
        >
          <Paper
            elevation={10}
            sx={{ bgcolor: "transparent", p: 2, width: "100%" }}
          >
            <Typography
              textAlign="center"
              fontWeight="bold"
              component="h1"
              variant="h4"
              gutterBottom
            >
              {isLoggingIn ? "LOG-IN" : "SIGN-UP"}
            </Typography>
            <form onSubmit={handleSubmit(onSubmit)}>
              {!isLoggingIn && (
                <Fragment>
                  <ImageUploader
                    onImageUpload={(pickedFile) => setImage(pickedFile)}
                  />
                  <TextField
                    sx={{ mt: 2 }}
                    fullWidth
                    label="Username"
                    {...register("username", {
                      required: "Username is required",
                    })}
                  />
                  {errors.username && (
                    <Typography color="error" fontWeight="bold">
                      {errors.username && errors.username.message}
                    </Typography>
                  )}
                </Fragment>
              )}
              <TextField
                sx={{ mt: 2 }}
                fullWidth
                label="Email"
                {...register("email", {
                  required: "Email is required",
                  pattern:
                    /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
                })}
              />
              {errors.email && (
                <Typography color="error">
                  {errors.email.type === "required"
                    ? errors.email.message
                    : "Please enter a valid email"}
                </Typography>
              )}
              <TextField
                sx={{ mt: 2, mb: !isLoggingIn ? 2 : 0 }}
                fullWidth
                type="password"
                label="Password"
                {...register("password", {
                  required: "This is required",
                  minLength: 6,
                })}
              />
              {errors.password && (
                <Typography color="error" fontWeight="bold">
                  {errors.password.type === "required"
                    ? errors.password.message
                    : "Minimun 6 letters"}
                </Typography>
              )}
              <Box display="-ms-flexbox">
                <Button
                  fullWidth
                  type="submit"
                  variant="contained"
                  sx={{ mb: 2, mt: 2 }}
                >
                  {isLoggingIn ? "log-in" : "sign-up"}
                </Button>
              </Box>
            </form>
            <Typography
              component="p"
              variant="h6"
              sx={{ cursor: "pointer" }}
              onClick={() => {
                if (isLoggingIn) dispatch(authActions.isSigning());
                else dispatch(authActions.isLogging());
              }}
              color="inherit"
            >
              {isLoggingIn
                ? "Not registered? click here to register"
                : "Already registered? click here to login"}
            </Typography>
          </Paper>
        </Container>
      )}
    </>
  );
};

export default Auth;
