import * as React from "react";

import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import EditIcon from "@mui/icons-material/Edit";
import TextField from "@mui/material/TextField";
import "./EditImg.css";
import BaseUrl from "../../../URL";
import axios from "axios";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@mui/material/Tooltip";

export default function EditImg() {
  const token = useSelector((state) => state.auth.id);
  const [open, setOpen] = useState(false);
  const [file, setFile] = useState(null);

  // useEffect(() => {
  //   document.title = "Profile";
  //   setChangeImg(false);
  // }, [ChangeImg]);

  const handleFile = (event) => {
    setFile(event.target.files[0]);
  };

  const doneImgHandler = () => {
    let formData = new FormData();

    formData.append("ImgProfile", file);

    const config = {
      headers: {
        "content-type": "multipart/form-data",
        Authorization: `Bearer ${token}`,
      },
    };

    axios
      .post(`${BaseUrl}api/User/uploadimage`, formData, config)
      .then((response) => {
        if (response.status === 200) {
          window.location.reload(true);
          console.log(response.data);
          alert(response.data.massage);
          localStorage.setItem("img", response.data.photo);
        } else {
          alert("please try again later");
        }
      })
      .catch((error) => {
        console.log(error);
      });
    // alert("Edit image");
    console.log(file);
    setOpen(false);
    setFile(null);
  };

  const handleClickOpen = () => {
    setOpen(true);
    setFile(null);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const BlueOnGreyTooltip = withStyles({
    tooltip: {
      color: "#164778",
      backgroundColor: "#E6E6E6",
      height: 50,
      width: 110,
      fontSize: 17,
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: 10,
    },
  })(Tooltip);

  

  return (
    <div>
      <BlueOnGreyTooltip
        title="Edit Profile Picture"
        placement="right"
        arrow
        disableFocusListener
        disableTouchListener
      >
        <Button variant="contained" onClick={handleClickOpen}>
          <EditIcon />
        </Button>

      </BlueOnGreyTooltip>


      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Edit Your Personal Picture</DialogTitle>
        <DialogContent>
          <input
            type="file"
            id="img"
            name="img"
            accept="image/*"
            className="::file-selector-button"
            onChange={handleFile}
          />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {file !== null && <Button onClick={doneImgHandler}>Done</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
