import React from "react";
import Avatar from "./Avatar";

const ChatListItems = (props) => {
  return (
    <div
      style={{ animationDelay: `0.${props.animationDelay}s` }}
      onClick={(e) => {
        for (
          let index = 0;
          index < e.currentTarget.parentNode.children.length;
          index++
          
        ) {
          props.setId(props.id , props.image ,props.name);
          e.currentTarget.parentNode.children[index].classList.remove("active");
        }
        e.currentTarget.classList.add("active");
        
      }}
      className={`chatlist__item ${props.active ? props.active : ""} `}
    >
      <Avatar image={props.image ? props.image : "http://placehold.it/80x80"} />
      <div className="userMeta">
        <p>{props.name}</p>
      </div>
    </div>
  );
};
export default ChatListItems;