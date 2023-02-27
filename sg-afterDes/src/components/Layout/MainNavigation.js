import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserMenu from "./topbar/UserMenu";
import classes from "./MainNavigation.module.css";

import { Button } from "@mui/material";
import Box from "@mui/material/Box";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import { styled } from "@mui/material/styles";
import MuiAppBar from "@mui/material/AppBar";
import { color } from "@mui/system";
import { wait } from "@testing-library/user-event/dist/utils";

const drawerWidth = 240;

const ApppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const MainNavigation = () => {
  const show = useSelector((state) => state.auth.isAuth);

  return (
    <Box >
      <ApppBar position="static">
        <Toolbar>
          <div className="HeaderIcon">
            <Link to="/">
              <img src="assets/logo.png" alt="" />
            </Link>
          </div>
          <Typography
            variant="h6"
            component="div"
            sx={{ flexGrow: 1 }}
          ></Typography>
          <nav>
            <ul>
              {!show && (
                <li>
                  <Button
                    component={Link}
                    to="/auth"
                    className={classes.LoginButton}
                    // style={{color: "#fff"}}
                  >
                    Login
                  </Button>
                </li>
              )}
              {show && <UserMenu />}
            </ul>
          </nav>
        </Toolbar>
      </ApppBar>
    </Box>
  );
};
export default MainNavigation;
