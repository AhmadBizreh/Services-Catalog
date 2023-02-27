//import Postsdata from "./Postsdata"; 
import KeyboardDoubleArrowRightIcon from "@mui/icons-material/KeyboardDoubleArrowRight"; 
import { Link, NavLink } from "react-router-dom"; 
import React, { useState, useEffect } from "react"; 
import Chip from "@mui/material/Chip"; 
import BaseUrl from "../URL"; 
 
const Posts = () => { 
  const [post, setPost] = useState([ 
    { 
      userId: "", 
      servicesPostId: "", 
      title: "", 
      description: "", 
      searchTag: [""], 
      image: "", 
    }, 
  ]); 
 
  const fetchData = () => { 
    return fetch(`${BaseUrl}api/ServicesPosts/showpostimage`) 
      .then((response) => response.json()) 
      .then((data) => { 
        setPost(data); 
        console.log(data); 
      }); 
  }; 
 
  useEffect(() => { 
    fetchData(); 
  }, []); 
 
  return ( 
    <> 
      <section className="posts Services"> 
        <div className="container topMarign"> 
          <div className="heading"> 
            <h2 className="pcolor">Latest Posts</h2> 
            <h1>Browse Feed to Find Similar Interests</h1> 
          </div> 
 
          <div className="contain grid topMarign"> 
            {post.map((val) => { 
              return ( 
                <div className="box"> 
                  <div className="img"> 
                    <img src={val.image} alt="" /> 
                  </div> 
                  <div className="text"> 
                    <h2>{val.title}</h2> 
                    <div> 
                    {val.searchTag.map((item) => ( 
                      <Chip label={item}color="primary" className="postTopRightTagsHome" /> 
                      ))} 
                    </div> 
                    <div> 
                      <br /> 
                      <span>{val.description}</span> 
                    </div> 
                    <a href="/"> 
                      <NavLink 
                        className="postUsername" 
                        to={`/profile/${val.userId}`} 
                      > 
                        Read More 
                      </NavLink> 
                      <KeyboardDoubleArrowRightIcon className="iconarrows" /> 
                    </a> 
                  </div> 
                </div> 
              ); 
            })} 
          </div> 
        </div> 
        <div className="topMarign"> 
        <Link to={"/tv"} className="viewmore-btn"> 
            View More 
          </Link> 
          <br /> 
          <br /> 
          <br /> 
        </div> 
      </section> 
    </> 
  ); 
}; 
 
export default Posts;