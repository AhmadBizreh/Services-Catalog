import React from "react";
import { useState } from "react";
import { useSelector } from "react-redux";
import "./rightbar.css";
import { NavLink } from "react-router-dom";

import { makeStyles } from "@material-ui/core/styles";
import {
  Container,
  Grid,
  Paper,
  Typography,
  Avatar,
  Link,
  Button,
  List,
  ListItem,
  ListItemText,
  TextField,
  ExpansionPanel,
  ExpansionPanelSummary,
  ExpansionPanelDetails,
} from "@material-ui/core";

import EditIcon from "@mui/icons-material/Edit";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@mui/material/Tooltip";

const useStyles = makeStyles((theme) => ({
  root: {
    padding: theme.spacing(15, 15),
  },

  userInfo: {
    padding: theme.spacing(3, 2),
    backgroundColor: "#E6E6E6",
    width: "400px",
    maxWidth: "400px",
    borderRadius: "20px",
  },
  bio: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(3),
    backgroundColor: "#E6E6E6",
    width: "400px",
    maxWidth: "400px",
    borderRadius: "20px",
  },
  skills: {
    padding: theme.spacing(3, 2),
    marginTop: theme.spacing(3),
    backgroundColor: "#E6E6E6",
    width: "400px",
    maxWidth: "400px",
    borderRadius: "20px",
  },
  skill: {
    marginRight: theme.spacing(1),
  },
}));

export default function Rightbar(props) {
  const RoleName = useSelector((state) => state.auth.roleName);
  const [isMy, setISMy] = useState(props.isMy);
  const classes = useStyles();

  const BlueOnGreyTooltip = withStyles({
    tooltip: {
      color: "#164778",
      backgroundColor: "#E6E6E6",
      height: 33,
      width: 110,
      fontSize: 17,
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: 10,
    },
  })(Tooltip);

  const ProfileRightbar = () => {
    return (
      <>
        <div className="userinfoContainer">
          <Container maxWidth="md" minWidth="md">
            <Grid container spacing={3}>
              <Grid item xs={20} md={50}>
                <Paper className={classes.userInfo}>
                  {isMy && (
                    <Typography variant="h7" className="editprofbtn">
                      <NavLink to={"/editProfile"}>
                        <BlueOnGreyTooltip
                          title="Edit Profile"
                          placement="right"
                          arrow
                          disableFocusListener
                          disableTouchListener
                        >
                          <EditIcon />
                        </BlueOnGreyTooltip>
                      </NavLink>
                    </Typography>
                  )}

                  <Typography variant="h6">User Information: </Typography>

                  <List>
                    <ListItem>
                      <ListItemText primary="Name: " />
                      <ListItemText
                        secondary={
                          props.userInfo.firstName +
                          " " +
                          props.userInfo.lastName
                        }
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="PhoneNumber: " />
                      <ListItemText secondary={props.userInfo.phoneNumber} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Google Account: " />
                      <ListItemText secondary={props.userInfo.googleAccount} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="LinkedIn: " />
                      <ListItemText
                        secondary={props.userInfo.linkedinAccount}
                      />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Gender: " />
                      <ListItemText secondary={props.userInfo.gender} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Age: " />
                      <ListItemText secondary={props.userInfo.age} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Address: " />
                      <ListItemText secondary={props.userInfo.address} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Languages: " />
                      <ListItemText secondary={props.userInfo.languesges} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Occupation: " />
                      <ListItemText secondary={props.userInfo.occupation} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Education: " />
                      <ListItemText secondary={props.userInfo.education} />
                    </ListItem>
                    <ListItem>
                      <ListItemText primary="Certificate: " />
                      <ListItemText secondary={props.userInfo.certificate} />
                    </ListItem>
                  </List>
                </Paper>
                <Paper className={classes.bio}>
                  <Typography variant="h6">Description: </Typography>
                  <Typography>{props.userInfo.description}</Typography>
                </Paper>
                <Paper className={classes.skills}>
                  <Typography variant="h6">Skills: </Typography>
                  <div>
                    <Typography variant="body1">
                      {props.userInfo.skills}
                    </Typography>
                  </div>
                </Paper>
              </Grid>
            </Grid>
          </Container>
        </div>
        <br />
      </>
    );
  };
  return (
    <div className="rightbar">
      <div className="rightbarWrapper">{<ProfileRightbar />}</div>
    </div>
  );
}
