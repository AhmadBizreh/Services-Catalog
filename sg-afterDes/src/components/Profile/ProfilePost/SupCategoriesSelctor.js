// // import { useDispatch } from "react-redux";
// // import { categorieAction } from "../../../store/categoriePost";

// // import * as React from "react";
// // import { useEffect } from "react";
// // import List from "@mui/material/List";
// // import ListItem from "@mui/material/ListItem";
// // import ListItemButton from "@mui/material/ListItemButton";
// // import ListItemIcon from "@mui/material/ListItemIcon";
// // import ListItemText from "@mui/material/ListItemText";
// // import { Button } from "@mui/material";
// // import { ToastContainer, toast } from "react-toastify";
// // import { useSelector } from "react-redux";
// // import BaseUrl from "../../URL";
// // import { LoadingOutlined } from "@ant-design/icons";
// // import { styles } from "../../SupportEngine/styles";
// // import ScatterPlotIcon from '@mui/icons-material/ScatterPlot';

// // const DAME_CAT = [
// //   {
// //     categoryId: 1,
// //     name: "it",
// //   },
// //   {
// //     categoryId: 2,
// //     name: "des",
// //   },
// //   {
// //     categoryId: 3,
// //     name: "lafe sta",
// //   },
// //   {
// //     categoryId: 4,
// //     name: "home work",
// //   },
// // ];

// // export default function SupCategoriesSelctor() {
// //   const dispatch = useDispatch();
// //   const pickeCategoriesId = useSelector(
// //     (state) => state.categoriePost.categoryId
// //   );

// //   const [checked, setChecked] = React.useState([]);
// //   const [categoryId ,setCategoryId] = React.useState([]);
// //   const [pickOne, setPickone] = React.useState(false);
// //   const [loding, setLoding] = React.useState();
// //   const [cat, setCat] = React.useState([
// //     {
// //       categoryId: "",
// //       name: "",
// //     },
// //   ]);

// //   const fetchSupCat = async () => {
// //     await fetch(`${BaseUrl}api/CategoriesApi/showchildern?id=${pickeCategoriesId}`, {
// //       method: "GET",
// //       headers: {
// //         "Content-Type": "application/json",
// //         // Authorization: `Bearer ${token}`,
// //       },
// //     })
// //       .then((response) => response.json())
// //       .then((data) => {setCat(data)
// //         console.log(data);
// //     });
// //     setLoding(false);
// //     // console.log(cat);
// //   };

// //   useEffect(() => {
// //     setLoding(true);
// //     // document.title = "Share Post";
// //     fetchSupCat();
// //     // console.log(cat);
// //   }, []);
// //   // useEffect(() => {
// //   //   console.log(cat);
// //   // }, [cat]);

// //   const handleToggle = (value, labelTitle) => () => {
// //     // console.log(cat);
// //     const currentIndex = checked.indexOf(value.categoryId);
// //     const newChecked = [...checked];

// //     if (currentIndex === -1) {
// //       newChecked.push(value.categoryId);
// //     } else {
// //       newChecked.splice(currentIndex, 1);
// //     }

// //     setChecked(labelTitle);
// //     setCategoryId(value.categoryId);
// //     setPickone(true);
// //     console.log(value.categoryId);
// //     // dispatch(
// //     //   categorieAction.PickeCategorie({
// //     //     categoryId: value.categoryId,
// //     //     Categorie: checked,
// //     //   })
// //     // );
// //   };

// //   const buttomHanler = () => {

// //     console.log(categoryId);
// //     dispatch(
// //       categorieAction.PickeCategorie({
// //         SubcategoryId:categoryId,
// //         SubCategorie: checked,
// //       })
// //     );
// //   };

// //   return (
// //     <>
// //       {!loding && (
// //         <ToastContainer
// //           position="top-center"
// //           autoClose={1500}
// //           hideProgressBar={false}
// //           newestOnTop={false}
// //           closeOnClick={false}
// //           rtl
// //           pauseOnFocusLoss
// //           draggable
// //           pauseOnHover
// //           theme="colored"
// //         />
// //       )}
// //       {loding && (
// //         <LoadingOutlined
// //           className="transition-5"
// //           style={{
// //             ...styles.loadingIcon,
// //             ...{
// //               zIndex: loding ? "10" : "-1",
// //               opacity: loding ? "1" : "0",
// //               fontSize: "82px",
// //               top: "calc(50% - 41px)",
// //               left: "calc(50% - 41px)",
// //             },
// //           }}
// //         />
// //       )}
// //       <div style={{ textAlign: "center" }}>
// //         <p>Pick the Categories</p>
// //         <br />
// //         <p>{` Your Categories:"${checked}"`}</p>
// //       </div>
// //       <br />
// //       <List
// //         sx={{
// //           width: "100%",
// //           maxWidth: 360,
// //           minWidth: 360,
// //           bgcolor: "background.paper",
// //         }}
// //       >
// //         {cat.map((value) => {
// //           const labelId = `checkbox-list-label-${value.categoryId}`;
// //           const labelTitle = value.name;

// //           return (
// //             <ListItem key={value} disablePadding>
// //               <ListItemButton
// //                 role={undefined}
// //                 onClick={handleToggle(value, labelTitle)}
// //                 dense
// //               >
// //                 <ListItemIcon><ScatterPlotIcon/></ListItemIcon>
// //                 <ListItemText id={labelId} primary={`. ${value.name}`} />
// //               </ListItemButton>
// //             </ListItem>
// //           );
// //         })}
// //       </List>
// //       <br />
// //       <div style={{ textAlign: "center" }}>
// //         {pickOne && checked && <Button onClick={buttomHanler}>Ok</Button>}
// //       </div>
// //     </>
// //   );
// // }

