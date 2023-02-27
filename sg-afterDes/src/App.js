import React from "react";

import { Navigate } from "react-router-dom";
import { Route, Routes } from "react-router-dom";
import { useSelector } from "react-redux";

import "./App.css";
import Layout from "./components/Layout/Layout";

import AuthPage from "./pages/AuthPage";
import HomePage from "./pages/HomePage";
import AboutPage from "./pages/AboutPage";
// import CategoriesPage from "./pages/CategoriesPage";
import FeedPage from "./pages/FeedPage";
import SignUpPage from "./pages/SignUpPage";
import ContractsFormPage from "./pages/ContractsPage";
import NEditProfileForm from "./components/Profile/EditProfile/NEditProfileForm";
import ChangePassword from "./components/Profile/EditProfile/ChangePassword";
import TreeViewPage from "./pages/TreeView";
import ProfilePage from "./pages/ProfilePage";
import MyProfilePage from "./pages/MyProfilePage";
import AllContractsPage from "./pages/AllContractsPage";
import AllContractsDetailsPage from "./pages/AllContractsDetailsPage";
import SearchBarResPage from "./pages/SearchBarResPage";
import ChatPage from "./pages/ChatPage";

function App() {
  const isLogin = useSelector((state) => state.auth.Auth);

  return (
    <Layout>
      {/* <BrowserRouter> */}
      <Routes>
        <Route path="/" element={<HomePage />} exact />

        <Route path="/about" element={<AboutPage />} />
        <Route path="/tv" element={<TreeViewPage />} />
        <Route path="/SearchRes/:q" element={<SearchBarResPage />} />

        {/* <Route path="/allContracts" element={<CategoriesPage />} /> */}

        <Route path="/feed" element={<FeedPage />} />

        {!isLogin && <Route path="/signup" element={<SignUpPage />} />}
        {!isLogin && <Route path="/auth" element={<AuthPage />} />}
        <Route path="/profile/:userId" element={<ProfilePage />} />
        {isLogin && <Route path="/chat" element={<ChatPage />} />}
        {isLogin && <Route path="/chatWith/:userId" element={<ChatPage />} />}
        {isLogin && (
          <Route path="/allContracts" element={<AllContractsPage />} />
        )}
        {isLogin && (
          <Route
            path="/Contracts/Details/:id"
            element={<AllContractsDetailsPage />}
          />
        )}

        {isLogin && <Route path="/myProfile" element={<MyProfilePage />} />}

        {isLogin && (
          <Route path="/contractsForm/:ReqId" element={<ContractsFormPage />} />
        )}
        {isLogin && (
          <Route path="/editProfile" element={<NEditProfileForm />} />
        )}
        {isLogin && (
          <Route path="/changepassword" element={<ChangePassword />} />
        )}
        <Route path={"*"} element={<Navigate to={"/"} />} />
      </Routes>
      {/* </BrowserRouter> */}
    </Layout>
  );
}

export default App;
