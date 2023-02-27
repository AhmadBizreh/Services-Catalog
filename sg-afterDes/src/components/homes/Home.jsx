import { useSelector } from "react-redux";

import React, { useState } from "react";
import { Link } from "react-router-dom";

const Home = () => {
  const show = useSelector((state) => state.auth.isAuth);
  const RoleName = useSelector((state) => state.auth.roleName);

  return (
    <>
      {/* {RoleName !== "ProviderUser" && <p>hi RequesterUser </p>} */}
      <section className="home">
        <div className="container flex">
          <div className="left ">
            <div className="img">
              <img src="./assets/home.png" style={{ paddingTop: "30px" }} />
            </div>
          </div>
          <div className="right topMarign">
            <h1>
              Find The Perfect <span className="fontcursive"> Freelance </span>{" "}
              Service For Your Business <br />
            </h1>
            <br />
            <p>
              SC 's mission is to change how the country works together. SC
              connects businesses with freelancers offering digital services in
              500+ categories.
            </p>
            {!show && (
              <Link to={"/auth"} className="primary-btn">
                Sign Up
              </Link>
            )}
          </div>
        </div>
      </section>
    </>
  );
};

export default Home;
