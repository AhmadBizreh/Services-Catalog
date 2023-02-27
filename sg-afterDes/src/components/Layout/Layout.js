import React from "react";
import MainNavigation from "./MainNavigation";
import Topbar from "./topbar/Topbar";
// import Nav3 from "./Nav3d";
// import Nav3 from "./Nav3";

const Layout = (props) => {
  return (
    <>
      {/* <Nav3 /> */}
      <Topbar />
      {/* <MainNavigation /> */}
      {props.children}
    </>
  );
};

export default Layout;
