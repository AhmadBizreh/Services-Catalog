import React, { useState, useEffect } from "react";
import { useSelector } from "react-redux";
// import { useNavigate } from "react-router-dom";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import MenuItem from "@mui/material/MenuItem";
import CurrencyFormat from "react-currency-format";
import { ToastContainer, toast } from "react-toastify";
import ChangePassword from "./ChangePassword";
import ButtonChangePassword from "./FFButtonChangePassword";
import BaseUrl from "../../URL";
import { NavLink } from "react-router-dom";

export default function NEditProfileForm() {
  const token = useSelector((state) => state.auth.id);
  const RoleName = useSelector((state) => state.auth.roleName);


  // const navigate = useNavigate();
  const [loding, setLoding] = useState();

  const [Customervalues, setCustomerValues] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    description: "",
    languesges: "",
    occupation: "",
    skills: "",
    education: "",
    certificate: "",
    linkedinAccount: "",
    googleAccount: "",
    gender: "",
    age: "",
    address: "",
    personalImage: "",
  });

  const fetchUsreInfo = async () => {
    await fetch(`${BaseUrl}api/User/show`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCustomerValues(data));
  };

  useEffect(() => {
    document.title = "Edit Profile";
    fetchUsreInfo();
   
  }, []);

  const handleSubmit = (e) => {
    e.preventDefault();

    // APIInstance.AddCustomer(
    setLoding(true);
    fetch(`${BaseUrl}api/User/editprofile`, {
      method: "POST",
      body: JSON.stringify({
        FirstName: Customervalues.firstName,
        LastName: Customervalues.lastName,
        PhoneNumber: Customervalues.phoneNumber,
        Description: Customervalues.description,
        Languesges: Customervalues.languesges,
        Occupation: Customervalues.occupation,
        Skills: Customervalues.skills,
        Education: Customervalues.education,
        Certificate: Customervalues.certificate,
        LinkedinAccount: Customervalues.linkedinAccount,
        GoogleAccount: Customervalues.googleAccount,
        Gender: Customervalues.gender,
        Age: parseInt(Customervalues.age),
        Address: Customervalues.address,
        // returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setLoding(false);
        // console.log(res.massage);
        if (res.ok) {
          toast("Success");
          // navigate("/auth");
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMassage = "Update Failed";
            console.log(errorMassage);
            setLoding(false);
            toast(errorMassage);
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

  const ChangePasswordHandler = () => {};

  return (
    <>
      {!loding && (
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
      <Card>
        <Container component="main">
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant="h5"
                  style={{ textAlign: "center", marginBottom: "15px" }}
                >
                  Edit Your Profile
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={Customervalues.firstName}
                  autoComplete="given-name"
                  name="FirstName"
                  autoFocus
                  fullWidth
                  id="FirstName"
                  label="FirstName"
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      firstName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={Customervalues.lastName}
                  autoComplete="given-name"
                  name="LastName"
                  fullWidth
                  id="LastName"
                  label="LastName"
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      lastName: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid item xs={12} sm={6}>
                <TextField
                  value={Customervalues.phoneNumber}
                  autoComplete="given-name"
                  name="PhoneNumber"
                  fullWidth
                  id="PhoneNumber"
                  label="Phone Number"
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      phoneNumber: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={12} sm={6}>
                <TextField
                  value={Customervalues.gender}
                  fullWidth
                  select
                  // value={Billing}
                  label="Gender"
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      gender: e.target.value,
                    })
                  }
                >
                  <MenuItem value="Male">Male</MenuItem>
                  <MenuItem value="Fmale">Fmale</MenuItem>
                </TextField>
              </Grid>

              {RoleName ===	"ProviderUser" && (
                <>
                  <Grid item xs={12} sm={6}>
                    <TextareaAutosize
                      value={Customervalues.description}
                      fullWidth
                      aria-label="minimum height"
                      minRows={5}
                      style={{
                        width: " 100%",
                        maxWidth: " 100%",
                        border: "solid 1px rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        padding: "16.5px 14px",
                      }}
                      placeholder="Description"
                      onChange={(e) =>
                        setCustomerValues({
                          ...Customervalues,
                          description: e.target.value,
                        })
                      }
                    />
                  </Grid>
                  <Grid item xs={12} sm={6}>
                    <TextareaAutosize
                      value={Customervalues.languesges}
                      fullWidth
                      aria-label="minimum height"
                      minRows={5}
                      style={{
                        width: " 100%",
                        maxWidth: " 100%",
                        border: "solid 1px rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        padding: "16.5px 14px",
                      }}
                      placeholder="Languesges"
                      onChange={(e) =>
                        setCustomerValues({
                          ...Customervalues,
                          languesges: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextareaAutosize
                      value={Customervalues.occupation}
                      fullWidth
                      aria-label="minimum height"
                      minRows={5}
                      style={{
                        width: " 100%",
                        maxWidth: " 100%",
                        border: "solid 1px rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        padding: "16.5px 14px",
                      }}
                      placeholder="Occupation"
                      onChange={(e) =>
                        setCustomerValues({
                          ...Customervalues,
                          occupation: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextareaAutosize
                      value={Customervalues.skills}
                      fullWidth
                      aria-label="minimum height"
                      minRows={5}
                      style={{
                        width: " 100%",
                        maxWidth: " 100%",
                        border: "solid 1px rgba(0, 0, 0, 0.23)",
                        borderRadius: "4px",
                        padding: "16.5px 14px",
                      }}
                      placeholder="Skills"
                      onChange={(e) =>
                        setCustomerValues({
                          ...Customervalues,
                          skills: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={Customervalues.education}
                      autoComplete="given-name"
                      name="Education"
                      fullWidth
                      id="Education"
                      label="Education"
                      onChange={(e) =>
                        setCustomerValues({
                          ...Customervalues,
                          education: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={Customervalues.certificate}
                      autoComplete="given-name"
                      name="Certificate"
                      fullWidth
                      id="Certificate"
                      label="Certificate"
                      onChange={(e) =>
                        setCustomerValues({
                          ...Customervalues,
                          certificate: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={Customervalues.linkedinAccount}
                      autoComplete="given-name"
                      name="LinkedinAccount"
                      fullWidth
                      id="LinkedinAccount"
                      label="LinkedinAccount"
                      onChange={(e) =>
                        setCustomerValues({
                          ...Customervalues,
                          linkedinAccount: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={Customervalues.googleAccount}
                      autoComplete="given-name"
                      name="GoogleAccount"
                      fullWidth
                      id="GoogleAccount"
                      label="GoogleAccount"
                      onChange={(e) =>
                        setCustomerValues({
                          ...Customervalues,
                          googleAccount: e.target.value,
                        })
                      }
                    />
                  </Grid>

                  <Grid item xs={12} sm={6}>
                    <TextField
                      value={Customervalues.address}
                      autoComplete="given-name"
                      name="Address"
                      fullWidth
                      id="Address"
                      label="Address"
                      onChange={(e) =>
                        setCustomerValues({
                          ...Customervalues,
                          address: e.target.value,
                        })
                      }
                    />
                  </Grid>
                </>
              )}
              <Grid item xs={12} sm={6}>
                <TextField
                  value={Customervalues.age}
                  type="number"
                  autoComplete="given-Age"
                  name="Age"
                  fullWidth
                  id="Age"
                  label="Age"
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      age: e.target.value,
                    })
                  }
                />
              </Grid>
            </Grid>
            <Button
              type="submit"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="info"
              style={{
                display: "flex",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              Edit Your Profile
            </Button>
            {/* <Grid xs={24} sm={12}>
              <ButtonChangePassword />
            </Grid> */}
            <Button
              type="button"
              variant="contained"
              sx={{ mt: 3, mb: 2 }}
              color="info"
              style={{
                display: "flex",
                marginRight: "auto",
                marginLeft: "auto",
              }}
            >
              <NavLink to={"/changepassword"}>Change Your Password</NavLink>
            </Button>
          </Box>
        </Container>
      </Card>
    </>
  );
}
