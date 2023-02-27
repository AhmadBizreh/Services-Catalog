import * as React from "react";

import { useDispatch } from "react-redux";
import { authAction } from "../../../store/auth";
import { Link, useNavigate } from "react-router-dom";
import { useEffect } from "react";
import Box from "@mui/material/Box";
import Avatar from "@mui/material/Avatar";
import Menu from "@mui/material/Menu";
import MenuItem from "@mui/material/MenuItem";
import ListItemIcon from "@mui/material/ListItemIcon";
import Divider from "@mui/material/Divider";
import IconButton from "@mui/material/IconButton";
import Tooltip from "@mui/material/Tooltip";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsNoneIcon from "@mui/icons-material/NotificationsNone";
import GavelIcon from "@mui/icons-material/Gavel";
import "./topbar.css";
import BaseUrl from "../../URL";

export default function UserMenu(props) {
  const [chatNotf, setChatNotf] = React.useState([]);
  const [contractNotf, setcontractNotf] = React.useState([]);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [is, setIs] = React.useState(false);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const open = Boolean(anchorEl);
  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };
  const handleClose = () => {
    setAnchorEl(null);
  };
  const fetchNotfChat = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.count);
    setChatNotf(data.count);
  };
  const fetchNotfCont = async (url) => {
    const response = await fetch(url);
    const data = await response.json();
    // console.log(data.count);
    setcontractNotf(data.count);
  };

  // useEffect(() => {
  //   fetchNotf(`${BaseUrl}api/Chat/Notificationchat`);

  //   const intervalId = setInterval(fetchNotf, 10000);

  //   return () => {
  //     clearInterval(intervalId);
  //   };
  // }, []);
  useEffect(() => {
    let timerId = setTimeout(() => {
      fetchNotfChat(`${BaseUrl}api/Chat/Notificationchat`);
      fetchNotfCont(`${BaseUrl}api/Contracts/ContractNotification`);
      timerId = null;
      setIs(!is);
      props.chanegTotalSpan(chatNotf, contractNotf);
    }, 2000);

    // cleanup the timmer when component unmout
    return () => clearTimeout(timerId);
  }, [is]);

  return (
    <>
      <Box sx={{ display: "flex", alignItems: "center", textAlign: "center" }}>
        <Tooltip title="Account Notifications">
          <IconButton
            onClick={handleClick}
            size="small"
            sx={{ ml: 2 }}
            aria-controls={open ? "account-menu" : undefined}
            aria-haspopup="true"
            aria-expanded={open ? "true" : undefined}
          >
            <NotificationsNoneIcon
              sx={{ width: 30, height: 25, bottom: 4, color: "white" }}
            />
          </IconButton>
        </Tooltip>
      </Box>
      <Menu
        anchorEl={anchorEl}
        id="account-menu"
        open={open}
        onClose={handleClose}
        onClick={handleClose}
        PaperProps={{
          elevation: 0,
          sx: {
            overflow: "visible",
            filter: "drop-shadow(0px 2px 8px rgba(0,0,0,0.32))",
            mt: 1.5,
            "& .MuiAvatar-root": {
              width: 32,
              height: 32,
              ml: -0.5,
              mr: 1,
            },
            "&:before": {
              content: '""',
              display: "block",
              position: "absolute",
              top: 0,
              right: 14,
              width: 10,
              height: 10,
              bgcolor: "background.paper",
              transform: "translateY(-50%) rotate(45deg)",
              zIndex: 0,
            },
          },
        }}
        transformOrigin={{ horizontal: "right", vertical: "top" }}
        anchorOrigin={{ horizontal: "right", vertical: "bottom" }}
      >
        <MenuItem component={Link} to="/chat">
          <ListItemIcon>
            <div className="topbarIconItem">
              <ChatIcon />
              {chatNotf !== 0 && (
                <span className="topbarIconBadge">{chatNotf}</span>
              )}
            </div>
          </ListItemIcon>
          Chat
        </MenuItem>

        <Divider />
        <MenuItem component={Link} to="/allContracts">
          <ListItemIcon>
            <div className="topbarIconItem">
              <GavelIcon />

              {contractNotf !== 0 && (
                <span className="topbarIconBadge">{contractNotf}</span>
              )}
            </div>
          </ListItemIcon>
          Contracts
        </MenuItem>
      </Menu>
    </>
  );
}
