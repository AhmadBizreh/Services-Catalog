import axios from "axios";
import React, { useEffect, useState } from "react";

import {
  ChatEngineWrapper,
  Socket,
  sendMessage,
  ChatFeed,
  NewMessageForm,
  MessageBubble,
} from "react-chat-engine";
import { chatStore } from "../../../store/chatStore";

const ChatEngine = (props) => {
  const [showChat, setShowChat] = useState(false);

  const [isChatFirstLoad, setIsChatFirstLoad] = chatStore((state) => [
    state.isChatFirstLoad,
    state.setIsChatFirstLoad,
  ]);

  const [questio, setQuestio] = useState([]);

  const fetchData = () => {
    fetch("http://192.168.77.222:8000/chatbot/chatbot")
      .then((response) => response.json())
      .then((data) => {
        setQuestio([...questio, data.question]);
      });
  };

  useEffect(() => {
    fetchData();
  }, []);

  //const question = {
  //question:
  //  " What service field you need in programing?\n1-Build Apps and websites\n2-Managing Network and solve Issues\n3-Building smart machines and Apps includng AI\n4-Security Mangment\n,
  // answers: ["1", "2", "3", "4"] "
  //};

  useEffect(() => {
    if (props.visible) {
      setTimeout(() => {
        setShowChat(true);
      }, 500);
    }
  });

  // Send First message by admin
  const adminSendMessage = async ({ user, chat, message }) => {
    const data = {
      text: message,
      sender_username: "sc@gmail.com",
      custom_json: '{"sender_id":"1674514171655"}',
    };

    await sendMessage(
      {
        projectID: process.env.REACT_APP_CE_PROJECT_ID,
        userName: chat.email,
        userSecret: chat.email,
        publicKey: process.env.REACT_APP_CE_PROJECT_ID,
        chatAccessKey: chat.access_key,
        chatID: chat.id,
      },
      chat.id,
      data,
      (res) => console.log("Success")
    );
    setIsChatFirstLoad(true);
  };

  useEffect(() => {
    // console.log(props);
    if (!isChatFirstLoad)
      if (props.chat && props.user)
        adminSendMessage({
          user: props.user,
          chat: props.chat,
          message: questio,
        });
  }, [props]);

  const handleNewMessage = (message) => {
    if (message.sender_username === props.user.email) {
      if (message.text === "back") {
        questio.pop()
        console.log(questio);
        adminSendMessage({
          user: props.user,
          chat: props.chat,
          message: questio.slice(-1),
        });
      } else {
        axios
          .post("http://192.168.77.222:8000/chatbot/chatbot", {
            user_answer: message.text,
          })
          .then((res) => {
            console.log(res);
            setQuestio([...questio, res.data.question || res.data.output]);
            adminSendMessage({
              user: props.user,
              chat: props.chat,
              message: res.data.question || res.data.output ,
              
            });
            adminSendMessage({
              user: props.user,
              chat: props.chat,
              message: "If you want to go back to the previous question, Send 'back' " ,
              
            });
            
          });
      }
    }
  };

  return (
    <>
      <div
        className="transition-5"
        style={{
          ...styles.chatEngineWindow,
          height: props.visible ? "100%" : "0px",
          zIndex: props.visible ? "100" : "0",
        }}
      >
        {showChat && (
          <ChatEngineWrapper >
            
            <Socket
              projectID={process.env.REACT_APP_CE_PROJECT_ID}
              userName={props.user.email}
              userSecret={props.user.email}
              onNewMessage={(id, message) => handleNewMessage(message)}
            />
            <ChatFeed activeChat={props.chat.id}/>
          </ChatEngineWrapper>
        )}
      </div>
    </>
  );
};

export default ChatEngine;

const styles = {
  chatEngineWindow: {
    width: "100%",
    backgroundColor: "#fff",
  },
};
