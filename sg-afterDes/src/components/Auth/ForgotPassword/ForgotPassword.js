import * as React from "react";

import { useRef, useState } from "react";
import "./ForgotPasswordForm.css";
// import { ToastContainer, toast } from "react-toastify";
// import "react-toastify/dist/ReactToastify.css";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import CodeForm from "./CodeForm";

import BaseUrl from "../../URL";
import { ToastContainer, toast } from "react-toastify";

export default function ForgotPassword() {
  const [loding, setLoding] = useState();
  const emailRef = useRef();
  const [errorEmail, setErrorEmail] = useState(false);
  // const [emailSteat, setEmailSteat] = useState(emailRef);
  const [doneIsClickable, setDoneIsClickable] = useState(false);

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setErrorEmail(false);
    setOpen(false);
  };
  const handleDone = () => {
    const emailEntre = emailRef.current.value;
    if (
      emailEntre.trim().length === 0 ||
      !emailEntre.includes("@") ||
      !emailEntre.includes(".")
    ) {
      console.log("not done Email");
      setErrorEmail(true);
      return;
    } else {
      setErrorEmail(false);
      console.log("done Email");
      console.log(emailEntre);

      setDoneIsClickable(true);
      // setOpen(false);

      fetch(`${BaseUrl}api/User/send`, {
        method: "POST",
        body: JSON.stringify({
          email: emailEntre,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((res) => {
          setLoding(false);
          // console.log(res.massage);
          if (res.ok) {
            toast("We Send An Email For you");
            console.log("done API");
            // navigate("/auth");
            return res.json();
          } else {
            res.json().then((data) => {
              let errorMassage = "Emil not Found";
              // if(data.message){

              // }
              console.log(errorMassage);
              setLoding(false);
              toast(errorMassage);
              throw new Error(errorMassage);
            });
          }
        })
        .then((data) => {
          toast("We Send An Email For you");
        })
        .catch(() => {});
    }

    //api
  };
  const CancelDone = () => {
    setDoneIsClickable(false);
  };

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
      <div>
        <Button
          onClick={handleClickOpen}
          size="medium"
          style={{ textTransform: "none" }}
        >
          Forgot Password?
        </Button>

        <Dialog open={open} onClose={handleClose}>
          <DialogTitle>Forgot Password?</DialogTitle>
          <DialogContent>
            <div className="control">
              <label htmlFor="new-name" style={{ marginRight: 10 }}>
                Your Email:
              </label>

              <input
                id="email"
                type="email"
                label="Email Address"
                autoComplete="email"
                required
                ref={emailRef}
              />
              {errorEmail && <p className="p">Pleass Enter A Valid Email!</p>}
            </div>
            {doneIsClickable && (
              <CodeForm open={true} CancelDone={CancelDone} />
            )}
          </DialogContent>

          <DialogActions>
            <Button onClick={handleClose}>Cancel</Button>
            <Button onClick={handleDone}>Done</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
