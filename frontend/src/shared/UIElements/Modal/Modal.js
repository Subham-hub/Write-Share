import React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Modal from "@mui/material/Modal";

const MyModal = ({
  open,
  handleClose,
  modalText,
  modalDescription,
  key = undefined,
  children,
}) => {
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    color: "white",
    bgcolor: "black",
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };
  return (
    <Modal
      key={key}
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-modal-title" variant="h6" component="h2">
          {modalText || "An error occured"}
        </Typography>
        <Typography
          id="modal-modal-description"
          variant="body1"
          component="div"
          sx={{ mt: 2 }}
        >
          {modalDescription}
        </Typography>
        {children}
      </Box>
    </Modal>
  );
};

export default MyModal;
