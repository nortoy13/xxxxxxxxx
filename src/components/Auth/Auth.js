import * as React from "react";
import {
  Avatar,
  Button,
  Paper,
  Typography,
  CssBaseline,
  Grid,
  Box,
  FormControl,
} from "@mui/material";
import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Input from "./Input";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { signin, signup } from "../../actions/auth";

const theme = createTheme();
const initialState = {
  name: "",
  email: "",
  password: "",
  confirmPassword: "",
};

export default function Auth() {
  const dispatch = useDispatch();
  const [showPassword, setShowPassword] = useState(false);
  const [isSignup, setIsSignup] = useState(false);
  const [formData, setFormData] = useState(initialState);
  const navigate = useNavigate();
  const language = useSelector((state) => state.lan);

  let loginError = useSelector((state) => state.err);
  if (loginError === "User does not exist") {
    loginError = "User does not register";
  }
  if (loginError === "This user is  blocked") {
    loginError = "This account is blocked";
  }
  let passwordError;
  if (loginError === "Invalid Credentials") {
    passwordError = "incorrect password";
  }

  const handleSubmit = (event) => {
    event.preventDefault();
    if (isSignup) {
      dispatch(signup(formData, navigate));
    } else {
      dispatch(signin(formData, navigate));
    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((prevIsSignup) => !prevIsSignup);
    setShowPassword(false);
  };
  const handleShowPassword = () => setShowPassword((prevShowPassword) => !prevShowPassword);

  return (
    <ThemeProvider theme={theme}>
      <Grid className="authPage" container component="main" sx={{ height: "80vh" }}>
        <CssBaseline />
        <Grid
          className="authPage"
          item
          xs={false}
          sm={4}
          md={7}
          sx={{
            backgroundImage: "url(https://source.unsplash.com/random) !important",
            backgroundRepeat: "no-repeat",
            backgroundColor: (t) =>
              t.palette.mode === "light" ? t.palette.grey[50] : t.palette.grey[900],
            backgroundSize: "cover",
            backgroundPosition: "center",
          }}
        />
        <Grid
          className="authPage"
          item
          xs={12}
          sm={8}
          md={5}
          component={Paper}
          elevation={6}
          square
        >
          <FormControl>
            <Box
              sx={{
                my: 8,
                mx: 4,
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              <Avatar sx={{ m: 1, bgcolor: "secondary.main" }}>
                <LockOutlinedIcon />
              </Avatar>
              <Typography component="h1" variant="h5">
                {isSignup
                  ? language === "uz"
                    ? "Ro'yhatdan O'tish"
                    : "Sign Up"
                  : language === "uz"
                  ? "Kirish"
                  : "Sign In"}
              </Typography>
              <Box component="form" noValidate onSubmit={handleSubmit} sx={{ mt: 1 }}>
                {isSignup && (
                  <>
                    <Input
                      name="name"
                      label={language === "uz" ? "To'liq ism" : "Fullname"}
                      handleChange={handleChange}
                      type="fullname"
                      autoFocus
                    />
                  </>
                )}

                <Input
                  name="email"
                  label={
                    language === "uz" ? "Email manzili yoki username" : "Email Address or username"
                  }
                  handleChange={handleChange}
                  type="email"
                  helperText={loginError ? loginError : ""}
                />
                <Input
                  name="password"
                  label={language === "uz" ? "parol" : "password"}
                  handleChange={handleChange}
                  type={showPassword ? "text" : "password"}
                  handleShowPassword={handleShowPassword}
                  helperText={passwordError ? passwordError : ""}
                />

                {isSignup && (
                  <Input
                    name="confirmPassword"
                    label={language === "uz" ? "Parolni takrorlang" : "repeat password"}
                    handleChange={handleChange}
                    type="password"
                  />
                )}
                <Typography color="error">{loginError ? loginError : ""}</Typography>
                <Button type="submit" fullWidth variant="contained" sx={{ mt: 3, mb: 2 }}>
                  {isSignup
                    ? language === "uz"
                      ? "Ro'yhatdan O'tish"
                      : "Sign Up"
                    : language === "uz"
                    ? "Kirish"
                    : "Sign In"}
                </Button>
                <Grid container>
                  <Grid item>
                    <Button onClick={switchMode}>
                      {isSignup
                        ? language === "uz"
                          ? "Akkauntingiz bormi? Kirish"
                          : "Already have an accout? Sign In"
                        : language === "uz"
                        ? "Akkauntingiz yo'qmi? Ro'yhatdan o'tish"
                        : "Don't have an account? Sign Up"}
                    </Button>
                  </Grid>
                </Grid>
              </Box>
            </Box>
          </FormControl>
        </Grid>
      </Grid>
    </ThemeProvider>
  );
}