// import * as React from "react";
// import { useSelector } from "react-redux";
// import { useEffect } from "react";

// import Button from "@mui/material/Button";
// import Dialog from "@mui/material/Dialog";
// import DialogActions from "@mui/material/DialogActions";
// import DialogContent from "@mui/material/DialogContent";
// import DialogTitle from "@mui/material/DialogTitle";

// import List from "@mui/material/List";
// import ListItem from "@mui/material/ListItem";
// import ListItemButton from "@mui/material/ListItemButton";
// import ListItemIcon from "@mui/material/ListItemIcon";
// import ListItemText from "@mui/material/ListItemText";
// import Checkbox from "@mui/material/Checkbox";
// import BaseUrl from "../../URL";

// const DAME_TAG = [
//   {
//     CategoryId: 1,
//     Name: "Web development",
//   },
//   {
//     CategoryId: 2,
//     Name: "Mobile application development",
//   },
//   {
//     CategoryId: 3,
//     Name: "Ai",
//   },
//   {
//     CategoryId: 4,
//     Name: "Network development",
//   },
// ];

// export default function SupCategoriesSelctor(props) {
//   const [loding, setLoding] = React.useState();
//   const [checked, setChecked] = React.useState([0]);
//   const [title, setTitel] = React.useState([]);
//   const [Show, setShow] = React.useState(false);
//   const [id, setId] = React.useState([]);
//   const [tages, setTages] = React.useState([]);

//   const fetchTages = async () => {
//     await fetch(
//       `${BaseUrl}api/CategoriesApi/showparent`,
//       {
//         method: "GET",
//         headers: {
//           "Content-Type": "application/json",
//         },
//       }
//     )
//       .then((res) => {
//         setLoding(false);
//         if (res.ok) {
//           return res.json();
//         } else {
//           alert("Error trye later");
//         }
//       })
//       .then((data) => {
//         setTages(data);
//         console.log(data);
//       })
//       .catch(() => {});
//     setLoding(false);
//   };

//   useEffect(() => {
//     setLoding(true);

//     fetchTages();
//   }, []);

//   const handleToggle = (value, labelTitle) => () => {
//     const currentIndex = checked.indexOf(value);
//     const newChecked = [...checked];
//     const currentTitle = title.indexOf(labelTitle);
//     const currentId = id.indexOf(value.categoryId);
//     const newTitle = [...title];
//     const newId = [...id];

//     if (currentIndex === -1) {
//       newTitle.push(labelTitle);
//       newId.push(value.categoryId);
//       newChecked.push(value);
//     } else {
//       newTitle.splice(currentTitle, 1);
//       newId.splice(currentId, 1);
//       newChecked.splice(currentIndex, 1);
//     }
//     setTitel(newTitle);
//     setId(newId);
//     setChecked(newChecked);
//   };
//   const [open, setOpen] = React.useState(false);

//   const handleClickOpen = () => {
//     setOpen(true);
//   };

//   const handleClose = (reason) => {
//     if (reason !== "backdropClick") {
//       setOpen(false);
//       console.log("Close");
//       setTitel([]);

//       setChecked([0]);
//       setShow(false);
//     }
//   };

//   const handleOk = (reason) => {
//     if (reason !== "backdropClick") {
//       setOpen(false);
//       console.log("Ok");
//       console.log(id);
//       console.log(title);
//       alert(id);
//       setShow(true);
//     }
//   };
//   props.titelHanler(title, Show);
//   // props.tagsId(id);

//   return (
//     <div>
//       <Button onClick={handleClickOpen}>
//         Select Your Tages, <br /> <p>{` Your Tages:"${title}"`}</p>
//       </Button>
//       <Dialog disableEscapeKeyDown open={open} onClose={handleClose}>
//         <DialogTitle>
//           Chose Carefully, Your Post Will Search For it By Your Tags
//           {title.length !== 6 && <p>you shpudld selact at least 6 tags.</p>}
//           {/* <p>{props.categoryId}</p> */}
//         </DialogTitle>
//         <DialogContent>
//           <List
//             sx={{ width: "100%", maxWidth: 500, bgcolor: "background.paper" }}
//           >
//             {tages.map((value) => {
//               const labelId = `checkbox-list-label-${value.categoryId}`;
//               const labelTitle = value.name;

//               return (
//                 <>
//                   <ListItem key={value.categoryId} disablePadding>
//                     <ListItemButton
//                       role={undefined}
//                       onClick={handleToggle(value, labelTitle)}
//                       dense
//                     >
//                       <ListItemIcon>
//                         <Checkbox
//                           edge="start"
//                           checked={checked.indexOf(value) !== -1}
//                           tabIndex={-1}
//                           disableRipple
//                           inputProps={{ "aria-labelledby": labelId }}
//                         />
//                       </ListItemIcon>
//                       <ListItemText
//                         id={labelId}
//                         primary={`${value.categoryId}. ${value.name}`}
//                       />
//                     </ListItemButton>
//                   </ListItem>
//                 </>
//               );
//             })}
//           </List>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClose}>Cleaning</Button>
//           {checked.length <= 7 && checked.length >= 2 && (
//             <Button onClick={handleOk}>Ok</Button>
//           )}
//         </DialogActions>
//       </Dialog>
//     </div>
//   );
// }
