import React from "react";


import Profile from "./Profile";

import classes from "./UserProfile.module.css";

const UserProfile = () => {
  return (
    <section className={classes.profile}>
      
      <Profile />
      {/* <EditProfile /> */}
      {/* <ProfileForm /> */}
      
    </section>
  );
};

export default UserProfile;
