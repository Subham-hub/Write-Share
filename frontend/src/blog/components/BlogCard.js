import React, { Fragment, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

import LoadingSpinner from "../../shared/UIElements/LoadingSpinner/LoadingSpinner";
import Modal from "../../shared/UIElements/Modal/Modal";
import { useHttp } from "../../shared/hooks/http-hook";
import { blogActions } from "../../shared/store/blogSlice";
import { userDataActions } from "../../shared/store/userDataSlice";

import classes from "./BlogCard.module.css";

const BlogCard = ({ blogs, heading, showBtn = false }) => {
  const [bid, setBid] = useState();
  const { uid, token } = useSelector((s) => s.userData);
  const { isLoggedIn } = useSelector((s) => s.auth);
  const { sendRequest, error, clearError, isLoading } = useHttp();
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const handleOpen = (bid) => {
    setOpen(true);
    setBid(bid);
  };
  const handleClose = () => setOpen(false);
  const dispatch = useDispatch();

  const deleteBlogHandler = async () => {
    handleClose();
    try {
      await sendRequest(`blogs/delete_blog/${bid}`, "DELETE", null, {
        Authorization: `Bearer ${token}`,
      });
      dispatch(blogActions.deleteBlogs(bid));
      dispatch(userDataActions.updateData({ flag: "BLOGS", bid }));
      alert("Successfully Deleted!");
    } catch (e) {}
  };

  return (
    <>
      {
        <>
          <Modal
            open={error ? true : false}
            modalDescription={error}
            handleClose={clearError}
          />
          <Modal
            open={open}
            onClose={handleClose}
            modalText=" Are You sure?"
            modalDescription={
              <>
                <Button
                  variant="contained"
                  onClick={deleteBlogHandler}
                  color="error"
                >
                  Delete
                </Button>
                <span style={{ visibility: "hidden" }}>....</span>
                <Button onClick={() => setOpen(false)} variant="contained">
                  Cancel
                </Button>
              </>
            }
          />
        </>
      }
      {isLoading && <LoadingSpinner asOverlay />}
      {!isLoading && (
        <div
          className={`${classes["home-articles"]} ${classes["max-width-1"]} ${classes["m-auto"]} ${classes.font2}`}
        >
          <h2 style={{ textDecoration: "underline" }}>{heading}</h2>
          {blogs.length === 0 && (
            <h3 className="center">No blogs found! Maybe add one?</h3>
          )}
          {blogs.length !== 0 &&
            blogs.map((blog) => (
              <Fragment key={blog._id}>
                <div className={`${classes["home-article"]}`}>
                  <div className={classes["home-article-img"]}>
                    <img
                      src={blog.image.secure_url}
                      alt={"Blog posted by " + blog.author}
                    />
                  </div>
                  <div
                    className={`${classes["home-article-content"]} ${classes.font1}`}
                  >
                    <div style={{ textAlign: "left" }}>
                      <Link to={`/blog/${blog._id}/details`}>
                        <h3>{blog.title}</h3>
                      </Link>
                      Author:{" "}
                      {isLoggedIn ? (
                        <Link className="link" to={`/${blog.uid}/profile`}>
                          {blog.author}
                        </Link>
                      ) : (
                        blog.author
                      )}
                      <br />
                      <span>
                        {new Date(blog.createdAt).toLocaleDateString("en-US", {
                          dateStyle: "medium",
                        })}
                      </span>
                      <br />
                      <Link to={`/blog/${blog._id}/details`}>
                        <b className="link">Read</b>
                      </Link>
                    </div>
                    <hr />
                    {showBtn && (
                      <>
                        <Button
                          onClick={() =>
                            navigate(`/blog/${uid}/edit/${blog._id}`)
                          }
                        >
                          Edit
                        </Button>
                        <Button onClick={() => handleOpen(blog._id)}>
                          Delete
                        </Button>
                      </>
                    )}
                  </div>
                </div>
              </Fragment>
            ))}
        </div>
      )}
    </>
  );
};

export default BlogCard;
