import React, { useEffect, useState } from "react";
import SearchIcon from "@material-ui/icons/Search";
import { TwitterTimelineEmbed } from "react-twitter-embed";

import "./RightBar.css";
import User from "./User";
import db from "./firebase";

const RightBar = () => {
  const [users, setUsers] = useState([]);

  useEffect(() => {
    const unsubscribe = db.collection("users").onSnapshot((snapshot) => {
      setUsers(
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
        {users.map(({ name, profilePic, handle, id }) => (
          <User
            className="whoToFollow__user"
            name={name}
            profilePic={profilePic}
            handle={handle}
            key={id}
          />
        ))}
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
