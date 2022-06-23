import { forwardRef } from 'react'
import Stack from '@mui/material/Stack'
import MUISnackbar from '@mui/material/Snackbar'
import MuiAlert from '@mui/material/Alert'

const Alert = forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />
})

const Snackbar = ({ open, handleClose }) => {
  return (
    <Stack spacing={2} sx={{ width: '100%' }}>
      <MUISnackbar open={open} autoHideDuration={6000} onClose={handleClose}>
        <Alert onClose={handleClose} severity="success" sx={{ width: '100%' }}>
          This is a success message!
        </Alert>
      </MUISnackbar>
    </Stack>
  )
}

export default Snackbar
