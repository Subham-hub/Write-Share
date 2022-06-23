import { Button } from '@mui/material'
import React, { useRef, useState, useEffect } from 'react'

import classes from './ImageUpload.module.css'

const ImageUpload = ({ onImageUpload, id, center, errorText }) => {
  const [file, setFile] = useState()
  const [previewUrl, setPreviewUrl] = useState()
  const [isValid, setIsValid] = useState(false)

  const filePickerRef = useRef()

  useEffect(() => {
    if (!file) {
      return
    }
    const fileReader = new FileReader()
    fileReader.onload = () => {
      setPreviewUrl(fileReader.result)
    }
    fileReader.readAsDataURL(file)
  }, [file])

  const pickedHandler = (e) => {
    let pickedFile
    let fileIsValid = isValid
    if (e.target.files && e.target.files.length === 1) {
      pickedFile = e.target.files[0]
      setFile(pickedFile)
      setIsValid(true)
      fileIsValid = true
    } else {
      setIsValid(false)
      fileIsValid = false
    }

    onImageUpload(pickedFile, fileIsValid)
  }

  const pickImageHandler = () => {
    filePickerRef.current.click()
  }

  return (
    <div className=" center">
      <span onClick={pickImageHandler} style={{ cursor: 'pointer' }}>
        <input
          ref={filePickerRef}
          type="file"
          id={id}
          style={{ display: 'none' }}
          accept=".jpg,.png,.jpeg"
          onChange={pickedHandler}
        />
        <div className={`${classes['image-upload']} ${center && 'center'}`}>
          <div className={classes['image-upload__preview']}>
            {previewUrl && <img src={previewUrl} alt="Preview" />}
            {!previewUrl && <span>Please pick an image</span>}
          </div>
          <Button
            variant="outlined"
            color="inherit"
            type="button"
            onClick={pickImageHandler}
          >
            PICK IMAGE
          </Button>
        </div>
        {isValid && <p>{errorText}</p>}
      </span>
    </div>
  )
}

export default ImageUpload
