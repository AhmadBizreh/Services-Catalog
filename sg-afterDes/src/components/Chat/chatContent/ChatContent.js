import React, { useState, createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import Chip from "@mui/material/Chip";

import "./chatContent.css";
import Avatar from "../chatList/Avatar";
import ChatItem from "./ChatItem";
import BaseUrl from "../../URL";
import PostAddIcon from "@mui/icons-material/PostAdd";
import TelegramIcon from "@mui/icons-material/Telegram";
import { NavLink } from "react-router-dom";

const ChatContent = (props) => {
  const token = useSelector((state) => state.auth.id);
  const RoleName = useSelector((state) => state.auth.roleName);

  const [chatItms, setChatItms] = useState([]);

  const [msg, setMsg] = useState("");
  const messagesEndRef = createRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
  };

  const fetchChatContent = async (url) => {
    await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setChatItms(data);
        // console.log("chatMasage");
        // console.log(data);
      });
  };

  // useEffect(() => {
  //   fetchChatContent(`${BaseUrl}api/Chat/showmessages?chatwithid=${props.id}`);
  // }, [props.id]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatContent(
        `${BaseUrl}api/Chat/showmessages?chatwithid=${props.id}`
      );
    }, 3000);
    return () => clearInterval(interval);
  }, [props.id]);

  useEffect(() => {
    // console.log("scrollToBottom");
    scrollToBottom();
  }, [chatItms]);

  const SM = () => {
    SendMessage(msg);
  };

  const SendMessage = async (msg) => {
    await fetch(`${BaseUrl}api/Chat/messages`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
      body: JSON.stringify({
        Message: msg,
        RecevieId: props.id,
      }),
    })
      .then((response) => response.json())
      .then((data) => {
        // console.log("data.massage.id");

        // console.log(data);
        setChatItms((chatItms) => [
          ...chatItms,
          {
            chatMessageId: data.chatMessageId,
            chatWith: data.chatWith,
            date: data.date,
            type: data.type,
            time: data.time,
            message: data.message,
            personalImage: data.personalImage,
          },
        ]);

        setMsg("");
      });
  };

  const onStateChange = (e) => {
    setMsg(e.target.value);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && msg !== "") {
      SendMessage(msg);
      setMsg("");
    }
  };

  return (
    <>
      <div className="main__chatcontent">
        <div className="content__header">
          <div className="blocks">
            {props.id && (
              <div className="current-chatting-user">
                <Avatar isOnline="active" image={props.img} />
                <p>{props.chatWithName}</p>
              </div>
            )}
          </div>
          <div className="newcontr">
            {props.id && RoleName === "ProviderUser" && (
              <NavLink to={`/contractsForm/${props.id}`} className="btn">
                <i className="fa fa-plus">
                  <PostAddIcon />
                </i>
                Send Contract
              </NavLink>
            )}
          </div>
        </div>
        <div className="content__body">
          <div className="chat__items">
            {chatItms.map((itm, index) => (
              <ChatItem
                animationDelay={index + 2}
                key={itm.ChatMessageId}
                user={itm.type ? itm.type : "me"}
                msg={itm.message}
                image={itm.personalImage}
                time={itm.time}
                date={itm.date}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </div>
        {props.id && (
          <div className="content__footer">
            <div className="sendNewMessage">
              <input
                type="text"
                placeholder="Type a message here"
                id="messageInput"
                onChange={onStateChange}
                onKeyPress={handleKeyPress}
                value={msg}
              />
              <button className="btnSendMsg" id="sendMsgBtn" onClick={SM}>
                <i style={{ marginTop: 5, marginRight: 3 }}>
                  <TelegramIcon />
                </i>
              </button>
            </div>
          </div>
        )}
        {!props.id && (
          <p style={{ textAlign: "center", margin: 200 }}>
            <Chip
              label="Select A Chat To Start Messaging"
              color="default"
              variant="filled"
            />
          </p>
        )}
      </div>
    </>
  );
};
export default ChatContent;
