import React from "react";
import { TextField, InputAdornment, IconButton } from "@mui/material";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
function Input({ name, handleChange, label, autoFocus, type, handleShowPassword, helperText }) {
  return (
    <>
      <TextField
        name={name}
        label={label}
        onChange={handleChange}
        variant="outlined"
        required={true}
        helperText={helperText}
        fullWidth
        margin="normal"
        autoFocus={autoFocus}
        type={type}
        InputProps={
          name === "password" && {
            endAdornment: (
              <InputAdornment position="end">
                <IconButton onClick={handleShowPassword}>
                  {type === "password" ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }
        }
      />
    </>
  );
}

export default Input;
