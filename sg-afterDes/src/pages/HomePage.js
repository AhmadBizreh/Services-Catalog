import React from "react";
import Home from "../components/homes/Home";
import Services from "../components/servicess/Services";
import Wrapper from "../components/Wrapper";
import Posts from "../components/posts/Posts";
import Footer from "../components/Footer";
import SupportEngine from "../components/SupportEngine"

const HomePages = () => {
  return (
    <>
      <Home />
      <SupportEngine />
      <Services />
      <Wrapper />
      <Posts />
      <Footer />
    </>
  );
};

export default HomePages;
