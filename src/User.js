import React from "react";
import { Avatar } from "@material-ui/core";
import "./User.css";

const User = ({ name, handle, profilePic }) => {
  return (
    <div className="user">
      <Avatar src={profilePic} alt={name} className="profile__avatar" />
      <div className="profile__name">
        <h4>{name}</h4>
        <span className="profile__handle">
          <h5>{`@${handle}`}</h5>
        </span>
      </div>
    </div>
  );
};

export default User;
