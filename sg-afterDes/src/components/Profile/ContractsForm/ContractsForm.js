import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

import Stack from "@mui/material/Stack";

import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Grid from "@mui/material/Grid";
import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Card from "@mui/material/Card";
import TextareaAutosize from "@mui/material/TextareaAutosize";
import Typography from "@mui/material/Typography";
import CurrencyFormat from "react-currency-format";
import BaseUrl from "../../URL";
import { ToastContainer, toast } from "react-toastify";
import { useParams } from "react-router-dom";

export default function ContractsForm() {
  const token = useSelector((state) => state.auth.id);
  const navigate = useNavigate();
  const [isLoding, setIsLoding] = useState(false);
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");
  const [errorDate, setErrorDate] = useState(false);
  const [error, setEroor] = useState("");
  const [totalPrice, setTotalPrice] = useState(0);
  const { ReqId } = useParams();

  useEffect(() => {
    document.title = "Contract";
  }, []);

  const [Customervalues, setCustomerValues] = useState({
    Title: "",
    Description: "",
    Price: "",
  });

  const handleSubmit = (e) => {
    e.preventDefault();

    if (startDate === "" || endDate === "") {
      setErrorDate(true);
      return;
    } else {
      setErrorDate(false);
      console.log(Customervalues.Title);
      console.log(Customervalues.Description);
      // console.log(Customervalues.Price);
      console.log(startDate);
      console.log(endDate);

      //API
      // const PF= parseFloat(Customervalues.Price).toFixed(3);
      const PF = parseFloat(Customervalues.Price);
      console.log(PF);
      //totalPricr
      const TPF = parseFloat(totalPrice);
      console.log(TPF);

      fetch(`${BaseUrl}api/Contracts/createcontract`, {
        method: "POST",
        body: JSON.stringify({
          Title: Customervalues.Title,
          Description: Customervalues.Description,
          StartDate: startDate,
          EndDate: endDate,
          Price: PF,
          Total: TPF,
          RequesterId: ReqId,
          // totalPrice: TPF,
        }),
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
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
    }
    // APIInstance.AddCustomer(
    //   Customervalues.firstName,
    //   Customervalues.lastName,
    //   Customervalues.phone,
    //   Customervalues.email,
    //   Customervalues.code
    // ).then(() => {
    //   navigate(`/Customers/Index`);
    // });
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
      <Card>
        <Container component="main">
          <Box component="form" sx={{ mt: 3 }} onSubmit={handleSubmit}>
            <Grid container spacing={2}>
              <Grid item xs={12} sm={12}>
                <Typography
                  variant="h5"
                  style={{ textAlign: "center", marginBottom: "15px" }}
                >
                  Create Contract
                </Typography>
              </Grid>
            </Grid>
            <Grid container spacing={2}>
              <Grid item xs={24} sm={12}>
                <TextField
                  autoComplete="given-name"
                  name="Title"
                  required
                  fullWidth
                  id="Title"
                  label="Title"
                  autoFocus
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      Title: e.target.value,
                    })
                  }
                />
              </Grid>

              <Grid item xs={24} sm={12}>
                <TextareaAutosize
                  fullWidth
                  aria-label="minimum height"
                  minRows={5}
                  style={{
                    width: " 100%",
                    maxWidth: " 100%",
                    minWidth: "100%",
                    border: "solid 1px rgba(0, 0, 0, 0.23)",
                    borderRadius: "4px",
                    padding: "16.5px 14px",
                  }}
                  placeholder="Description"
                  required
                  onChange={(e) =>
                    setCustomerValues({
                      ...Customervalues,
                      Description: e.target.value,
                    })
                  }
                />
              </Grid>
              <Grid xs={12} sm={5.3}></Grid>
              <Grid xs={12} sm={6.6}>
                <br />
                {errorDate && (
                  <p style={{ marginLeft: 16, color: "red" }}>
                    Pleass Select Date
                  </p>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Stack component="form" noValidate spacing={3}>
                  <TextField
                    id="datetime-local"
                    label="Start Date"
                    type="datetime-local"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                </Stack>
              </Grid>
              <Grid item xs={12} sm={6}>
                <Stack component="form" noValidate spacing={3}>
                  <TextField
                    id="datetime-local"
                    label="End Date"
                    type="datetime-local"
                    required
                    InputLabelProps={{
                      shrink: true,
                    }}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </Stack>
              </Grid>

              <Grid xs={6} sm={3}></Grid>
              <Grid xs={12} sm={7.5}>
                <br />
                <p style={{ fontSize: 13.5, color: "#59688e", marginLeft: 20 }}>
                  10 Percent Of the Price Will Be Added On The Total (Fees For
                  Website Policy)
                </p>
              </Grid>
              <Grid xs={6} sm={3}></Grid>
              <Grid item xs={12} sm={6}>
                <CurrencyFormat
                  fullWidth
                  required
                  customInput={TextField}
                  thousandSeparator
                  // prefix="$"
                  // decimalScale={0}
                  placeholder="Price"
                  label="Price $"
                  onChange={(e) => {
                    const p = parseFloat(e.target.value * 0.1);
                    const pt = parseFloat(e.target.value);
                    if (p && pt) {
                      setTotalPrice(parseFloat(p + pt).toFixed(2));
                    } else {
                      setTotalPrice(0);
                    }

                    setCustomerValues({
                      ...Customervalues,
                      Price: e.target.value,
                    });
                  }}
                />
                <br />
                <br />
                <p style={{ textAlign: "center" }}>
                  The Total Price Will Be ${totalPrice}
                </p>
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
              Send Contract
            </Button>
          </Box>
        </Container>
      </Card>
    </>
  );
}
