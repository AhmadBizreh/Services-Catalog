import { useDispatch } from "react-redux";
import { categorieAction } from "../../../store/categoriePost";

import * as React from "react";
import { useEffect } from "react";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import { Button } from "@mui/material";
import { ToastContainer, toast } from "react-toastify";
import { useSelector } from "react-redux";
import BaseUrl from "../../URL";
import { LoadingOutlined } from "@ant-design/icons";
import { styles } from "../../SupportEngine/styles";
import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

const DAME_CAT = [
  {
    categoryId: 1,
    name: "it",
  },
  {
    categoryId: 2,
    name: "des",
  },
  {
    categoryId: 3,
    name: "lafe sta",
  },
  {
    categoryId: 4,
    name: "home work",
  },
];

export default function CategoriesSelctor() {
  const dispatch = useDispatch();
  // const token = useSelector((state) => state.auth.id);

  const [checked, setChecked] = React.useState([]);
  const [categoryId ,setCategoryId] = React.useState([]);
  const [pickOne, setPickone] = React.useState(false);
  const [loding, setLoding] = React.useState();
  const [cat, setCat] = React.useState([
    {
      categoryId: "",
      name: "",
    },
  ]);

  const fetchCat = async () => {
    await fetch(`${BaseUrl}api/CategoriesApi/showparent`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => setCat(data));
    setLoding(false);
    // console.log(cat);
  };

  useEffect(() => {
    setLoding(true);
    document.title = "Share Post";
    fetchCat();
    // console.log(cat);
  }, []);
  // useEffect(() => {
  //   console.log(cat);
  // }, [cat]);

  const handleToggle = (value, labelTitle) => () => {
    // console.log(cat);
    const currentIndex = checked.indexOf(value.categoryId);
    const newChecked = [...checked];

    if (currentIndex === -1) {
      newChecked.push(value.categoryId);
    } else {
      newChecked.splice(currentIndex, 1);
    }

    setChecked(labelTitle);
    setCategoryId(value.categoryId);
    setPickone(true);
    console.log(value.categoryId);
    // dispatch(
    //   categorieAction.PickeCategorie({
    //     categoryId: value.categoryId,
    //     Categorie: checked,
    //   })
    // );
  };

  const buttomHanler = () => {
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
    console.log(categoryId);
    dispatch(
      categorieAction.PickeCategorie({
        categoryId:categoryId,
        Categorie: checked,
      })
    );
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
      {loding && (
        <LoadingOutlined
          className="transition-5"
          style={{
            ...styles.loadingIcon,
            ...{
              zIndex: loding ? "10" : "-1",
              opacity: loding ? "1" : "0",
              fontSize: "82px",
              top: "calc(50% - 41px)",
              left: "calc(50% - 41px)",
            },
          }}
        />
      )}
      <div style={{ textAlign: "center" }}>
        <p>Pick the Categories</p>
        <br />
        <p>{` Your Categories:"${checked}"`}</p>
      </div>
      <br />
      <List
        sx={{
          width: "100%",
          maxWidth: 360,
          minWidth: 360,
          bgcolor: "background.paper",
        }}
      >
        {cat.map((value) => {
          const labelId = `checkbox-list-label-${value.categoryId}`;
          const labelTitle = value.name;

          return (
            <ListItem key={value} disablePadding>
              <ListItemButton
                role={undefined}
                onClick={handleToggle(value, labelTitle)}
                dense
              >
                <ListItemIcon><ScatterPlotIcon/></ListItemIcon>
                <ListItemText id={labelId} primary={`. ${value.name}`} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
      <br />
      <div style={{ textAlign: "center" }}>
        {pickOne && checked && <Button onClick={buttomHanler}>Ok</Button>}
      </div>
    </>
  );
}
