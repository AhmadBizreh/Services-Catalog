// import { border } from '@mui/system';
import React from "react";

import { useSelector } from "react-redux";

import { useRef, useState } from "react";

import { useNavigate } from "react-router-dom";

import classes from "./ProfileForm.module.css";

import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import BaseUrl from "../../URL";

const ChangePassword = () => {
  // const email = useSelector((state) => state.auth.email);
  const token = useSelector((state) => state.auth.id);

  const oldPasswordRef = useRef();
  const newPasswordRef = useRef();
  const confNewPasswordRef = useRef();
  const navigate = useNavigate();

  const editPasswrdHanler = (event) => {
    event.preventDefault();

    const oldPassword = oldPasswordRef.current.value;
    const newPassword = newPasswordRef.current.value;
    const confNewPassword = confNewPasswordRef.current.value;
    if (newPassword === confNewPassword) {
      fetch(`${BaseUrl}api/User/changepassword`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          NewPassword: newPassword,
          OldPassword: oldPassword,
        }),
      })
        .then((res) => {
          if (res.ok) {
            toast("done");
            console.log(res);
            navigate("/editProfile");
            return res.json();
          } else {
            res.json().then((data) => {
              let errorMassage2 = "Connection Failed";

              if (data.massage) {
                errorMassage2 = data.massage;
              }
              console.log(errorMassage2);
              toast(errorMassage2);
              throw new Error(errorMassage2);
            });
          }
        })
        .then((data) => {})
        .catch(() => {});
      console.log(newPassword);
    } else toast("Uncorrect Conf Password");
  };

  return (
    <>
      <ToastContainer
        position="bottom-right"
        autoClose={1500}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick={false}
        rtl
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <form onSubmit={editPasswrdHanler}>
        <div className={classes.control}>
          <label htmlFor="new-password">Old Password</label>
          <input
            type="password"
            id="old-password"
            ref={oldPasswordRef}
            required
          />
          <label htmlFor="new-password">New Password</label>
          <input
            type="password"
            id="conf-old-password"
            ref={newPasswordRef}
            required
          />
          <label htmlFor="new-password">Confirm New Password</label>
          <input
            type="password"
            id="new-password"
            ref={confNewPasswordRef}
            required
          />
          <div className={classes.action}>
            <button type="submit">Change Password</button>
          </div>
        </div>
        {/* <div className={classes.action}>
          <button>
            Change Password
            <ToastContainer
              position="top-center"
              autoClose={1500}
              hideProgressBar={false}
              newestOnTop={false}
              closeOnClick={false}
              rtl
              pauseOnFocusLoss
              draggable
              pauseOnHover
              theme="colored"
            />
          </button>
        </div> */}
      </form>
    </>
  );
};

export default ChangePassword;
