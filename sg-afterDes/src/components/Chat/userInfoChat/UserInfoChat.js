import React from "react";
import "./UserInfoChat.css";
import avatar from "../images/avatar.png";
import { useState, useEffect } from "react";
import BaseUrl from "../../URL";

const UserInfoChat = (props) => {
  const [userInfo, setUserInfo] = useState([]);

  const toggleInfo = (e) => {
    e.target.parentNode.classList.toggle("open");
  };

  const fetchUserInfo = async () => {
    await fetch(`${BaseUrl}api/ServicesPosts/showprofile?userID=${props.id}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setUserInfo(data);
        // console.log(data);
      });
  };

  useEffect(() => {
    // console.log("userInfo");
    // console.log(props.id);

    fetchUserInfo();
  }, [props.id]);

  return (
    <div className="main__userprofile">
      <div className="profile__card user__profile__image">
        <div className="profile__image">
          <img src={userInfo.personalImage} />
        </div>
        <h4>
          {userInfo.firstName} {userInfo.lastName}
        </h4>
        <p>{userInfo.email}</p>
      </div>
      <div className="profile__card">
        <div className="card__header" onClick={toggleInfo}>
          <h4>Information</h4>
          <i className="fa fa-angle-down"></i>
        </div>
        <div className="card__content">Age: {userInfo.age}</div>
      </div>
    </div>
  );
};
export default UserInfoChat;
