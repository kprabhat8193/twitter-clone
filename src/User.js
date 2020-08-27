import React, { forwardRef } from "react";
import { Avatar, Button } from "@material-ui/core";
import "./User.css";
import { useStateValue } from "./StateProvider";
import db from "./firebase";
import { actionTypes } from "./reducer";

const User = forwardRef(
  ({ name, handle, profilePic, displayFollowButton, id }, ref) => {
    const [{ user, following }, dispatch] = useStateValue();

    const handleFollow = (e) => {
      e.preventDefault();
      if (!followingUser()) {
        db.collection("followingm2m")
          .add({
            follower: `users/${user.id}`,
            following: id,
          })
          .then((docRef) => {
            console.log("Followingm2m added with docId", docRef.id);
            dispatch({
              type: actionTypes.SET_FOLLOWING,
              following: [...following, id],
            });
          })
          .catch((error) => {
            console.error("Failed while adding followingm2m", error);
          });
      }
    };

    const followingUser = () => {
      return following.includes(id);
    };

    return (
      <div className="user" ref={ref}>
        <Avatar src={profilePic} alt={name} className="profile__avatar" />
        <div className="profile__name">
          <h4>{name}</h4>
          <span className="profile__handle">
            <h5>{`@${handle}`}</h5>
          </span>
        </div>
        {displayFollowButton && (
          <Button
            className="user__followButton"
            variant="contained"
            type="submit"
            onClick={handleFollow}
          >
            Follow
          </Button>
        )}
      </div>
    );
  }
);

export default User;
