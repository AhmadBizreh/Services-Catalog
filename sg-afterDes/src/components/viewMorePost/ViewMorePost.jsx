import { useSelector } from "react-redux";
import { NavLink } from "react-router-dom";
import React from "react";
import "./post.css";
// import { MoreVert } from "@material-ui/icons";
import { Users } from "../../dummyData";
import { useState } from "react";
import BaseUrl from "../URL";
import Chip from "@mui/material/Chip";
import ThumbUpOffAltIcon from '@mui/icons-material/ThumbUpOffAlt';
import ThumbDownOffAltIcon from '@mui/icons-material/ThumbDownOffAlt';

// desc={p.desc} like={p.like}
export default function ViewMorePost(props) {
  const token = useSelector((state) => state.auth.id);
  const [like, setLike] = useState(props.like);
  const [disLike, setDisLike] = useState(props.disLike);
  const [tagList, setTagList] = useState([]);

  // const [isLiked, setIsLiked] = useState(false);

  const PostLikes = async (url) => {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ServicesPostId: props.postId,
        Like: 1,

        // returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.massage === "You already like") {
          alert(data.massage);
          return;
        }
        setLike(data.like);
        setDisLike(data.dislike);
      });
  };
  const DisPostLikes = async (url) => {
    await fetch(url, {
      method: "POST",
      body: JSON.stringify({
        ServicesPostId: props.postId,
        Like: 0,

        // returnSecureToken: true,
      }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        if (data.massage === "You already Dislike") {
          alert(data.massage);
          return;
        }
        setLike(data.like);
        setDisLike(data.dislike);
      });
  };

  const likeHandler = () => {
    // setLike(like + 1);
    PostLikes(`${BaseUrl}api/RatingApi/Ratelike`);

    // setIsLiked(!isLiked);
  };

  const DiLikeHandler = () => {
    // setDisLike(disLike + 1);
    DisPostLikes(`${BaseUrl}api/RatingApi/Ratedislike`);
  };

  // for (const item of props.tags) {
  //   setTagList([...tagList, item]);
  // }

  return (
    <div className="post">
      <div className="postWrapper">
        <div className="postTop">
          <div className="postTopLeft">
            <img className="postProfileImg" src={props.img} alt="" />
            <NavLink className="postUsername" to={`/profile/${props.userId}`}>
              {props.name}
            </NavLink>
          </div>

          <div className="postTopRight">
            <ul className="postTopRightTags">
              {props.tags.map((item) => (
                <Chip label={item} color="primary" className="postTopRightTags" />
              ))}
            </ul>
          </div>
        </div>

        <div className="postCenter">
          <div className="postTopLefttitle">
            <h2><Chip label={props.title} size="medium" variant="outlined" color="default" /></h2>
          </div>

          <div className="postTopLeftdesc">
            <span className="postText">{props.desc}</span>
          </div>
        </div>
        <div className="postBottom">

          <div className="postBottomLeft">
            
            <ThumbUpOffAltIcon className="likeIcon" color="info" onClick={likeHandler} alt=""/>
            <p style={{ color: "black" }}></p>
            <span className="postLikeCounter">{like}  Likes</span>
            <p style={{ color: "black" }}></p>

            <div className="postBottomLike">
            <ThumbDownOffAltIcon className="likeIcon" color="error" onClick={DiLikeHandler} alt=""/>
            <p style={{ color: "black" }}></p>
            <span className="postLikeCounter">{disLike}  Dislikes</span>
            <p style={{ color: "black" }}></p>
            </div>

          </div>

          
          <div className="postBottomRight">
            {/* <span className="postCommentText">{post.comment} comments</span> */}
          </div>
        </div>
      </div>
    </div>
    // <p>hi pro</p>
  );
}
