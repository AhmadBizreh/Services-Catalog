import React from "react";
import { Link } from "react-router-dom";

import { useSelector } from "react-redux";

import "./chatList.css";
import ChatListItems from "./ChatListItems";
import { useState, useEffect } from "react";
import BaseUrl from "../../URL";
import logo from "../images/logo.png";

const ChatList = (props) => {
  const token = useSelector((state) => state.auth.id);
  const [allChats, setAllChats] = useState([]);
  const [allChatsMap, setAllChatsMap] = useState([]);
  const [selectedChat, setSelectedChat] = useState(null);

  const fetchChatList = async () => {
    await fetch(`${BaseUrl}api/Chat/showchats`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        setAllChats(data);
        // console.log(data);
      });
  };

  useEffect(() => {
    document.title = "Chat";
    // fetchChatList();
    // setAllChatsMap(allChats);
  }, []);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchChatList();
      setAllChatsMap(allChats);
      console.log("allChatsMapEffct");
      
    }, 1000);
    return () => clearInterval(interval);
  }, [allChats]);

  return (
    <div className="main__chatlist">
      <div className="chatlist__heading">
        <div style={{ marginRight: 5 }}>
          <Link to="/">
            <img src={logo}></img>
          </Link>
        </div>
        <h2>Chats</h2>
      </div>

      <div className="chatlist__items">
        {allChatsMap &&
          allChatsMap.map((item, index) => {
            // console.log(item.chatwithId);
            return (
              <ChatListItems
                name={item.chatWith}
                id={item.chatwithId}
                setId={props.setId}
                image={item.personalImage}
                
              />
            );
          })}
        {!allChats && <p>No Chat Fund</p>}
      </div>
    </div>
  );
};
export default ChatList;
