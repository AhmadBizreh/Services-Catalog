import React from "react";
import { useSelector } from "react-redux";
import { Link } from "react-router-dom";

import UserMenu from "./UserMenu";
import NotificationsMenu from "./NotificationsMenu";

import "./topbar.css";
import classes from "../MainNavigation.module.css";

import { Button } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import SearchBar from "./SearchBar/SearchBar";
import { useState, useEffect } from "react";

export default function Topbar() {
  const show = useSelector((state) => state.auth.isAuth);
  const [totalNotf, setTotalNotf] = useState(0);
  const [is, setIs] = useState(false);

  const chanegTotalSpan = (x, y) => {
    setTotalNotf(x + y);
    // console.log(totalNotf);
  };
  useEffect(() => {
    let timerId = setTimeout(() => {
      timerId = null;
      setIs(!is);
    }, 2000);

    // cleanup the timmer when component unmout
    return () => clearTimeout(timerId);
  }, [is]);

  return (
    <div className="topbarContainer">
      <div className="topbarLeft">
        <Link to="/" className="logo">
          <img src="assets/logo.png" alt="" />
        </Link>
      </div>
      {/* <Link to={"/"} className="topbarLink">
          Homepage
        </Link> */}

      <div className="topbarRight">
        <div className="topbarIcons"></div>
        <div className="topbarCenter">
          <div className="searchbar">
            <SearchBar />
          </div>
        </div>

        {show && (
          <div className="topbarIconItem">
            <NotificationsMenu chanegTotalSpan={chanegTotalSpan} />
            {totalNotf !== 0 && (
              <span className="topbarIconBadgeMain">{totalNotf}</span>
            )}
          </div>
        )}
        {show && <UserMenu />}

        {!show && (
          <Button
            component={Link}
            to="/auth"
            className={classes.LoginButton}
            // style={{color: "#fff"}}
          >
            Login
          </Button>
        )}
        {/* <img src="/assets/person/avatar.png" alt="" className="topbarImg" /> */}
      </div>
    </div>
  );
}
