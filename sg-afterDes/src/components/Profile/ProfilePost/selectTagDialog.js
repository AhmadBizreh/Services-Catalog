import * as React from "react";
import { useSelector } from "react-redux";
import { useEffect } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import Checkbox from "@mui/material/Checkbox";
import BaseUrl from "../../URL";

const DAME_TAG = [
  {
    CategoryId: 1,
    Name: "Web development",
  },
  {
    CategoryId: 2,
    Name: "Mobile application development",
  },
  {
    CategoryId: 3,
    Name: "Ai",
  },
  {
    CategoryId: 4,
    Name: "Network development",
  },
];

export default function SelectTagDialog(props) {
  const [loding, setLoding] = React.useState();
  const [checked, setChecked] = React.useState([0]);
  const [title, setTitel] = React.useState([]);
  const [Show, setShow] = React.useState(false);
  const [id, setId] = React.useState([]);
  const [tages, setTages] = React.useState([
    {
      categoryId: "",
      name: "",
    },
  ]);

  //............................

  // fetch(`${BaseUrl}api/User/editprofile`, {
  //   method: "POST",
  //   body: JSON.stringify({
  //     // id: Customervalues.firstName,

  //     // Age: parseInt(Customervalues.age),

  //     // returnSecureToken: true,
  //   }),
  //   headers: {
  //     "Content-Type": "application/json",
  //     Authorization: `Bearer ${token}`,
  //   },
  // })
  //   .then((res) => {
  //     setLoding(false);
  //     // console.log(res.massage);
  //     if (res.ok) {
  //       toast("Success");
  //       // navigate("/auth");
  //       return res.json();
  //     } else {
  //       res.json().then((data) => {
  //         let errorMassage = "Update Failed";
  //         console.log(errorMassage);
  //         setLoding(false);
  //         toast(errorMassage);
  //         throw new Error(errorMassage);
  //       });
  //     }
  //   })
  //   .then((data) => {
  //     // const id = data.idToken;
  //     // const email = data.email;
  //     // console.log("data");
  //     // dispatch(
  //     //   authAction.login({
  //     //     email,
  //     //     id,
  //     //   })
  //     // );
  //     // navigate("/auth");
  //     // console.log(data);
  //   })
  //   .catch(() => {});

  //API SEND CAT TO GET TAGES

  const fetchTages = async () => {
    console.log(props.categoryId);
    const ID = parseInt(props.categoryId);
    // console.log(ID);
    // console.log(props.categoryId);

    await fetch(
      `${BaseUrl}api/CategoriesApi/GetCategorytag?id=${props.categoryId}`,
      {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      }
    )
      .then((res) => {
        setLoding(false);
        if (res.ok) {
          return res.json();
        } else {
          alert("Error trye later");
        }
      })
      .then((data) => {
        setTages(data);
        console.log(data);
      })
      .catch(() => {});
    setLoding(false);
    // console.log(cat);
  };

  useEffect(() => {
    setLoding(true);
    // console.log("props.categoryId");
    // console.log(props.categoryId);
    fetchTages();

    // console.log(cat);
  }, []);

  const handleToggle = (value, labelTitle) => () => {
    const currentIndex = checked.indexOf(value);
    const newChecked = [...checked];
    const currentTitle = title.indexOf(labelTitle);
    const currentId = id.indexOf(value.categoryId);
    const newTitle = [...title];
    const newId = [...id];

    if (currentIndex === -1) {
      newTitle.push(labelTitle);
      newId.push(value.categoryId);
      newChecked.push(value);
    } else {
      newTitle.splice(currentTitle, 1);
      newId.splice(currentId, 1);
      newChecked.splice(currentIndex, 1);
    }
    setTitel(newTitle);
    setId(newId);
    setChecked(newChecked);
    // setIdTag(value.CategoryId);
  };
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    //  console.log (pickeCategoriesId);
    setOpen(true);
  };

  const handleClose = (reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      console.log("Close");
      setTitel([]);
      // setId([])
      setChecked([0]);
      setShow(false);
    }
  };

  const handleOk = (reason) => {
    if (reason !== "backdropClick") {
      setOpen(false);
      console.log("Ok");
      console.log(id);
      console.log(title);
      alert(id);
      setShow(true);
    }
  };
  props.titelHanler(title, Show);
  props.tagsId(id);

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Select Your Tages, <br /> <p>{` Your Tages:"${title}"`}</p>
      </Button>
      <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
        <DialogTitle>
          Chose Carefully, Your Post Will Search For it By Your Tags
          {title.length !== 6 && <p>you shpudld selact at least 6 tags.</p>}
          {/* <p>{props.categoryId}</p> */}
        </DialogTitle>
        <DialogContent>
          <List
            sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
          >
            {tages.map((value) => {
              const labelId = `checkbox-list-label-${value.categoryId}`;
              const labelTitle = value.name;

              return (
                <>
                  <ListItem key={value.categoryId} disablePadding>
                    <ListItemButton
                      role={undefined}
                      onClick={handleToggle(value, labelTitle)}
                      dense
                    >
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={checked.indexOf(value) !== -1}
                          tabIndex={-1}
                          disableRipple
                          inputProps={{ "aria-labelledby": labelId }}
                        />
                      </ListItemIcon>
                      <ListItemText
                        id={labelId}
                        primary={`${" "}. ${value.name}`}
                      />
                    </ListItemButton>
                  </ListItem>
                </>
              );
            })}
          </List>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cleaning</Button>
          {checked.length <= 7 && checked.length >= 2 && (
            <Button onClick={handleOk}>Ok</Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
