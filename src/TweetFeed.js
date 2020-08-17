import React, { useState, useEffect } from "react";
import { Avatar } from "@material-ui/core";
import "./TweetFeed.css";
import ChatBubbleOutlineRoundedIcon from "@material-ui/icons/ChatBubbleOutlineRounded";
import LoopOutlinedIcon from "@material-ui/icons/LoopOutlined";
import FavoriteBorderOutlinedIcon from "@material-ui/icons/FavoriteBorderOutlined";
import FavoriteOutlinedIcon from "@material-ui/icons/FavoriteOutlined";
import ShareOutlinedIcon from "@material-ui/icons/ShareOutlined";
import IconButton from "@material-ui/core/IconButton";
import db from "./firebase";

const TweetFeed = ({ by, timestamp, tweetText, likes, comments, retweets }) => {
  const [user, setUser] = useState({});

  useEffect(() => {
    const unsubscribe = db.doc(by).onSnapshot((snapshot) => {
      setUser(snapshot.data());
    });
  });
  return (
    <div className="tweetFeed feed__box">
      <div className="tweetFeed__box">
        <Avatar src={user.avatarURL} alt={user.name} />
        <div className="tweetFeed__right">
          <div>
            <div className="tweetFeed__rightNameBar">
              <h3>{user.name}</h3>
              <span className="tweet__handle">
                <h3>{user.handle}</h3>
              </span>
              <span className="tweet__timestamp">
                <h3>2h</h3>
              </span>
            </div>
            <div className="tweetFeed__tweetText">
              <p>{tweetText}</p>
            </div>
            <div className="tweetFeed__options">
              <div className="tweetFeed__optionsContainer">
                <IconButton>
                  <ChatBubbleOutlineRoundedIcon fontSize="small" />
                  <p>{comments}</p>
                </IconButton>
              </div>
              <div className="tweetFeed__optionsContainer">
                <IconButton>
                  <LoopOutlinedIcon fontSize="small" />
                  <p>{retweets}</p>
                </IconButton>
              </div>
              <div className="tweetFeed__optionsContainer">
                <IconButton>
                  <FavoriteBorderOutlinedIcon fontSize="small" />
                  <p>{likes}</p>
                </IconButton>
              </div>
              <IconButton>
                <ShareOutlinedIcon fontSize="small" />
              </IconButton>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TweetFeed;
