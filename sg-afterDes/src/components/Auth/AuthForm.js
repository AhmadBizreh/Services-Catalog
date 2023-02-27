import { useState, useRef } from "react";

import React from "react";

import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";

import { NavLink, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import TungstenIcon from "@mui/icons-material/Tungsten";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import ForgotPassword from "./ForgotPassword/ForgotPassword";
import { hover } from "@testing-library/user-event/dist/hover";
import BaseUrl from "../URL";

const theme = createTheme();
const AuthForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);

  const emailInputRef = useRef();
  const passwordInputRef = useRef();

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    // if(enteredEmail.lena)
    // {
    //   setEroor("Emil Required");
    // }
    setIsLoding(true);
    // let url;
    // url =
    //"https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSrVcbFFY5pAuN1s0ouA6h_Tx3J3UnvgQ";
    fetch(`${BaseUrl}api/User/login`, {
      method: "POST",
      body: JSON.stringify({
        Email: enteredEmail,
        Password: enteredPassword,
        // returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
        // "Authou": idToking,
      },
    })
      .then((res) => {
        setIsLoding(false);

        if (res.ok) {
          toast("done");
          return res.json();
        }
        // if(res.status !== 200) {
        //   console.log("Error 400 ahmad");
        //   console.log(res.body);
        // }
        else {
          // console.log("res");
          // console.log(data);
          res.json().then((data)=> {
            let errorMassage = "Connection Failed";
            if (data.massage) {
              errorMassage = data.massage;
            }
            toast(errorMassage);
            throw new Error(errorMassage);
          });
        }
      })
      .then((data) => {
        const id = data.token;
        const email = data.email;
        const img = data.personalImage;
        const roleName = data.roleName;
        console.log(data);

        dispatch(
          authAction.login({
            email,
            roleName,
            id,
            img,
            
          })
        );
        navigate.replace("/");

        console.log(data);
      })
      .catch(() => {});
  };

  return (
    <>
      {!isLoding && (
        <ToastContainer
          position="top-center"
          autoClose={1500}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick={false}
          rtl
          pauseOnFocusLoss
          draggable
          pauseOnHover
          theme="colored"
        />
      )}

      <ThemeProvider theme={theme}>
        <Container component="main" maxWidth="xs">
          <CssBaseline />
          <Box
            sx={{
              marginTop: 8,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar sx={{ m: 1, bgcolor: "Highlight" }}>
              <TungstenIcon color={"withe"} />
            </Avatar>
            <Typography component="h1" variant="h5">
              Sign in
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                required
                margin="normal"
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
                autoFocus
                inputRef={emailInputRef}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="password"
                label="Password"
                type="password"
                id="password"
                autoComplete="current-password"
                inputRef={passwordInputRef}
              />
              <div>
                {isLoding && <p>loding..</p>}
                {!isLoding && (
                  <Button
                    type="submit"
                    fullWidth
                    variant="contained"
                    sx={{ mt: 3, mb: 2 }}
                  >
                    Sign In
                  </Button>
                )}
              </div>

              <Grid container>
                <Grid item xs>
                  <ForgotPassword />
                </Grid>
                <Grid item style={{ padding: 5 }}>
                  <NavLink to={"/signup"} style={{ color: "#1976da" }}>
                    {"Don't have an account? Sign Up"}
                  </NavLink>
                </Grid>
              </Grid>
            </Box>
          </Box>
        </Container>
      </ThemeProvider>
    </>
  );
};
export default AuthForm;
