import React from "react";
import SearchIcon from "@mui/icons-material/Search";
import { useState, useEffect } from "react";
import BaseUrl from "../../../URL";
import Feed from "../../../feed/Feed";
import { useNavigate } from "react-router-dom";

// const DAME_POST = [
//   {
//     fullName: "ahmad",
//     title: "ah",
//     userId: "1",
//     id: 1,
//     description: "Need help to design & develope an e-commerce website.",
//     date: "5 mins ago",
//     userId: 1,
//     like: 32,
//     comment: 9,
//     servicesPostId: 1,
//   },
//   {
//     fullName: "ahmad",
//     userId: "2",
//     title: "ah",

//     id: 2,
//     description: "We are looking for an experience facebook advertiser",
//     date: "15 mins ago",
//     userId: 2,
//     like: 2,
//     comment: 1,
//     servicesPostId: 2,
//   },
//   {
//     fullName: "ahmad",
//     userId: "3",
//     title: "ah",

//     id: 3,
//     description: "I need logo designer for my e-commerce store.",
//     date: "1 hour ago",
//     userId: 3,
//     like: 61,
//     comment: 2,
//     servicesPostId: 3,
//   },
//   {
//     fullName: "ahmad",
//     userId: "4",
//     title: "ah",

//     id: 4,
//     description: "We are looking for an experience facebook advertiser",
//     date: "4 hours ago",
//     userId: 4,
//     like: 7,
//     comment: 3,
//     servicesPostId: 4,
//   },
//   {
//     fullName: "ahmad",
//     userId: "5",
//     title: "ah",

//     id: 5,
//     description: "Love For All, Hatred For None.",
//     date: "5 hours ago",
//     userId: 5,
//     like: 23,
//     comment: 5,
//     servicesPostId: 5,
//   },
// ];

const SearchBar = () => {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState("");
  //   const [postSteat, setPostSteat] = useState([DAME_POST]);

  //   useEffect(() => {}, [handleSearch]);

  const gooToFeed = () => {
    if (!searchTerm) {
      return;
    }

    navigate(`/SearchRes/${searchTerm}`);
    window.location.reload(true);
    return;
  };

  //   const GetFeed = (url) => {
  //     fetch(url)
  //       .then((response) => response.json())
  //       .then((data) => {
  //         console.log(data);
  //         setPostSteat(data.results);
  //       })
  //       .catch((error) => console.log(error));
  //   };

  function handleSearch(event) {
    event.preventDefault();
    gooToFeed(searchTerm);
    // alert(searchTerm);
    // GetFeed(`${BaseUrl}search?q=${searchTerm}`);
    // Perform the search here, for example by making an API call
  }

  const handleKeyPress = (event) => {
    if (event.key === "Enter" && searchTerm !== "") {
      gooToFeed(searchTerm);
      // setMsg("");
    }
  };
  return (
    <>
      <SearchIcon onClick={handleSearch} className="searchIcon" />
      <input
        placeholder="Search for Post"
        className="searchInput"
        onChange={(event) => setSearchTerm(event.target.value)}
        onKeyPress={handleKeyPress}
      />
    </>
  );
};
export default SearchBar;
