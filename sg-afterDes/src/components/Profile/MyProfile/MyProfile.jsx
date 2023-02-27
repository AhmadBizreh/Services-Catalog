import React from "react";
import "../profile.css";

import { useSelector } from "react-redux";

import { useState, useEffect } from "react";

import Feed from "../../feed/Feed";
import Rightbar from "../../rightbar/Rightbar";
import SharePost from "../ProfilePost/SharePost";

import EditImg from "../EditProfile/EditImg/EditImg";
import BaseUrl from "../../URL";

import { LoadingOutlined } from "@ant-design/icons";
import { styles } from "../../SupportEngine/styles";

export default function MyProfile() {
  const imgA = useSelector((state) => state.auth.img);
  const RoleName = useSelector((state) => state.auth.roleName);
  const token = useSelector((state) => state.auth.id);
  const [userInfo, setUserInfo] = useState([null]);
  const [postSteat, setPostSteat] = useState([null]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState();

  const fetchProfileInfo = async (url) => {
    setLoading(true);
    await fetch(url, {
      method: "GET",

      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        // alert(data);
        setUserInfo(data);
        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        console.log(error);
        // alert(error);
        setLoading(false);
      });
  };
  const fatchPosts = async (url) => {
    setLoading(true);
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((posts) => {
        setPostSteat(posts);
        // alert(posts);
        console.log(posts);

        setLoading(false);
      })
      .catch((error) => {
        setError(true);
        // alert(error);
        setLoading(false);
      });
  };

  useEffect(() => {
    document.title = "Profile";
    fetchProfileInfo(`${BaseUrl}api/User/show`);
    fatchPosts(`${BaseUrl}api/ServicesPosts/showpostuser`);
  }, []);
  const refreshHanler = () => {
    window.location.reload(true);
  };

  return (
    <>
      {loading && (
        <LoadingOutlined
          className="transition-5"
          style={{
            ...styles.loadingIcon,
            ...{
              zIndex: loading ? "10" : "-1",
              opacity: loading ? "1" : "0",
              fontSize: "82px",
              top: "calc(50% - 41px)",
              left: "calc(50% - 41px)",
            },
          }}
        />
      )}
      {/* {!loading && userInfo === null && postSteat === null && (
        <p>filed to lode</p>
      )} */}
      {!loading && (
        <>
          {" "}
          <div className="profile">
            {/* <NewTreeView /> */}
            {/* <TreeView /> */}
            {/* <NeList /> */}
            <div className="profileRight">
              <div className="profileRightTop">
                <div className="profileCover">
                  <img
                    className="profileCoverImg"
                    src="assets/post/undrawcover.svg"
                    alt=""
                  />
                  <img
                    className="profileUserImg"
                    //datBase:
                    src={imgA}
                    alt=""
                  />

                  <div className="profileUserImgIcone">
                    <EditImg />
                  </div>
                </div>
                <div className="profileInfo">
                  <h4 className="profileInfoName">
                    {userInfo.firstName + " " + userInfo.lastName}
                  </h4>
                  <span className="profileInfoDesc">Hello my friends!</span>
                </div>
              </div>
              <div className="profileRightBottom">
                <div>
                  <div className="Userinfofixed">
                    <Rightbar userInfo={userInfo} isMy={true} />
                  </div>
                  {RoleName === "ProviderUser" && (
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
                              height: 33,
                              width: 160,
                              fontSize: 17,
                              fontWeight: "bold",
                              textAlign: "center",
                              borderRadius: 10,
                            }}
                          >
                            <p style={{ color: "#164778" }}>No Posts Yet </p>
                          </div>
                        </div>
                      )}
                    </>
                  )}

                  <div className="profileRightBottombtns">
                    {/* <EditProfile /> */}
                    <br />

                    <br />
                    {/* <button className="addPostcircularBtn" >
                  <PostAddIcon color="default" className="addPostcircularBtnIcon" />
                </button> */}
                  </div>

                  {/* <NavLink to={"/changepassword"}>Change Your Password</NavLink> */}
                  {/* <ProfileForm /> */}
                </div>
              </div>
            </div>
          </div>
          {RoleName === "ProviderUser" && <SharePost refresh={refreshHanler} />}
        </>
      )}
    </>
  );
}
