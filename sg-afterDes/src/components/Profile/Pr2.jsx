// import React from "react";
// import { makeStyles } from "@material-ui/core/styles";
// import {
//   Container,
//   Grid,
//   Paper,
//   Typography,
//   Avatar,
//   Link,
//   Button,
//   List,
//   ListItem,
//   ListItemText,
//   TextField,
//   ExpansionPanel,
//   ExpansionPanelSummary,
//   ExpansionPanelDetails,
// } from "@material-ui/core";

// const useStyles = makeStyles((theme) => ({
//   root: {
//     padding: theme.spacing(3, 2),
//   },
//   avatar: {
//     width: theme.spacing(15),
//     height: theme.spacing(15),
//   },
//   userInfo: {
//     padding: theme.spacing(3, 2),
//   },
//   bio: {
//     padding: theme.spacing(3, 2),
//     marginTop: theme.spacing(3),
//   },
//   skills: {
//     padding: theme.spacing(3, 2),
//     marginTop: theme.spacing(3),
//   },
//   skill: {
//     marginRight: theme.spacing(1),
//   },
//   editForm: {
//     padding: theme.spacing(3, 2),
//     marginTop: theme.spacing(3),
//   },
//   formControl: {
//     width: "100%",
//   },
// }));

// export default function Pr2() {
//   const classes = useStyles();
//   const [expanded, setExpanded] = React.useState(false);
//   const [user, setUser] = React.useState({
//     name: "John Doe",
//     location: "New York, NY",
//     email: "johndoe@gmail.com",
//     phone: "555-555-5555",
//     website: "https://johndoe.com",
//     bio: "I am a software developer with 5 years of experience in the industry. I specialize in JavaScript and have experience working with React, Node.js, and Express.",
//     skills: ["JavaScript", "React", "Node.js", "Express"],
//   });

//   const handleChange = (panel) => (event, isExpanded) => {
//     setExpanded(isExpanded ? panel : false);
//   };

//   const handleEdit = (event) => {
//     event.preventDefault();
//     // Save the updated user information to the backend
//   };

//   return (
//     <Container maxWidth="md">
//       <Grid container spacing={3}>
//         <Grid item xs={12} md={4}>
//           <Paper className={classes.root}>
//             <Avatar src={user.avatar} className={classes.avatar} />
//             <Typography variant="h5">{user.name}</Typography>
//             <Typography variant="subtitle1">{user.location}</Typography>
//             <div>
//               <Link href="#">
//                 <Button variant="outlined" color="primary">
//                   GitHub
//                 </Button>
//               </Link>
//               <Link href="#">
//                 <Button variant="outlined" color="primary">
//                   LinkedIn
//                 </Button>
//               </Link>
//             </div>
//           </Paper>
//         </Grid>
//         <Grid item xs={12} md={8}>
//           <Paper className={classes.userInfo}>
//             <Typography variant="h6">User Information</Typography>
//             <List>
//               <ListItem>
//                 <ListItemText primary="Email" secondary={user.email} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="Phone" secondary={user.phone} />
//               </ListItem>
//               <ListItem>
//                 <ListItemText primary="Website" secondary={user.website} />
//               </ListItem>
//             </List>
//           </Paper>
//           <Paper className={classes.bio}>
//             <Typography variant="h6">Bio</Typography>
//             <Typography>{user.bio}</Typography>
//           </Paper>
//           <Paper className={classes.skills}>
//             <Typography variant="h6">Skills</Typography>
//             <div>
//               {user.skills.map((skill) => (
//                 <Typography
//                   variant="body1"
//                   key={skill}
//                   className={classes.skill}
//                 >
//                   {skill}
//                 </Typography>
//               ))}
//             </div>
//           </Paper>
//           <ExpansionPanel
//             expanded={expanded === "panel1"}
//             onChange={handleChange("panel1")}
//           >
//             <ExpansionPanelSummary>
//               <Typography>Edit Profile</Typography>
//             </ExpansionPanelSummary>
//             <ExpansionPanelDetails>
//               <form className={classes.editForm} onSubmit={handleEdit}>
//                 <TextField
//                   id="name"
//                   label="Name"
//                   className={classes.formControl}
//                   value={user.name}
//                   onChange={(e) => setUser({ ...user, name: e.target.value })}
//                   margin="normal"
//                 />
//                 <TextField
//                   id="location"
//                   label="Location"
//                   className={classes.formControl}
//                   value={user.location}
//                   onChange={(e) =>
//                     setUser({ ...user, location: e.target.value })
//                   }
//                   margin="normal"
//                 />
//                 <TextField
//                   id="email"
//                   label="Email"
//                   className={classes.formControl}
//                   value={user.email}
//                   onChange={(e) => setUser({ ...user, email: e.target.value })}
//                   margin="normal"
//                 />
//                 <TextField
//                   id="phone"
//                   label="Phone"
//                   className={classes.formControl}
//                   value={user.phone}
//                   onChange={(e) => setUser({ ...user, phone: e.target.value })}
//                   margin="normal"
//                 />
//                 <TextField
//                   id="website"
//                   label="Website"
//                   className={classes.formControl}
//                   value={user.website}
//                   onChange={(e) =>
//                     setUser({ ...user, website: e.target.value })
//                   }
//                   margin="normal"
//                 />
//                 <TextField
//                   id="bio"
//                   label="Bio"
//                   className={classes.formControl}
//                   value={user.bio}
//                   onChange={(e) => setUser({ ...user, bio: e.target.value })}
//                   margin="normal"
//                   multiline
//                   rows={4}
//                 />
//                 <TextField
//                   id="skills"
//                   label="Skills"
//                   className={classes.formControl}
//                   value={user.skills.join(", ")}
//                   onChange={(e) =>
//                     setUser({ ...user, skills: e.target.value.split(",") })
//                   }
//                   margin="normal"
//                   helperText="Comma separated values"
//                 />
//                 <Button
//                   type="submit"
//                   variant="contained"
//                   color="primary"
//                   className={classes.submit}
//                 >
//                   Save Changes
//                 </Button>
//               </form>
//             </ExpansionPanelDetails>
//           </ExpansionPanel>
//         </Grid>
//       </Grid>
//     </Container>
//   );
// }
