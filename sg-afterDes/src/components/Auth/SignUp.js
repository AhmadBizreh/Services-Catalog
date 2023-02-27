import { useState, useRef } from "react";

import React from "react";

import { useDispatch } from "react-redux";
import { authAction } from "../../store/auth";

import { NavLink, useNavigate } from "react-router-dom";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import CheckType from "./CheckType";

import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import CssBaseline from "@mui/material/CssBaseline";
import TextField from "@mui/material/TextField";
import Link from "@mui/material/Link";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
// import LockOutlinedIcon from "@mui/icons-material/LockOutlined";
import TungstenIcon from "@mui/icons-material/Tungsten";
import Typography from "@mui/material/Typography";
import Container from "@mui/material/Container";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import BaseUrl from "../URL";

const theme = createTheme();
const SignUp = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const [isLogin, setIsLogin] = useState(true);
  const [isLoding, setIsLoding] = useState(false);
  const [type, setType] = useState(false);
  const [error, setEroor] = useState("");

  const emailInputRef = useRef();
  const passwordInputRef = useRef();
  const firstNameInputRef = useRef();
  const lastNameInputRef = useRef();

  const phoneNumberInputRef = useRef();

  let RoleName = "ProviderUser";
  if (!type) {
    RoleName = "RequesterUser";
  }
  const typeHandler = () => {
    setType(!type);
  };

  //const switchAuthModeHandler = () => {
  // setIsLogin((prevState) => !prevState);
  // };

  const handleSubmit = (event) => {
    event.preventDefault();

    const enteredEmail = emailInputRef.current.value;
    const enteredPassword = passwordInputRef.current.value;
    const enteredFirstName = firstNameInputRef.current.value;
    const enteredLastName = lastNameInputRef.current.value;
    const enteredPhoneNumber = phoneNumberInputRef.current.value;
    const enteredRoleName = RoleName;
    console.log(enteredEmail);
    console.log(enteredPassword);
    console.log(enteredFirstName);
    console.log(enteredLastName);
    console.log(enteredPhoneNumber);
    console.log(enteredRoleName);

    setIsLoding(true);
    let url;
    // if (isLogin) {
    // url =
    //   "https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyBSrVcbFFY5pAuN1s0ouA6h_Tx3J3UnvgQ";
    // } else {
    // url = "https://192.168.43.209:45455/api/User/register";
    // }
    fetch(`${BaseUrl}api/User/register`, {
      method: "POST",
      body: JSON.stringify({
        Email: enteredEmail,
        Password: enteredPassword,
        FirstName: enteredFirstName,
        LastName: enteredLastName,
        PhoneNumber: enteredPhoneNumber,
        RoleName: enteredRoleName,
        // returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
        // "Authou": idToking,
      },
    })
      .then((res) => {
        setIsLoding(false);
        // console.log(res.massage);
        if (res.ok) {
          toast("You Joined Us");
          navigate("/auth");
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMassage = "Connection Failed";
            if (data.errors.FirstName) {
              errorMassage = data.errors.FirstName;
            } else if (data.errors.LastName) {
              errorMassage = data.errors.LastName;
            } else if (data.errors.Phone) {
              errorMassage = data.errors.Phone;
            } else if (data.errors.Email) {
              errorMassage = data.errors.Email;
            } else if (data.errors.Password) {
              errorMassage = data.errors.Password;
            } else if (data.massage) {
              errorMassage = data.massage;
            } else {
              errorMassage = "Success";
            }
            setEroor(errorMassage);
            console.log(errorMassage);
            toast(error);
            throw new Error(errorMassage);
          });
        }
      })
      .then((data) => {
        // const id = data.idToken;
        // const email = data.email;
        // console.log("data");
        // dispatch(
        //   authAction.login({
        //     email,
        //     id,
        //   })
        // );
        // navigate("/auth");
        // console.log(data);
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
              Sign up
            </Typography>
            <Box
              component="form"
              onSubmit={handleSubmit}
              noValidate
              sx={{ mt: 1 }}
            >
              <TextField
                margin="normal"
                required
                fullWidth
                name="FirstName"
                label="First Name"
                type="text"
                id="text"
                autoFocus
                // autoComplete="current-password"
                inputRef={firstNameInputRef}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="LastName"
                label="Last Name"
                type="text"
                id="text"
                // autoComplete="current-password"
                inputRef={lastNameInputRef}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                name="Phone"
                label="Phone Number"
                type="number"
                id="tel"
                // autoComplete="current-password"
                inputRef={phoneNumberInputRef}
              />
              <TextField
                margin="normal"
                required
                fullWidth
                id="email"
                type="email"
                label="Email Address"
                name="email"
                autoComplete="email"
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
                <CheckType typeHandler={typeHandler} />
                {error && <p style={{ color: "#d95d47" }}>{error}</p>}

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
                {/* <Grid item xs>
                  <Link href="#" variant="body2">
                    Forgot password?
                  </Link>
                </Grid> */}
                <Grid item>
                  <NavLink to={"/auth"} style={{ color: "#1976da" }}>
                    {"Have an account? Sign In"}
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
export default SignUp;
