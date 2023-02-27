import * as React from "react";
import { useSelector } from "react-redux";
import { useDispatch } from "react-redux";
import { categorieAction } from "../../../store/categoriePost";

import { useState, useRef } from "react";

import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import TextField from "@mui/material/TextField";
import CategoriesSelctor from "./CategoriesSelctor";
import SelectTagDialog from "./selectTagDialog";
import BaseUrl from "../../URL";
import PostAddIcon from '@mui/icons-material/PostAdd';
import {
  withStyles
} from "@material-ui/core/styles";
import Tooltip from '@mui/material/Tooltip';



export default function SharePost(props) {
  const dispatch = useDispatch();
  const [open, setOpen] = React.useState(false);
  const nextisClicet = useSelector(
    (state) => state.categoriePost.isPickeCategorie
  );
  const pickeCategoriesId = useSelector(
    (state) => state.categoriePost.categoryId
  );
  const pickeCategoriesName = useSelector(
    (state) => state.categoriePost.Categorie
  );
  const pickecategoryId = useSelector(
    (state) => state.categoriePost.categoryId
  );
  const token = useSelector((state) => state.auth.id);

  const titelRef = useRef();
  const descriptionRef = useRef();
  const [tages, setTages] = useState([]); //titles tags
  const [idTages, setIdTages] = useState([]); //id tags
  const [errorTitel, setErrorTitel] = useState(false);
  const [errorDescription, setErrorDescription] = useState(false);
  const [show, setShow] = useState(false);
  const [loding, setLoding] = useState(false);

  //>..............................................
  const ShareNewPost = async (
    url,
    ITitle,
    IDescription,
    ICategoryId,
    ISearchTag,
    sId
  ) => {
    console.log("ISearchTagid");
    console.log(sId);

    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        Title: ITitle,
        Description: IDescription,
        CategoryId: ICategoryId,
        SearchTag: ISearchTag,
        SearchTagid: sId,

        // Gender: Customervalues.gender,
        // Age: parseInt(Customervalues.age),
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((res) => {
        setLoding(false);
        if (res.ok) {
          alert("Success");
          alert(res.data.message);
          return res.json();
        } else {
          res.json().then((data) => {
            let errorMassage = "Failed to Share Your Post";
            console.log(errorMassage);
            setLoding(false);
            alert(errorMassage);
            throw new Error(errorMassage);
          });
        }
      })
      .then((data) => {})
      .catch(() => {});
  };

  //>..............................................

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    dispatch(categorieAction.RemovePickeCategorie());
  };

  const handleDone = () => {
    const titelEntre = titelRef.current.value;
    if (titelEntre.trim().length === 0) {
      console.log("not done titel");
      setErrorTitel(true);
      return;
    } else {
      setErrorTitel(false);
      console.log("done titel");
    }

    const descriptionEntre = descriptionRef.current.value;
    if (descriptionEntre.trim().length === 0) {
      console.log("not done description");
      setErrorDescription(true);
      return;
    } else {
      setErrorDescription(false);
      console.log("done description");
    }

    if (!errorDescription || !errorTitel) {
      console.log(pickeCategoriesId);
      console.log(idTages);
      console.log(tages);
      console.log(titelEntre);
      console.log(descriptionEntre);
      const sId = idTages.map(String);

      ShareNewPost(
        `${BaseUrl}api/ServicesPosts/createpost`,
        titelEntre,
        descriptionEntre,
        pickeCategoriesId,
        tages,
        sId
      );
      // console.log(tages);
      //API
      setOpen(false);
      dispatch(categorieAction.RemovePickeCategorie());
      props.refresh();
    }
  };

  const tagHanler = (ti, Show) => {
    const titele = ti;
    setTages(titele);
    setShow(Show);
  };

  const tagesIdHanler = (id) => {
    setIdTages(id);
  };

  const BlueOnGreyTooltip = withStyles({
    tooltip: {
      color: "#164778",
      backgroundColor: "#E6E6E6",
      height:33,
      width:110,
      fontSize:17,
      fontWeight:"bold",
      textAlign:"center",
      borderRadius:10,
    }
  })(Tooltip);

  return (
    <div>
      <BlueOnGreyTooltip  title="Share Post" placement="left" arrow disableFocusListener disableTouchListener>
      <button className="addPostcircularBtn" onClick={handleClickOpen}>
        <PostAddIcon color="default" className="addPostcircularBtnIcon" fontSize="large" />
      </button>
      </BlueOnGreyTooltip>
      <Dialog open={open} onClose={handleClose}>
        <DialogTitle>Share your post now</DialogTitle>
        <DialogContent>
          <>
            {nextisClicet && <p>Categorie Name: {pickeCategoriesName} </p>}
            {nextisClicet && (
              <h1>
                <SelectTagDialog
                  titelHanler={tagHanler}
                  categoryId={pickecategoryId}
                  tagsId={tagesIdHanler}
                />
              </h1>
            )}
            {!nextisClicet && <CategoriesSelctor />}
            {nextisClicet && !show && <p>you have select exactly 6 tages</p>}
            {nextisClicet && (
              <>
                {/* <p>fffff</p>
                <p>{idTages}</p> */}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Title"
                  label="Title"
                  type="text"
                  id="text"
                  inputRef={titelRef}
                />
                {errorTitel && <p>Titel is required !</p>}
                <TextField
                  margin="normal"
                  required
                  fullWidth
                  name="Description"
                  label="Description"
                  type="text"
                  id="text"
                  inputRef={descriptionRef}
                />
                {errorDescription && <p>Description is required !</p>}
              </>
            )}
          </>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Cancel</Button>
          {show && <Button onClick={handleDone}>Done</Button>}
        </DialogActions>
      </Dialog>
    </div>
  );
}
