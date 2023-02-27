import * as React from "react";

import { useRef, useState } from "react";
import "./ForgotPasswordForm.css";


import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import { useNavigate } from 'react-router-dom';

export default function CodeForm(props) {
    const navigate = useNavigate();
  const codeRef = useRef();
  const [errorCode, setErrorCode] = useState(false);
  const [open, setOpen] = React.useState(props.open);

  const handleClose = () => {
    setErrorCode(false);
    setOpen(false);
    props.CancelDone();
  };

  const handleDone = () => {
    const codeEntre = codeRef.current.value;
    if (codeEntre.trim().length !== 8) {
      console.log("not done Code");
      setErrorCode(true);
      return;
    } else {
      setErrorCode(false);
      console.log("done Code");

      console.log(codeEntre);
      navigate('/');
    }

    //api
  };

  return (
    <div>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>your Code</DialogTitle>
        <DialogContent>
          <div className="control">
            <label htmlFor="new-name" style={{ marginRight: 10 }}>
              Pleass Enter your Code:
            </label>

            <input
              id="email"
              type="email"
              label="Email Address"
              autoComplete="email"
              required
              ref={codeRef}
            />
            {errorCode && <p className="p">Pleass Enter A Valid Code!</p>}
          </div>
        </DialogContent>

        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          <Button onClick={handleDone}>Done</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}
