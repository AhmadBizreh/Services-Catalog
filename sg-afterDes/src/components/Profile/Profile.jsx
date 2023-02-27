import React from "react";
import "./profile.css";

import { useSelector } from "react-redux";
import { NavLink, useNavigate, useParams } from "react-router-dom";
import { useState, useEffect } from "react";

import Feed from "../feed/Feed";
import Rightbar from "../rightbar/Rightbar";

import BaseUrl from "../URL";

import { LoadingOutlined } from "@ant-design/icons";
import { styles } from "../SupportEngine/styles";

import { withStyles } from "@material-ui/core/styles";
import Tooltip from "@mui/material/Tooltip";

import MapsUgcIcon from '@mui/icons-material/MapsUgc';

export default function Profile() {
  const RoleName = useSelector((state) => state.auth.roleName);
  const { userId } = useParams();
  const [postSteat, setPostSteat] = useState([]);
  const [loding, SetLoding] = useState(true);

  const [userInfo, setUserInfo] = useState([]);
  const fetchProfileInfo = async (url) => {
    SetLoding(true);
    await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        // Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setUserInfo(data);
        SetLoding(false);
      });
  };

  const fatchPosts = async (url) => {
    SetLoding(true);

    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((posts) => {
        setPostSteat(posts);
        console.log(posts);
        SetLoding(false);
      });
  };

  useEffect(() => {
    document.title = "Profile";
    // alert(userId);
    fetchProfileInfo(
      `${BaseUrl}api/ServicesPosts/showprofile?userID=${userId}`
    );
    fatchPosts(`${BaseUrl}api/ServicesPosts/showpostuserbyid?userID=${userId}`);
    //API PROFILE INFO
  }, []);

  const BlueOnGreyTooltip = withStyles({
    tooltip: {
      color: "#164778",
      backgroundColor: "#E6E6E6",
      height: 50,
      width: 110,
      fontSize: 17,
      fontWeight: "bold",
      textAlign: "center",
      borderRadius: 10,
    },
  })(Tooltip);

  return (
    <>
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
      {!loding && (
        <>
          <div className="profile">
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    className="profileCoverImg"
                    src="../assets/post/undrawcover.svg"
                    alt=""
                  />
                  <img
                    className="profileUserImg"
                    //datBase:
                    src={userInfo.personalImage}
                    alt=""
                  />
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">
                    {userInfo.firstName + " " + userInfo.lastName}
                  </h4>
                  <span className="profileInfoDesc">Hello my friends!</span>

                  <BlueOnGreyTooltip
                    title="Send Message"
                    placement="left"
                    arrow
                    disableFocusListener
                    disableTouchListener
                  >
                    <NavLink to={`/chatWith/${userId}`} className="btnSendMes">
                    
                    <MapsUgcIcon color="default" className="btnSendMesIcon" fontSize="large" />
                  </NavLink>
                  </BlueOnGreyTooltip>

                  
                </div>
              </div>
              <div className="profileRightBottom">
                <div>
                  
                  <Rightbar userInfo={userInfo} isMy={false} />
                  {/* <NProfileForm /> */}
                  {/* <EditProfile /> */}
                  <br />

                  {/* <button>send a message</button> */}
                  {/* <Button variant="outlined">Send A Message</Button> */}

                  {/* ............................... */}
                  <>
                    <div className="PostsContainer">
                      {postSteat.length > 0 && <Feed post={postSteat} />}
                    </div>
                    {postSteat.length <= 0 && (
                      <div
                        style={{
                          display: "flex",
                          flex: 20,
                          position: "absolute",
                          top: 250,
                          right: 550,
                          // marginTop: "15rem",
                          padding: 18,
                          fontSize: "1.2rem",
                          fontFamily:
                            '"Helvetica Neue", "Open Sans", Arial, sans-serif',
                        }}
                      >
                        <div
                          style={{
                            backgroundColor: "#E6E6E6",
                            borderRadius: "15%",
                            width: 200,
                            textAlign: "center",
                          }}
                        >
                          <p style={{ color: "#1877F2", Opacity: "50%" }}>
                            No Posts Yet{" "}
                          </p>
                        </div>
                      </div>
                    )}
                  </>
                  {/* ............................... */}
                </div>
                {/* {RoleName === "ProviderUser" && <SharePost />} */}
              </div>
              {/* {RoleName === "ProviderUser" && <Feed />} */}
            </div>
          </div>
        </>
      )}
    </>
  );
}
