import { Fragment } from 'react'
import { Alert, TextField } from '@mui/material'
import { useController } from 'react-hook-form'

import classes from './Input.module.css'

const Input = (props) => {
  const {
    field,
    fieldState,
    formState: { errors },
  } = useController(props)

  return (
    <Fragment>
      <div>
        <TextField
          className={classes.input}
          onChange={props.onChange}
          type={props.type}
          defaultValue={props.defaultValue}
          id={props.id}
          label={props.label}
          variant={props.variant}
          error={fieldState.isTouched && fieldState.invalid}
          {...field}
          placeholder={props.name}
          multiline={props.multiline}
          rows={props.rows}
        />
      </div>
      <br />
      {fieldState.isTouched && fieldState.invalid && (
        <div className="center">
          {errors && <Alert severity="warning">{props.errorMessage}</Alert>}
        </div>
      )}
    </Fragment>
  )
}

export default Input
