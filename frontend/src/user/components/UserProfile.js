import React, { useEffect, useState } from "react";
import { Link, Outlet, useParams } from "react-router-dom";
import { useSelector } from "react-redux";
import Avatar from "@mui/material/Avatar";

import { useHttp } from "../../shared/hooks/http-hook";
import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import Modal from "../../shared/UIElements/Modal/Modal";
import { Container, Paper } from "@mui/material";

const UserProfile = () => {
  const uid = useParams().uid;
  const [user, setUser] = useState();
  const [showPostBtn, setShowPostBtn] = useState(true);
  const { sendRequest, isLoading, error, clearError } = useHttp();
  const { token } = useSelector((s) => s.userData);

  useEffect(() => {
    (async () => {
      const response = await sendRequest(`users/get_user/${uid}`, "GET", null, {
        Authorization: `Bearer ${token}`,
      });
      setUser(response);
    })();
  }, [sendRequest, token, uid]);

  return (
    <>
      <Modal
        open={error ? true : false}
        modalDescription="Error"
        handleClose={clearError}
      />
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && user && (
        <>
          <Container maxWidth="md" sx={{ mt: 13 }}>
            <Paper
              elevation={10}
              sx={{ bgcolor: "transparent", p: 4, mb: 5, textAlign: "center" }}
            >
              <Avatar
                className="avatar"
                alt={user.username}
                src={user.avatar.secure_url}
                sx={{
                  width: "10rem",
                  height: "10rem",
                  display: "block",
                  margin: "auto",
                }}
              />
              <h1>{user.username}</h1>
              {user.blogs && <h3>No. of posts made: {user.blogs.length}</h3>}

              {showPostBtn && user.blogs.length !== 0 && (
                <h3 onClick={() => setShowPostBtn(false)}>
                  <Link to={`/${uid}/profile/posts`}>
                    See all posts made by {user.username}
                  </Link>
                </h3>
              )}
            </Paper>
          </Container>
          {!showPostBtn && <Outlet />}
        </>
      )}
    </>
  );
};

export default UserProfile;
