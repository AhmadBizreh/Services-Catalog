import React from "react";

import ViewMorePost from "../viewMorePost/ViewMorePost";
import Share from "../share/Share";
import "./feed.css";
import { Posts } from "../../dummyData";

export default function Feed(props) {
  
  return (
    <div className="feed">
      <div className="feedWrapper">
        {/* <Share /> */}
        {props.post.map((p) => (
          <ul key={p.id}>
            <ViewMorePost
              postId={p.servicesPostId}
              userId={p.userId}
              title={p.title}
              desc={p.description}
              like={p.like}
              disLike={p.disLike}
              name={p.fullName}
              img={p.image}
              tags={p.searchTag}
            />
          </ul>
        ))}
      </div>
    </div>
  );
}
