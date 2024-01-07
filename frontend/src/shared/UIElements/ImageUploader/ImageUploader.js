import { useEffect, useRef, useState } from "react";
import { Button } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";

import classes from "./ImageUploader.module.css";

const ImageUploader = ({ onImageUpload }) => {
  const [selectedImage, setSelectedImage] = useState(null);
  const [file, setFile] = useState(null);
  const fileInputRef = useRef(null);

  const handleImageChange = (e) => {
    let file = e.target.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result);
    reader.readAsDataURL(file);
    setSelectedImage(null);
  };

  const handleDrop = (e) => {
    e.preventDefault();
    const file = e.dataTransfer.files[0];
    setFile(file);
    const reader = new FileReader();
    reader.onload = () => setSelectedImage(reader.result);
    reader.readAsDataURL(file);
    setSelectedImage(null);
  };

  useEffect(() => {
    onImageUpload(file);
  }, [onImageUpload, file]);

  return (
    <div className={classes["image-uploader"]}>
      <div
        className={classes["drop-container"]}
        onDrop={handleDrop}
        onDragOver={(e) => e.preventDefault()}
        onClick={() => fileInputRef.current.click()}
      >
        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={classes["file-input"]}
          ref={fileInputRef}
        />
        {selectedImage ? (
          <img
            src={selectedImage}
            alt="Preview"
            className={classes["preview-image"]}
          />
        ) : (
          <div className={classes.placeholder}>Drag & Drop or Select</div>
        )}
      </div>
      {selectedImage && (
        <Button
          onClick={() => {
            setSelectedImage(null);
            setFile(null);
          }}
          endIcon={<CloseIcon />}
        >
          Clear
        </Button>
      )}
    </div>
  );
};

export default ImageUploader;
