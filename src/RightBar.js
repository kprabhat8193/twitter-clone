import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TwitterTimelineEmbed } from "react-twitter-embed";
import FlipMove from "react-flip-move";
import "./RightBar.css";
import User from "./User";
import db from "./firebase";
import { useStateValue } from "./StateProvider";

const RightBar = () => {
  const [{ user, following }] = useStateValue();
  const [whoToFollow, setWhoToFollow] = useState([]);
  const [followingm2m, setFollowingm2m] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setWhoToFollow(
        snapshot.docs
          .map((doc) => {
            return {
              ...doc.data(),
              id: `users/${doc.id}`,
            };
          })
          .filter((singleUser) => {
            return (
              !following.includes(singleUser.id) &&
              !(`users/${user.id}` === singleUser.id)
            );
          })
      );
    });

    return () => {
      unsubscribe();
    };
  }, [followingm2m, following]);

  useEffect(() => {
    const unsubscribe = db.collection("followingm2m").onSnapshot((snapshot) => {
      setFollowingm2m(
        snapshot.docs.map((doc) => {
          return {
            ...doc.data(),
            id: doc.id,
          };
        })
      );
    });

    return () => {
      unsubscribe();
    };
  }, []);

  return (
    <div className="rightBar">
      <div className="rightBar__search">
        <SearchIcon />
        <input
          type="text"
          placeholder="Search Twittr"
          className="rightBar__input"
        />
      </div>
      <div className="rightBar__whotoFollow">
        <h2>Who to Follow</h2>
        <FlipMove>
          {whoToFollow.map(({ name, profilePic, handle, id }) => (
            <User
              className="whoToFollow__user"
              name={name}
              profilePic={profilePic}
              handle={handle}
              key={id}
              id={id}
              displayFollowButton
            />
          ))}
        </FlipMove>
      </div>
      <div className="rightBar__timelineFeed">
        <TwitterTimelineEmbed
          sourceType="profile"
          screenName="reactjs"
          options={{ height: 490 }}
        />
      </div>
    </div>
  );
};

export default RightBar;
