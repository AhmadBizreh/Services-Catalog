import React, { useState, useEffect } from "react";
import "./chatBody.css";
import ChatList from "../chatList/ChatList";
import ChatContent from "../chatContent/ChatContent";
import { useParams } from "react-router-dom";
import BaseUrl from "../../URL";
import { useSelector } from "react-redux";

import UserInfoChat from "../userInfoChat/UserInfoChat";
const ChatBody = () => {
  const [idChatWith, setIdChatWith] = useState();
  const [imgChatWith, setimgChatWith] = useState();
  const [nameChatWith, setNameChatWith] = useState();

  const [userInfo, setUserInfo] = useState([]);

  const { userId } = useParams();

  const setId = (id, img, name) => {
    setIdChatWith(id);
    setimgChatWith(img);
    setNameChatWith(name);
  };

  useEffect(() => {
    // alert(userId);
    fetchProfileInfo(
      `${BaseUrl}api/ServicesPosts/showprofile?userID=${userId}`
    );
  }, []);

  const fetchProfileInfo = async (url) => {
    if (userId) {
      await fetch(url, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
          // Authorization: `Bearer ${token}`,
        },
      })
        .then((response) => response.json())
        .then((data) => {
          // setUserInfo(data);
          console.log(data);
          setIdChatWith(userId);
          setimgChatWith(data.personalImage);
          setNameChatWith(data.firstName);
        });
    } else {
      // alert("not url");
      return;
    }
  };

  // const fetchChatContent = async (url) => {
  //   if (userId) {
  //     await fetch(url, {
  //       method: "GET",
  //       headers: {
  //         "Content-Type": "application/json",
  //         // Authorization: `Bearer ${token}`,
  //       },
  //     })
  //       .then((response) => response.json())
  //       .then((data) => {
  //         setUserData(data);
  //         console.log("chatMasageeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeeee");
  //         console.log(data);
  //       });
  //   } else {
  //     console.log("chat");
  //     // console.log("chat");
  //     return;
  //   }
  // };

  return (
    <div className="main__chatbody">
      <ChatList setId={setId} />
      <ChatContent
        id={idChatWith}
        img={imgChatWith}
        chatWithName={nameChatWith}
      />
      <UserInfoChat id={idChatWith} />
    </div>
  );
};
export default ChatBody;
