import React, { useMemo, useState } from "react";

import { styles } from "../styles";

import axios from "axios";

import { LoadingOutlined } from "@ant-design/icons";

import { v4 as uuidv4 } from "uuid";

import Avatar from "../Avatar";
import Button from "@mui/material/Button";
import { Margin } from "@mui/icons-material";

const EmailForm = (props) => {
  const [user1, setEmail] = useState(`${uuidv4()}@gmail.com`);
  const [loading, setLoading] = useState(false);

  const user = useMemo(() => `${uuidv4()}@gmail.com`, []);

  function getOrCreateUser(callback) {
    axios
      .put(
        "https://api.chatengine.io/users/",
        { username: user, email: user, secret: user },
        { headers: { "Private-Key": process.env.REACT_APP_CE_PRIVATE_KEY } }
      )
      .then((r) => callback(r.data))
      .catch((e) => console.log("Get or create user error", e));
  }

  function getOrCreateChat(callback) {
    axios
      .put(
        "https://api.chatengine.io/chats/",
        { usernames: [user, "sc@gmail.com"], is_direct_chat: true },
        {
          headers: {
            "Project-ID": process.env.REACT_APP_CE_PROJECT_ID,
            "user-name": "sc@gmail.com",
            "user-secret": "sc@gmail.com",
          },
        }
      )
      .then((r) => callback(r.data))
      .catch((e) => console.log("Get or create chat error", e));
  }

  function handleSubmit(event) {
    event.preventDefault();
    setLoading(true);

    //console.log('Sending Email', email)

    getOrCreateUser((user) => {
      props.setUser && props.setUser(user);
      getOrCreateChat((chat) => {
        setLoading(false);
        props.setChat && props.setChat(chat);
      });
    });
  }

  return (
    <div
      style={{
        ...styles.emailFormWindow,
        ...{
          height: props.visible ? "100%" : "0px",
          opacity: props.visible ? "1" : "0",
        },
      }}
    >
      <div style={{ height: "0px" }}>
        <div style={styles.stripe} />
      </div>

      <div
        className="transition-5"
        style={{
          ...styles.loadingDiv,
          ...{
            zIndex: loading ? "10" : "-1",
            opacity: loading ? "0.33" : "0",
          },
        }}
      />
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

      <div
        style={{
          position: "absolute",
          height: "100%",
          width: "100%",
          textAlign: "center",
        }}
      >
        <Avatar
          style={{
            position: "relative",
            left: "calc(50% - 44px)",
            top: "10%",
          }}
        />

        <div style={styles.topText}>
          Welcome to our <br /> support 👋
        </div>

        <form
          onSubmit={(e) => handleSubmit(e)}
          style={{ position: "relative", width: "100%", top: "19.75%" }}
        >
          {/* <label
            onChange={(e) => setEmail((e.target.value = user))}
            style={styles.emailInput}
          /> */}
          {/* <button className="chatWithMeButton" type="submit"> Get Help </button> */}
          <Button
            style={{
              backgroundColor: "#164778 ",
              marginTop: "10%",
              borderRadius: 10,
              textTransform: "none",
            }}
            type="submit"
            variant="contained"
            disableElevation
          >
            Get Help
          </Button>
        </form>

        <div style={styles.bottomText}>
          <br /> To Get Started
        </div>
      </div>
    </div>
  );
};

export default EmailForm;
